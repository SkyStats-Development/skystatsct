import axios from "axios"
import { pogdata } from "../functions/pogFunctions";


let API_KEY = "";

function oauth() {
    ChatLib.chat("called")
    let uuid = Player.getUUID();
    print("Attempting auth...");
    ChatLib.chat("&6[SkyStats] &7Logging in your client to our servers...");
    axios.get(`https://api.skystats.lol/auth/${uuid}`)
    .then(response => {
        let response_data = response.data.data
        if (response.data.status === 100 /*100 = no auth on right now */) {
            API_KEY = response_data.apiKey
            pogdata.API_KEY = response_data.apiKey
            pogdata.save()
            ChatLib.chat("&6[SkyStats] &7Finished Loading!");
        }
        else if (response_data.uuid === "ERROR_WITH_AUTH") {
            ChatLib.chat("&6[SkyStats] &7Error with AUTH: invalid UUID - this could be our servers")
            ChatLib.chat("&6[SkyStats] &7You were not authed! unloading all of chattriggers, if this is an error try deleting the skystatsct module folder and reinstalling")
            ChatTriggers.unloadCT(true)
        }
        else if (response_data.uuid !== uuid) {
            ChatLib.chat("&6[SkyStats] &7Error with AUTH: invalid UUID")
            ChatLib.chat("&6[SkyStats] &7You were not authed! unloading all of chattriggers, if this is an error try deleting the skystatsct module folder and reinstalling")
            ChatTriggers.unloadCT(true)
        }
        else if (response_data.uuid === "BLACKLISTED") {
            ChatLib.chat("&6[SkyStats] &7Error with AUTH: You've been blacklisted. contact @axle.coffee on discord to appeal this.")
            ChatLib.chat("&6[SkyStats] &7You were not authed! unloading all of chattriggers, if this is an error try deleting the skystatsct module folder and reinstalling")
            ChatTriggers.unloadCT(true)
        } else if (
            response_data.uuid === uuid && response.response_data.status === 200
        ) {
            API_KEY = response_data.apiKey
            //ChatLib.chat("&6[SkyStats] &7Finished Loading!");
        } else {
            API_KEY = response_data.apiKey
            ChatLib.chat("&6[SkyStats] &7You were authed but something broke - this may cause you to not be able to login after an update be warned!");
        }
})
    .catch(error => {
      print(error)
      ChatLib.chat("&6[SkyStats] &7You were not authed! unloading all of chattriggers, if this is an error try deleting the skystatsct module folder and reinstalling")
      ChatTriggers.unloadCT(true)
    });
}   

module.exports = { oauth, API_KEY };