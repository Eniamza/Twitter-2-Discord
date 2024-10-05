const fs = require('fs'); //FS Requiring
const path = require('path');
const { Rettiwt } = require('rettiwt-api');
require('dotenv').config()

const {tweetembed} = require("../embeds/twitter")

const rettiwt = new Rettiwt({apiKey: process.env.COOKIE});

const {lastTweetTime,LastTweetID} = require("./record.json") //Importing file to keep track of the last Tweet

let LastID = LastTweetID
let lastTime = lastTweetTime

const tweetrss = (client) => {

	const recordfile = path.join(__dirname, 'record.json')

	const record = JSON.parse(fs.readFileSync(recordfile, 'utf8'));


    rettiwt.tweet.search({
		fromUsers: ['DooggiesNFT']
	}).then(data => {
		
		newTweet = fetchlastTweet(data,LastID,lastTime)
		
		if(newTweet == undefined){
			let d = new Date()
			console.log(`No new Tweets at ${d.toGMTString()}`)
			return
		}
	
		lastTime = Date.parse(newTweet.createdAt)
		LastID = record.LastTweetID = newTweet.id
		record.lastTweetTime = Date.parse(newTweet.createdAt)
		record.LastTweetID = newTweet.id
		console.log(`New Tweet Detected! Link: https://twitter.com/eniamza/status/${newTweet.id}`)

		fs.writeFileSync(recordfile, JSON.stringify(record, null, 2));

		//BUILDING THE VARIABLES FOR EMBED
		const urlRegex = /https?:\/\/t\.co\/[a-zA-Z0-9]+\.?/g; //REGEX TO FILTEROUT TWITTER URLS
		let tweetTitle = newTweet.fullText
		tweetTitle = tweetTitle.replace(urlRegex, '.').trim();
		let tweetLink = `https://twitter.com/DooggiesNFT/status/${newTweet.id}`
		let tweetImage = newTweet.entities.media[0]

		send_embed = tweetembed(tweetTitle,tweetLink,tweetImage)

		try {

		const channel = client.channels.cache.get('932730922049110029');
        channel.send({ embeds: [send_embed] });
			
		} catch (error) {
			console.log(error)
		}


	
	})
}

const fetchlastTweet =  (usrData,lastID,lastTime) => {

    let tweetlist = usrData.list


    let currTweet = tweetlist[0]

    if(currTweet.id != lastID && Date.parse(currTweet.createdAt)>lastTime && currTweet.quoted == undefined && currTweet.replyTo == undefined)
    {
            
        return currTweet
    }



}

module.exports = {tweetrss}
