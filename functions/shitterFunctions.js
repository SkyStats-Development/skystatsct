import request from "../../requestV2";

export const getMojangInfo = (player) => {
    if (player.length > 16) return request({ url: `https://sessionserver.mojang.com/session/minecraft/profile/${player}`, json: true }).catch(e => null)
    return request({ url: `https://api.mojang.com/users/profiles/minecraft/${player}`, json: true }).catch(e => null)
}

function createFile() {
    if (!FileLib.exists("skystatsct", "/clientConfig/shitterconfig/default.json")) {
        FileLib.write("skystatsct", "/clientConfig/shitterconfig/default.json", "[]", true)
    }
}

function genConfig() {
    if (!FileLib.exists("skystatsct", "/clientConfig/shitterconfig/config.json")) {
        FileLib.write("skystatsct", "/clientConfig/shitterconfig/config.json", "{\"kick_on_join\": [\"default\"],\"chat_on_join\": [],\"exclude_message\": [],\"loaded_configs\": [\"default\"]}", true)
    }
}

function removeShitter(name) {
    if (!name) {
        ChatLib.chat("&cPlease provide a username.");
        return;
    }

    getMojangInfo(name).then((mojangInfo) => {
        if (!mojangInfo) {
            ChatLib.chat("&cFailed to get Mojang info for the username.");
            return;
        }

        let uuid = mojangInfo.id;

        if (!FileLib.exists("skystatsct", "/clientConfig/shitterconfig/default.json")) {
            ChatLib.chat("&cdefault.json does not exist.");
            return;
        }

        let shitterList = JSON.parse(FileLib.read("skystatsct", "/clientConfig/shitterconfig/default.json"));
        let updatedList = shitterList.filter(shitter => shitter.uuid !== uuid);

        if (shitterList.length === updatedList.length) {
            ChatLib.chat("&cShitter not found in default.json.");
            return;
        }

        FileLib.write("skystatsct", "/clientConfig/shitterconfig/default.json", JSON.stringify(updatedList), true);
        ChatLib.chat(`&6[SkyStats] &7Successfully removed ${name} from default.json`);
    }).catch(e => {
        ChatLib.chat("&cFailed to get Mojang info for the username.");
    });
}


function lookupShitter(name) {
    if (!name) {
        ChatLib.chat("&cPlease provide a username.");
        return;
    }

    const File = Java.type("java.io.File");
    let dir = new File(Config.modulesFolder + "/skystatsct/clientConfig/shitterconfig");
    let files = dir.listFiles();
    let found = false;

    getMojangInfo(name).then((mojangInfo) => {
        if (!mojangInfo) {
            ChatLib.chat("&cFailed to get Mojang info for the username.");
            return;
        }

        let uuid = mojangInfo.id;
        let pName = mojangInfo.name;

        for (let i = 0; i < files.length; i++) {
            if (files[i].isFile() && files[i].getName() !== "config.json" && files[i].getName() !== "default.old") {
                let fileContent = FileLib.read("skystatsct", `/clientConfig/shitterconfig/${files[i].getName()}`);
                let shitterList = [];
                try {
                    shitterList = JSON.parse(fileContent);
                } catch (e) {
                    ChatLib.chat(`&cFailed to parse JSON in ${files[i].getName()}`);
                    continue;
                }

                if (!Array.isArray(shitterList)) {
                    ChatLib.chat(`&cInvalid format in ${files[i].getName()}`);
                    continue;
                }

                let shitter = shitterList.find(shitter => shitter.uuid === uuid);

                if (shitter) {
                    found = true;

                    let messages = [
                        `&4&m${ChatLib.getChatBreak(" ")}`,
                        `&6&l Shitter found on ${files[i].getName().replace(".json", "")} list`,
                        ` `,
                        `&a&lName&7: &b${pName}`,
                        `&a&lReason&7: &c${shitter.reason}`,
                        `&a&lDate Added&7: &e${shitter.time || "Unknown"}`,
                        `&4&m${ChatLib.getChatBreak(" ")}`

                    ]
                    ChatLib.chat(messages.join("\n"));
                }
            }
        }

        if (!found) {
            ChatLib.chat("&cShitter not found.");
        }
    }).catch(e => {
        console.log(e);
        ChatLib.chat("&cFailed to get Mojang info for the username.");
    });
}



