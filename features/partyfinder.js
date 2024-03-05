const { partyFinderJoin } = require("../functions/partyFinderJoin")
import Config from "../Config.js"
register("chat", (player, classs, number) => {
    if(!Config.queuestats) {
        return
    }

    partyFinderJoin(player, classs, number);

}).setCriteria("Party Finder > ${player} joined the dungeon group! (${classs} Level ${number})")