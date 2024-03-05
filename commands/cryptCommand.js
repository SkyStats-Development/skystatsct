import Config from "../Config.js"


export const cryptCommand = register("command", (...args) => {
    let username = "";
    if(!Config.cryptCommand) {
        return ChatLib.chat("&6[SkyStats] &7You tried to use a feature that is disabled in the config... run &6/ss &7to change this!")
    }
    if (!args || !args[0]) {
        username = Player.getName()
        let crypt_vex = [
            `&6[SkyStats] &7SkyCrypt Link for ${username} `,
            new TextComponent(`&e(Click Here)`).setClick("open_url", `https://sky.lenny.ie/${username}`)
        ]
        new Message(...crypt_vex).chat()
    } else {
        username = args[0];
        let crypt_vex = [
            `&6[SkyStats] &7SkyCrypt Link for ${username} `,
            new TextComponent(`&e(Click Here)`).setClick("open_url", `https://sky.lenny.ie/${username}`)
        ]
        new Message(...crypt_vex).chat()
    }

}).setName("crypt").setAliases(["skycrypt"])