function toggleShitterList(configName) {
    let config = getConfig();

    if (configName) {
        // Normalize the config name
        configName = configName.toLowerCase().replace(".json", "");

        if (!config.loaded_configs.includes(configName)) {
            config.loaded_configs.push(configName);
            ChatLib.chat(`&6[SkyStats] &7Successfully enabled ${configName}`);
        } else {
            config.loaded_configs = config.loaded_configs.filter(name => name !== configName);
            ChatLib.chat(`&6[SkyStats] &7Successfully disabled ${configName}`);
        }
    } else {
        // Toggle all configs
        let allEnabled = config.loaded_configs.length > 0;

        if (allEnabled) {
            config.loaded_configs = [];
            ChatLib.chat("&6[SkyStats] &7You have disabled all shitter lists.");
        } else {
            config.loaded_configs = listShitterLists().map(list => list.replace(".json", ""));
            ChatLib.chat("&6[SkyStats] &7You have enabled all shitter lists.");
        }
    }

    FileLib.write("skystatsct", "/clientConfig/shitterconfig/config.json", JSON.stringify(config), true);
}

function listShitterLists() {
    const File = Java.type("java.io.File");
    let dir = new File(Config.modulesFolder + "/skystatsct/clientConfig/shitterconfig");
    let files = dir.listFiles();
    let shitterLists = [];

    for (let i = 0; i < files.length; i++) {
        if (files[i].isFile() && files[i].getName() !== "config.json" && files[i].getName() !== "default.old") {
            shitterLists.push(files[i].getName().replace(".json", "").toLowerCase());
        }
    }

    if (shitterLists.length === 0) {
        ChatLib.chat("&cNo shitter lists found.");
        return [];
    }

    let messages = [
        `&4&m${ChatLib.getChatBreak(" ")}`,
        `${ChatLib.getCenteredText("&6&l Available Shitter lists and their status")}`,
        ` `
    ];

    shitterLists.forEach(list => {
        let autokick_status = isConfigEnabled("kick_on_join", list) ? "&a&l⚫" : "&c&l⚫";
        let chat_on_join_status = isConfigEnabled("chat_on_join", list) ? "&a&l⚫" : "&c&l⚫";
        let exclude_message_status = isConfigEnabled("exclude_message", list) ? "&a&l⚫" : "&c&l⚫";
        let list_status = isConfigEnabled("loaded_configs", list) ? "&a" : "&c";
        messages.push(`${list_status}${list} &7| &7Auto Kick: ${autokick_status} &7| &7Party Notif: ${chat_on_join_status} &7| &7Exclude Reason: ${exclude_message_status}`);
    });

    messages.push(`&4&m${ChatLib.getChatBreak(" ")}`);
    ChatLib.chat(messages.join("\n"));

    return shitterLists;
}

function clearShitterList() {
    const defaultPath = "/clientConfig/shitterconfig/default.json";
    const oldPath = "/clientConfig/shitterconfig/default.old";

    if (FileLib.exists("skystatsct", defaultPath)) {
        let oldContent = FileLib.read("skystatsct", defaultPath);
        FileLib.write("skystatsct", oldPath, oldContent, true);

        FileLib.write("skystatsct", defaultPath, "[]", true);
        ChatLib.chat("&6[SkyStats] &7Successfully cleared &adefault.json &7and saved the old version as &cdefault.old");
    } else {
        ChatLib.chat("&cdefault.json does not exist.");
    }
}

function getConfig() {
    if (!FileLib.exists("skystatsct", "/clientConfig/shitterconfig/config.json")) {
        genConfig();
    }
    return JSON.parse(FileLib.read("skystatsct", "/clientConfig/shitterconfig/config.json"));
}

