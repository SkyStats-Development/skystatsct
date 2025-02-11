const { partyFinderJoin } = require("../functions/partyFinderJoin")
const { checkShitterStatusInternal } = require("../functions/shitterFunctions");
import Config from "../Config.js";

register("chat", (player) => {
    if (!Config.queuestats) {
        return;
    }

    checkShitterStatusInternal(player).then(status => {
        if (status.shitter) {
            if (status.dokick) {
                ChatLib.command(`party kick ${player}`);

            }
            if (status.doannounce + status.doannouncereason) {
                ChatLib.command(`pc [SS] ${player} is a shitter. Reason: ${status.reason}`);
            } else if (status.doannounce) {
                ChatLib.command(`pc [SS] ${player} is a shitter.`);
            }


        }
    }).catch(error => {
        ChatLib.chat("&6[SkyStats] &4&lERROR &7- &cFailed to check shitter status.");
        console.error(error);
    });

    partyFinderJoin(player);

}).setCriteria("Party Finder > ${player} joined the dungeon group! (${classs} Level ${number})")