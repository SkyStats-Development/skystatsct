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
            `&7/shitter migrate &8- Imports [&a&lJowoel&8&lAddons&f]&8 shitterlist to your default shitterlist.`,
            `&7/shitter toggle [list] &8- Toggles the shitterlist on or off. if no name is provided, toggles all lists.`,
            `&7/shitter add <player> [reason] &8- Adds a player to the shitterlist with an optional reason.`,
            `&7/shitter remove <player> &8- Removes a player from the shitterlist.`,
            `&7/shitter list &8- Lists all shitterlists.`,
            `&7/shitter lookup <player> &8- Looks up a player in the shitterlist.`,
            `&7/shitter clear &8- Clears the shitterlist. (default only - if you imported a list please remove manually)`,
            `&7/shitter setting <setting> [value] &8- Toggles settings (kick, notif, reason). if no value is provided, toggles the setting globally.`,
            `&7/shitter devmanualbuild &8- Builds the shitterlist manually. For developers only.`,
            `&7/shitter test &8- Test command.`,
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
        ChatLib.chat("bro thinks he's slick lmao");
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