function setConfigOption(option, value) {
    let config = getConfig();
    if (typeof value === 'boolean') {
        config[option] = value;
    } else if (Array.isArray(value)) {
        config[option] = value;
    } else {
        ChatLib.chat("&cInvalid value. Must be a boolean or an array.");
        return;
    }
    FileLib.write("skystatsct", "/clientConfig/shitterconfig/config.json", JSON.stringify(config), true);
    ChatLib.chat(`&6[SkyStats] &7Successfully updated ${option} to ${JSON.stringify(value)}`);
}

function isConfigEnabled(option, configName) {
    let config = getConfig();
    if (Array.isArray(config[option])) {
        return config[option].includes(configName);
    }
    return config[option];
}

function addConfigToOption(option, configName) {
    let config = getConfig();
    if (!Array.isArray(config[option])) {
        config[option] = [];
    }
    if (!config[option].includes(configName)) {
        config[option].push(configName);
        FileLib.write("skystatsct", "/clientConfig/shitterconfig/config.json", JSON.stringify(config), true);
        ChatLib.chat(`&6[SkyStats] &7Successfully added ${configName} to ${option}`);
    } else {
        ChatLib.chat(`&c${configName} is already in ${option}`);
    }
}

function removeConfigFromOption(option, configName) {
    let config = getConfig();
    if (Array.isArray(config[option])) {
        config[option] = config[option].filter(name => name !== configName);
        FileLib.write("skystatsct", "/clientConfig/shitterconfig/config.json", JSON.stringify(config), true);
        ChatLib.chat(`&6[SkyStats] &7Successfully removed ${configName} from ${option}`);
    } else {
        ChatLib.chat(`&c${option} is not an array`);
    }
}

function importJowoelShitters() {
    if (!FileLib.exists("JowoelAddons", "/data/shitterList.json")) {
        ChatLib.chat("&cYou're currently not using Jowoel's shitterlist")
        return;
    }
    let jaShitters = FileLib.read("JowoelAddons", "/data/shitterList.json");

    let shitterList = JSON.parse(jaShitters);

    let convertedList = shitterList.map(shitter => {
        return {
            uuid: shitter.uuid,
            reason: shitter.reason,
            time: new Date().toISOString()
        };
    });

    FileLib.write("skystatsct", "/clientConfig/shitterconfig/default.json", JSON.stringify(convertedList), true);
    ChatLib.chat("&6[SkyStats] &7Successfully converted [&a&lJowoel&8&lAddons&f]&7 shitterlist to SkyStats shitterlist.")
}

function addShitter(name, reason) {

    if (!name) {
        ChatLib.chat("&cPlease provide a username.");
        return;
    }

    if (!reason) {
        reason = "No reason provided";
    }

    getMojangInfo(name).then((mojangInfo) => {

        if (!mojangInfo) {
            ChatLib.chat("&cFailed to get Mojang info for the username.");
            return;
        }

        let uuid = mojangInfo.id;

        if (!FileLib.exists("skystatsct", "/clientConfig/shitterconfig/default.json")) {
            ChatLib.chat("&cdefault.json does not exist.");
            return;
        }

        let shitterList = JSON.parse(FileLib.read("skystatsct", "/clientConfig/shitterconfig/default.json"));
        if (shitterList.find(shitter => shitter.uuid === uuid)) {
            ChatLib.chat("&cShitter already exists in default.json.");
            return;
        }
        shitterList.push({
            uuid: uuid,
            reason: reason,
            time: new Date().toISOString()
        });

        FileLib.write("skystatsct", "/clientConfig/shitterconfig/default.json", JSON.stringify(shitterList), true);
        ChatLib.chat(`&6[SkyStats] &7Successfully added ${name} to default.json`);
    }).catch(e => {
        ChatLib.chat("&cFailed to get Mojang info for the username.");
    });
}

