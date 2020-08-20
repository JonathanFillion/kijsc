
require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });
const htmlparser2 = require("htmlparser2");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const notifier = require('node-notifier');
const pause = ms => new Promise(res => setTimeout(res, ms))

let urlGamecube = "https://www.kijiji.ca/b-ottawa-gatineau-area/gamecube/k0l1700184?dc=true"
let urlSwitch = "https://www.kijiji.ca/b-video-games-consoles/gatineau/switch/k0c141l1700186?ll=45.394093%2C-75.851320&address=29+Rue+du+Patrimoine%2C+Gatineau%2C+QC+J9H+3N6%2C+Canada&radius=60.0"
let urlPs2 = "https://www.kijiji.ca/b-video-games-consoles/gatineau/ps2/k0c141l1700186?ll=45.394093%2C-75.851320&address=29+Rue+du+Patrimoine%2C+Gatineau%2C+QC+J9H+3N6%2C+Canada&radius=60.0"
let urlPs1 = "https://www.kijiji.ca/b-video-games-consoles/gatineau/ps1/k0c141l1700186?ll=45.394093%2C-75.851320&address=29+Rue+du+Patrimoine%2C+Gatineau%2C+QC+J9H+3N6%2C+Canada&radius=60.0"
let urlDs = "https://www.kijiji.ca/b-video-games-consoles/gatineau/nintendo-ds/k0c141l1700186?ll=45.394093%2C-75.851320&address=29+Rue+du+Patrimoine%2C+Gatineau%2C+QC+J9H+3N6%2C+Canada&radius=60.0"



let previousAdsGamecube = []
let previousAdsSwitch = []
let previousAdsPs2 = []
let previousAdsPs1 = []
let previousAdsDs = []


let delay
let intervalId

let getKijiji = async () => {
	console.log("getKijiji()")


	/*Gamecube*/
	fetch(urlGamecube)
	.then(res => res.text())
	.then(function(body) {
		let ads = getAllAds(body)
		console.log(ads[0])
		if(previousAdsGamecube.length){
			if(previousAdsGamecube[0].title !== ads[0].title){

				console.log()
				console.log("--------------------------------------")
				console.log()
				console.log("New add detected !")
				console.log("Add Title: " + ads[0].title)
				console.log("URL : " + url)
				console.log()
				console.log("--------------------------------------")
				console.log()
				
				notifier.notify({
					title:"Une annonce a changé dans la recherche 'gamecube' !",
					message: ads[0].title,
					sound: true,
				})
			}
		}
		previousAdsGamecube = ads
	})

	pause(2000)


	/*Switch*/
	fetch(urlSwitch)
	.then(res => res.text())
	.then(function(body) {
		let ads = getAllAds(body)
		console.log(ads[0])
		if(previousAdsSwitch.length){
			if(previousAdsSwitch[0].title !== ads[0].title){

				console.log()
				console.log("--------------------------------------")
				console.log()
				console.log("New add detected !")
				console.log("Add Title: " + ads[0].title)
				console.log("URL : " + url)
				console.log()
				console.log("--------------------------------------")
				console.log()
				
				notifier.notify({
					title:"Une annonce a changé dans la recherche 'switch' !",
					message: ads[0].title,
					sound: true,
				})
			}
		}
		previousAdsSwitch = ads
	})

	pause(2000)

	/*PS2*/
	fetch(urlPs2)
	.then(res => res.text())
	.then(function(body) {
		let ads = getAllAds(body)
		console.log(ads[0])
		if(previousAdsPs2.length){
			if(previousAdsPs2[0].title !== ads[0].title){

				console.log()
				console.log("--------------------------------------")
				console.log()
				console.log("New add detected !")
				console.log("Add Title: " + ads[0].title)
				console.log("URL : " + url)
				console.log()
				console.log("--------------------------------------")
				console.log()
				
				notifier.notify({
					title:"Une annonce a changé dans la recherche 'ps2' !",
					message: ads[0].title,
					sound: true,
				})
			}
		}
		previousAdsPs2 = ads
	})

	pause(2000)

	/*PS1*/
	fetch(urlPs1)
	.then(res => res.text())
	.then(function(body) {
		let ads = getAllAds(body)
		console.log(ads[0])
		if(previousAdsPs1.length){
			if(previousAdsPs1[0].title !== ads[0].title){

				console.log()
				console.log("--------------------------------------")
				console.log()
				console.log("New add detected !")
				console.log("Add Title: " + ads[0].title)
				console.log("URL : " + url)
				console.log()
				console.log("--------------------------------------")
				console.log()
				
				notifier.notify({
					title:"Une annonce a changé dans la recherche 'ps1' !",
					message: ads[0].title,
					sound: true,
				})
			}
		}
		previousAdsPs1 = ads
	})

	pause(2000)

	/*PS1*/
	fetch(urlDs)
	.then(res => res.text())
	.then(function(body) {
		let ads = getAllAds(body)
		console.log(ads[0])
		if(previousAdsDs.length){
			if(previousAdsDs[0].title !== ads[0].title){

				console.log()
				console.log("--------------------------------------")
				console.log()
				console.log("New add detected !")
				console.log("Add Title: " + ads[0].title)
				console.log("URL : " + url)
				console.log()
				console.log("--------------------------------------")
				console.log()
				
				notifier.notify({
					title:"Une annonce a changé dans la recherche 'ds' !",
					message: ads[0].title,
					sound: true,
				})
			}
		}
		previousAdsDs = ads
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
		let ad = {title:title, href:href, price:price, description:description,time:time}
		if(adIsValid(ad)){
			tempAds.push(ad)
		}
	})
	return tempAds
}

let adIsValid = (ad) => {
	valid = !ad.title.includes("wanted:")
	return valid
}

let cleanTitle = (text) => {
	text = text.replace("\n", "")
	text = text.replace("\r", "")
	text = text.trim()
	text = text.replace("\n", "")
	text = text.replace("                            ", "")
	return text.toLowerCase()
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
	text = text.toLowerCase()
	return text
}

let getRamdomRangeMillis = () => {
	let max = 124533
	let min = 54341
	if(min < 10000){
		console.err("Running with low delay, watch out for ip ban")
	}
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