const { EmbedBuilder } = require('discord.js');

const tweetembed = (tweetTitle,tweetLink,tweetImage) => {
    
    const embed = new EmbedBuilder()
	.setColor('#26a7de')
    .setTitle('Click here to view on X!')
    .setURL(tweetLink)
	.setTimestamp()

    if (tweetTitle !== undefined && tweetTitle!=='.') {
        embed.setDescription(tweetTitle)
    }
    if (tweetImage !== undefined) {
        embed.setImage(tweetImage)
    }

    return embed

    }

    module.exports = {tweetembed}