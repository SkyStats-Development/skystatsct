import Config from "../Config.js"
const { checkShitterStatusInternal } = require("../functions/shitterFunctions");


const { toggleSetting, toggleShitterList, removeShitter, clearShitterList, createFile, importJowoelShitters, addShitter, importList, genConfig, listShitterLists, getConfig, setConfigOption, isConfigEnabled, addConfigToOption, removeConfigFromOption, lookupShitter } = require("../functions/shitterFunctions.js")

export const shitterCommand = register("command", (...args) => {
    if (!args) return ChatLib.chat("&cPlease specify a command. Use /shitter help for more info.")
    let cmd_options_array = [
        "",
        "help",
        "add",
        "remove",
        "list",
        "lookup",
        "clear",
        "import",
        "migrate",
        "devmanualbuild",
        "test",
        "setting",
        "toggle"
    ]
    let command = args[0].toLowerCase();
    if (Config.kickershitter === false) return ChatLib.chat("&cShitter Kicker is disabled in the settings.")
    if (!cmd_options_array.includes(command)) {
        ChatLib.chat("&cUnknown Command! Use /shitter help for more info.");
    }

    if (command === "help") {
        let messages = [
            `&4&m${ChatLib.getChatBreak(" ")}`,
            `${ChatLib.getCenteredText("&6&l Shitter Kicker")}`,
            `${ChatLib.getCenteredText("&7<> = Required Imput [] = Optional input")}`,
            ` `,
            `&7/shitter import &8- Imports [&a&lJowoel&8&lAddons&f]&8 shitterlist to your default shitterlist.`,
            `&7line 2`,
            `&4&m${ChatLib.getChatBreak(" ")}`
        ]
        ChatLib.chat(messages.join("\n"))
    }
    if (command === "list") {
        listShitterLists()
    }
    if (command === "toggle") {
        if (args.length < 2) {
            toggleShitterList();
        } else {
            toggleShitterList(args[1]);
        }
    }
    if (command === "lookup") {
        if (args.length < 2) {
            ChatLib.chat("&cPlease provide a username to lookup.");
            return;
        }
        lookupShitter(args[1])
    }
    if (command === "add") {
        if (args.length < 2) {
            ChatLib.chat("&cPlease provide a username to add.");
            return;
        }
        let reason = args.slice(2).join(" ") || "No reason provided";
        addShitter(args[1], reason);
    }


    if (command === "migrate") {
        importJowoelShitters()
    }

    if (command === "setting") {
        if (args.length < 2) {
            ChatLib.chat("&cPlease provide a setting to toggle (kick, notif, reason).");
            return;
        }
        let setting = args[1].toLowerCase();
        let validSettings = ["kick", "notif", "reason"];
        if (!validSettings.includes(setting)) {
            ChatLib.chat("&cInvalid setting. Use kick, notif, or reason.");
            return;
        }
        let option = setting === "kick" ? "kick_on_join" : setting === "notif" ? "chat_on_join" : "exclude_message";
        if (args.length < 3) {
            toggleSetting(option);
        } else {
            toggleSetting(option, args[2]);
        }
    }

    if (command === "import") {
        if (args.length < 2) {
            ChatLib.chat("&cPlease provide a username to add to the shitterlist.");
            return;
        }
        importList(args[1])
    }
    if (command === "test") {
        listShitterLists()
    }
    if (command === "clear") {
        clearShitterList()
    }

    if (command === "remove") {
        if (args.length < 2) {
            ChatLib.chat("&cPlease provide a username to remove from the shitterlist.");
            return;
        }
        removeShitter(args[1])

    }


    if (command === "devmanualbuild") {
        ChatLib.chat("&cThis command is for developers only. Please use at your own risk.");
        ChatLib.chat("&cThis command will attempt to build the shitterlist manually.");
        createFile()
        genConfig()
    }

}).setName("shitter").setAliases(["sh", "crapper", "shitterlist", "shitter", "shit"])