function importList(url) {
    if (!url) {
        ChatLib.chat("&cPlease provide a URL to import from.")
        return;
    }
    let list;
    try {
        list = JSON.parse(FileLib.getUrlContent(url));
    } catch (e) {
        ChatLib.chat("&cFailed to parse JSON from the provided URL.")
        return;
    }



    let fileName = url.split('/').pop().split('.')[0];

    if (!fileName) {
        ChatLib.chat("&cThe URL must point to a valid file.")
        return;
    }

    let convertedList = list.map(shitter => {
        return {
            uuid: shitter.uuid,
            reason: shitter.reason,
            time: shitter.time || new Date().toISOString()
        };
    });

    FileLib.write("skystatsct", `/clientConfig/shitterconfig/${fileName}.json`, JSON.stringify(convertedList), true);
    ChatLib.chat(`&6[SkyStats] &7Successfully imported list from URL and saved as ${fileName}.json`)
}


function toggleSetting(option, configName) {
    let config = getConfig();

    if (!option || !config.hasOwnProperty(option)) {
        ChatLib.chat("&cInvalid option provided.");
        return listShitterLists();
    }

    if (configName) {
        // Normalize the config name
        configName = configName.toLowerCase().replace(".json", "");

        if (Array.isArray(config[option])) {
            if (config[option].map(name => name.toLowerCase()).includes(configName)) {
                config[option] = config[option].filter(name => name.toLowerCase() !== configName);
                ChatLib.chat(`&6[SkyStats] &7Successfully disabled ${configName} for ${option}`);
            } else {
                config[option].push(configName);
                ChatLib.chat(`&6[SkyStats] &7Successfully enabled ${configName} for ${option}`);
            }
        } else {
            ChatLib.chat("&cInvalid option type.");
            return listShitterLists();
        }
    } else {
        // Toggle all configs
        if (Array.isArray(config[option])) {
            let allEnabled = config[option].length > 0;

            if (allEnabled) {
                config[option] = [];
                ChatLib.chat(`&6[SkyStats] &7You have disabled all ${option} settings.`);
            } else {
                config[option] = listShitterLists().map(list => list.replace(".json", ""));
                ChatLib.chat(`&6[SkyStats] &7You have enabled all ${option} settings.`);
            }
        } else {
            ChatLib.chat("&cInvalid option type.");
            return listShitterLists();
        }
    }

    FileLib.write("skystatsct", "/clientConfig/shitterconfig/config.json", JSON.stringify(config), true);
}

function checkShitterStatus(player) {
    let config = getConfig();
    let applicableLists = config.loaded_configs;

    if (!applicableLists || applicableLists.length === 0) {
        return null;
    }
    return getMojangInfo(player).then((mojangInfo) => {
        if (!mojangInfo) {
            return { response: "&cFailed to get Mojang info for the username.", case: false };
        }

        let uuid = mojangInfo.id;
        let pName = mojangInfo.name;

        const File = Java.type("java.io.File");
        let dir = new File(Config.modulesFolder + "/skystatsct/clientConfig/shitterconfig");
        let files = dir.listFiles();
        let found = false;
        let foundInLists = [];
        let shitterReason = "";
        let shitterTime = "";

        for (let i = 0; i < files.length; i++) {
            if (files[i].isFile() && files[i].getName() !== "config.json" && files[i].getName() !== "default.old") {
                let fileName = files[i].getName().replace(".json", "").toLowerCase();
                if (applicableLists.includes(fileName)) {
                    let fileContent = FileLib.read("skystatsct", `/clientConfig/shitterconfig/${files[i].getName()}`);
                    let shitterList = [];
                    try {
                        shitterList = JSON.parse(fileContent);
                    } catch (e) {
                        continue;
                    }

                    if (!Array.isArray(shitterList)) {
                        continue;
                    }

                    let shitter = shitterList.find(shitter => shitter.uuid === uuid);

                    if (shitter) {
                        found = true;
                        foundInLists.push(fileName);
                        shitterReason = shitter.reason;
                        shitterTime = shitter.time || "Unknown";
                    }
                }
            }
        }

        if (found) {
            return {
                response: `&c&l[SHITTER DETECTED]\n\n&c&lReason: &7${shitterReason}\n&c&lList(s): &7${foundInLists.join(", ")}\n&cTime: &7${shitterTime}\n`,
                case: true
            };
        } else {
            return { response: `&6[SkyStats] &7${pName} is not found on any shitter lists.`, case: false };
        }
    }).catch(e => {
        return { response: "&cFailed to get Mojang info for the username.", case: false };
    });
}

