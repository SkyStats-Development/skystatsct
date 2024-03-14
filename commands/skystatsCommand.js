//messages.forEach(a => ChatLib.chat(ChatLib.getCenteredText(a)))
import Config from "../Config.js";

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
        let username = args[1]
        partyFinderJoin(username)
    }
    if (!commands.includes(command)) {
        ChatLib.chat("&cUnknown Command! Use /ss help for more info.");
    }

}).setName("ss").setAliases(["skystats", "skystatsct"])


