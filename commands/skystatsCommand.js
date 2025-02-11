//messages.forEach(a => ChatLib.chat(ChatLib.getCenteredText(a)))
import Config from "../Config.js";

const { checkShitterStatusInternal } = require("../functions/shitterFunctions");

export const skystatsCommand = register("command", (...args) => {
    const { partyFinderJoin } = require("../functions/partyFinderJoin.js");
    let commands = [
        "",
        "help",
        "simjoin"
    ]
    let messages = [
        `&4&m${ChatLib.getChatBreak(" ")}`,
        `${ChatLib.getCenteredText("&6&l&n SkyStats CT Module - SkyStats Development")}`,
        ` `,
        `&7<> = Required Imput [] = Optional input`,
        `&7/ss simjoin <player> &8- Simulates a player joining a dungeon queue`,
        `&7/crypt [player] &8- Generates a SkyCrypt link to a working SkyCrypt domain for the specified player`,
        `&4&m${ChatLib.getChatBreak(" ")}`
    ]
    if (!args || !args[0]) return Config.openGUI();
    let command = args[0].toLowerCase();
    if (command === "help") {
        ChatLib.chat(messages.join("\n"));
    }
    if (command === "simjoin") {
        if (!args[1]) {
            ChatLib.chat("&cPlease specify an IGN.");
        }
        let username = args[1]
        let player = username;
        checkShitterStatusInternal(player).then(status => {
            console.log(status.shitter)
            if (status.shitter) {
                if (status.dokick) {
                    ChatLib.command(`party kick ${player}`);
                }
                if (status.doannouncereason) {
                    ChatLib.command(`pc [SS] ${player} is a shitter. Reason: ${status.reason}`);
                }
                if (!status.doannouncereason && status.doannounce) {
                    ChatLib.command(`pc [SS] ${player} is a shitter.`);
                }


            }
        }).catch(error => {
            ChatLib.chat("&6[SkyStats] &4&lERROR &7- &cFailed to check shitter status.");
            console.error(error);
        });
        partyFinderJoin(username)
    }
    if (!commands.includes(command)) {
        ChatLib.chat("&cUnknown Command! Use /ss help for more info.");
    }

}).setName("ss").setAliases(["skystats", "skystatsct"])


