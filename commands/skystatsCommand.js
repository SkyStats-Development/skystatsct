
export const skystatsCommand = register("command", () =>   { let messages = [
    `&4&m${ChatLib.getChatBreak(" ")}`,
    `${ChatLib.getCenteredText("&6&l&n SkyStats CT Module - SkyStats Development")}`,
    ` `,
    `&7No Commands for now - Queue a party to see people's stats`,
    `&4&m${ChatLib.getChatBreak(" ")}`
]
//messages.forEach(a => ChatLib.chat(ChatLib.getCenteredText(a)))
ChatLib.chat(messages.join("\n"))}).setName("ss").setAliases(["skystats", "skystatsct"])


