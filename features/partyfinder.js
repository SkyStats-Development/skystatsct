const { partyFinderJoin } = require("../functions/partyFinderJoin")
import Config from "../Config.js"
register("chat", (player) => {
    if(!Config.queuestats) {
        return
    }

    partyFinderJoin(player);

}).setCriteria("Party Finder > ${player} joined the dungeon group! (${classs} Level ${number})")