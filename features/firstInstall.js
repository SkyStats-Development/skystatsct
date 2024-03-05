/* thank you bloom for this still learning */
import { pogdata } from "../functions/pogFunctions";

const checkFirstInstall = () => {
    if (!pogdata.firstTime) return
    pogdata.firstTime = false
    pogdata.save()

    let messages = [
        `&4&m${ChatLib.getChatBreak(" ")}`,
        `${ChatLib.getCenteredText("&6&l&nSkyStats CT Module - SkyStats Development")}`,
        ` `,
        `${ChatLib.getCenteredText("&6Hi! This is your first time using SkyStats CT Module")}`,
        " ",
        `${ChatLib.getCenteredText("&6Run &7/ss help &6to get started :D")}`,
        `${ChatLib.getCenteredText("&6We have a discord!")}`,
        `${ChatLib.getCenteredText("https://discord.gg/t72DVzCCJT")}`,
        `${ChatLib.getCenteredText("&6Join if you need any support or have any ideas :B")}`,
        `&4&m${ChatLib.getChatBreak(" ")}`
    ]
    ChatLib.chat(messages.join("\n"))
}

register("tick", () => {
    checkFirstInstall()

})