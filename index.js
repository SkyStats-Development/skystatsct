print("[SkyStats] SkyStats CT Module - SkyStats Development");
import { skystatsCommand } from "./commands/skystatsCommand.js";
import { cryptCommand } from "./commands/cryptCommand.js";
import axios from "axios";

export let API_KEY = ""

function oauth() {
    let uuid = Player.getUUID();
    print("Attempting auth...");
    ChatLib.chat("&6[SkyStats] &7Logging in your client to our servers...");
    axios.get(`https://api.skystats.lol/auth/${uuid}`)
    .then(response => {
        let data = response.data.data
        if (response.data.status === 100 /*100 = no auth on right now */) {
            API_KEY = data.apiKey
            ChatLib.chat("&6[SkyStats] &7Finished Loading!");
        }
        else if (data.uuid === "ERROR_WITH_AUTH") {
            ChatLib.chat("&6[SkyStats] &7Error with AUTH: invalid UUID - this could be our servers")
            ChatLib.chat("&6[SkyStats] &7You were not authed! unloading all of chattriggers, if this is an error try deleting the skystatsct module folder and reinstalling")
            ChatTriggers.unloadCT(true)
        }
        else if (data.uuid !== uuid) {
            ChatLib.chat("&6[SkyStats] &7Error with AUTH: invalid UUID")
            ChatLib.chat("&6[SkyStats] &7You were not authed! unloading all of chattriggers, if this is an error try deleting the skystatsct module folder and reinstalling")
            ChatTriggers.unloadCT(true)
        }
        else if (data.uuid === "BLACKLISTED") {
            ChatLib.chat("&6[SkyStats] &7Error with AUTH: You've been blacklisted. contact @axle.coffee on discord to appeal this.")
            ChatLib.chat("&6[SkyStats] &7You were not authed! unloading all of chattriggers, if this is an error try deleting the skystatsct module folder and reinstalling")
            ChatTriggers.unloadCT(true)
        } else if (
            data.uuid === uuid && response.data.status === 200
        ) {
            API_KEY = data.apiKey
            ChatLib.chat("&6[SkyStats] &7Finished Loading!");
        } else {
            API_KEY = data.apiKey
            ChatLib.chat("&6[SkyStats] &7You were authed but something broke - this may cause you to not be able to login after an update be warned!");
        }
})
    .catch(error => {
      print(error)
      ChatLib.chat("&6[SkyStats] &7You were not authed! unloading all of chattriggers, if this is an error try deleting the skystatsct module folder and reinstalling")
      ChatTriggers.unloadCT(true)
    });
}   
oauth()

import "./features/firstInstall.js"; // Check if this is the first time running
//import "./features/partyfinderqueue.js" // do not use till I fix it , it's broken right now...            
import  "./features/partyfinder"; // handles party finder stats(etc)
//import "./features/partyjoiner.js"
print("[SkyStats] SkyStats CT Module Loaded Correctly | Production Version: v1.0.0");

