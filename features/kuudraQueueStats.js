const { kuudraFinderJoin } = require("../functions/partyFinderJoin")
import Config from "../Config.js"
register("chat", (player) => {
    if(!Config.kkqueuestats) {
        return
    }

    //kuudraFinderJoin(player);
    ChatLib.chat("&aHi not done yet cool u see this ig~")

}).setCriteria("Party Finder > ${player} joined the group! (Combat Level ${number})");
// they finna change the string on me tmr or smth