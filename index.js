print("[SkyStats] SkyStats CT Module - SkyStats Development");
const { oauth } = require("./functions/authFunction")
oauth()
import { skystatsCommand } from "./commands/skystatsCommand.js";
import { cryptCommand } from "./commands/cryptCommand.js";


import "./features/firstInstall.js"; // Check if this is the first time running
//import "./features/partyfinderqueue.js" // do not use till I fix it , it's broken right now...            
import  "./features/partyfinder"; // handles party finder stats(etc)
//import "./features/partyjoiner.js"
print("[SkyStats] SkyStats CT Module Loaded Correctly | Production Version: v1.0.0");

