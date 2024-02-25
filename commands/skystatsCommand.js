const { partyFinderJoin } = require("../functions/partyFinderJoin.js");
let messages = [
    `&4&m${ChatLib.getChatBreak(" ")}`,
    `${ChatLib.getCenteredText("&6&l&n SkyStats CT Module - SkyStats Development")}`,
    ` `,
    `&7<> = Required Imput [] = Optional input`,
    `&7/ss simjoin <player> &8- Simulates a player joining a dungeon queue`,
    `&7/crypt [player] &8- Generates a SkyCrypt link to a working SkyCrypt domain for the specified player`,
    `&4&m${ChatLib.getChatBreak(" ")}`
]
//messages.forEach(a => ChatLib.chat(ChatLib.getCenteredText(a)))
export const skystatsCommand = register("command", (...args) => {
    if (!args || !args[0]) return ChatLib.chat(messages.join("\n"));
    let command = args[0].toLowerCase();
    if (command === "simjoin") {
        let username = args[1]
        partyFinderJoin(username, "Archer", 50)
    }



}).setName("ss").setAliases(["skystats", "skystatsct"])


