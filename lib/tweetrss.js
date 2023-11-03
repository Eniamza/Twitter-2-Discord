const fs = require('fs'); //FS Requiring
const { Rettiwt } = require('rettiwt-api');
require('dotenv').config()
const recordfile = "./record.json"
const record = require(recordfile);

const rettiwt = new Rettiwt(process.env.COOKIE);

const {lastTweetTime,LastTweetID} = require("./record.json") //Importing file to keep track of the last Tweet

let LastID = LastTweetID
let lastTime = lastTweetTime
let send_msg

const tweetrss = (client) => {

    rettiwt.tweet.search({
		fromUsers: ['Eniamza']
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
		fs.writeFileSync(recordfile, JSON.stringify(record,null,2));
		send_msg = `https://twitter.com/eniamza/status/${newTweet.id}`
		const channel = client.channels.cache.get('846684918079160323');
        channel.send(send_msg);


	
	})
}

const fetchlastTweet =  (usrData,lastID,lastTime) => {

    let tweetlist = usrData.list
    let tweetlen = tweetlist.length
    

    for(let i = 0; i<tweetlen;i++)
    {

        let currTweet = tweetlist[i]
        if(currTweet.id != lastID && Date.parse(currTweet.createdAt)>lastTime && currTweet.quoted == undefined && currTweet.replyTo == undefined)
        {
            
            return currTweet
        }

    }

}

module.exports = {tweetrss}