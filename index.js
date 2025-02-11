/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

print("[SkyStats] SkyStats CT Module - SkyStats Development");
const { oauth } = require("./functions/authFunction")
const { createFile, genConfig } = require("./functions/shitterFunctions")
const { fetchDailyQuote } = require("./functions/fetchDailyQuote.js")
fetchDailyQuote()
createFile(),
    genConfig()
oauth()
import { skystatsCommand } from "./commands/skystatsCommand.js";
import { shitterCommand } from "./commands/shitterCommand.js";
import { cryptCommand } from "./commands/cryptCommand.js";
/* https://cdn.axle.coffee/images/cf5ef67f.png */;

import "./features/firstInstall.js"; // Check if this is the first time running
//import "./features/partyfinderqueue.js" // do not use till I fix it , it's broken right now...            
import "./features/partyfinder"; // handles party finder stats(etc)
//import "./features/partyjoiner.js"

