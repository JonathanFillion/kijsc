const htmlparser2 = require("htmlparser2");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

let url = "https://www.kijiji.ca/b-video-games-consoles/gatineau/gamecube/k0c141l1700186"
let previousAds = []
let delay
let intervalId

let getKijiji = async () => {
	console.log("getKijiji")
	fetch(url)
	.then(res => res.text())
	.then(function(body) {
		let ads = getAllAds(body)
		previousAds = ads
	})
}


let getAllAds = (html) => {
	let $ = cheerio.load(html)
	let tempAds = [];
	$('.regular-ad').each((index, element) => {
		let title = cleanTitle($('a', element).text())
		let href = $('a', element).attr('href')
		let price = cleanPrice($('.price', element).text())
		let description = cleanDescription($('.description', element).text())
		let time = $('.date-posted', element).text()
		tempAds.push({title:title, href:href, price:price, description:description,time:time})
	})
	return tempAds
}

let cleanTitle = (text) => {
	text = text.replace("\n", "")
	text = text.replace("\r", "")
	text = text.trim()
	text = text.replace("\n", "")
	text = text.replace("                            ", "")
	return text
}

let cleanPrice = (text) => {
	text = text.replace("\n", "")
	text = text.replace("\r", "")
	text = text.trim()
	return text
}

let cleanDescription = (text) => {
	text = text.replace("\n", "")
	text = text.replace("\r", "")
	text = text.trim()
	return text
}

let getRamdomRangeMillis = () => {
	let max = 45000
	let min = 22304
	return Math.floor(Math.random() * (max - min) + min)
}

function main() {
	delay = getRamdomRangeMillis()
	intervalId = setInterval(function(){
		getKijiji()
		clearInterval(intervalId)
		main()
	},delay)
}

main()