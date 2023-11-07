const { Rettiwt } = require('rettiwt-api');
require('dotenv').config()
const rettiwt = new Rettiwt(process.env.COOKIE);


rettiwt.tweet.search({
    fromUsers: ['DooggiesNFT']
}).then(data => {console.log(data.list[0].fullText)})