function checkShitterStatusInternal(player) {
    let config = getConfig();
    let applicableLists = config.loaded_configs;

    if (!applicableLists || applicableLists.length === 0) {
        return Promise.resolve({
            shitter: false,
            dokick: false,
            doannounce: false,
            doannouncereason: false,
            message: "&cNo shitter lists are loaded."
        });
    }

    return getMojangInfo(player).then((mojangInfo) => {
        if (!mojangInfo) {
            return {
                shitter: false,
                dokick: false,
                doannounce: false,
                doannouncereason: false,
                message: "&cFailed to get Mojang info for the username."
            };
        }

        let uuid = mojangInfo.id;
        let pName = mojangInfo.name;

        const File = Java.type("java.io.File");
        let dir = new File(Config.modulesFolder + "/skystatsct/clientConfig/shitterconfig");
        let files = dir.listFiles();
        let found = false;
        let foundInLists = [];
        let shitterReason = "";
        let shitterTime = "";

        for (let i = 0; i < files.length; i++) {
            if (files[i].isFile() && files[i].getName() !== "config.json" && files[i].getName() !== "default.old") {
                let fileName = files[i].getName().replace(".json", "").toLowerCase();
                if (applicableLists.includes(fileName)) {
                    let fileContent = FileLib.read("skystatsct", `/clientConfig/shitterconfig/${files[i].getName()}`);
                    let shitterList = [];
                    try {
                        shitterList = JSON.parse(fileContent);
                    } catch (e) {
                        continue;
                    }

                    if (!Array.isArray(shitterList)) {
                        continue;
                    }

                    let shitter = shitterList.find(shitter => shitter.uuid === uuid);

                    if (shitter) {
                        found = true;
                        foundInLists.push(fileName);
                        shitterReason = shitter.reason;
                        shitterTime = shitter.time || "Unknown";
                    }
                }
            }
        }

        if (found) {
            let dokick = foundInLists.some(list => config.kick_on_join.includes(list));
            let doannounce = foundInLists.some(list => config.chat_on_join.includes(list));
            let doannouncereason = foundInLists.some(list => config.exclude_message.includes(list));

            return {
                shitter: true,
                dokick: dokick,
                reason: shitterReason,
                doannounce: doannounce,
                doannouncereason: doannouncereason,
                message: `\n&c&l[SHITTER DETECTED]\n\n&c&lPlayer: &7${pName}\n&c&lReason: &7${shitterReason}\n&c&lList(s): &7${foundInLists.join(", ")}\n&cTime: &7${shitterTime}\n`
            };
        } else {
            return {
                shitter: false,
                dokick: false,
                doannounce: false,
                doannouncereason: false,
                message: `&6[SkyStats] &7${pName} is not found on any shitter lists.`
            };
        }
    }).catch(e => {
        return {
            shitter: false,
            dokick: false,
            doannounce: false,
            doannouncereason: false,
            message: "&cFailed to get Mojang info for the username."
        };
    });
}



module.exports = { checkShitterStatusInternal, checkShitterStatus, toggleSetting, toggleShitterList, removeShitter, clearShitterList, createFile, importJowoelShitters, addShitter, importList, genConfig, listShitterLists, getConfig, setConfigOption, isConfigEnabled, addConfigToOption, removeConfigFromOption, lookupShitter };