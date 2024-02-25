const { partyFinderJoin } = require("../functions/partyFinderJoin")

register("chat", (player, classs, number) => {
    partyFinderJoin(player, classs, number);

}).setCriteria("Party Finder > ${player} joined the dungeon group! (${classs} Level ${number})")