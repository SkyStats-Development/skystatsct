const { secretsColorizer, dailyRunsColorizer } = require("../functions/colorizeFunctions");
const { addCommas, sanitizeString, timeToString } = require('../functions/helperFunctions');
import axios from "axios";
import { API_KEY } from "../index"; 

function partyFinderJoin(player, classs, number) {
  axios.get(`https://api.skystats.lol/partyfinder/${player}?key=${API_KEY}`)
    .then(response => {
    let data = response.data.data
    let profile_vex = [
        `&4&m${ChatLib.getChatBreak(" ")}\n`,
        `&6&lStat Info for ${player} &6&lon ${data.player_profilename}\n`,
        ` \n`,
        `&a&lCatacombs Level: &b&l${data.dungeons.catacombs_experience.levelWithProgress.toFixed(2)} &7| &b&l${classs} ${number}\n`,
        `&aTotal Secrets: ${secretsColorizer(data.dungeons.catacombs_secrets)}\n`,
        `&aLast Floor Played: ${sanitizeString(data.dungeons.last_floor)} &7(${dailyRunsColorizer(data.dungeons.daily_completed_runs)}&7/5 Dailies)\n`,
        ` \n`,
        `&aMP: &6&l${data.selected_magical_power} &7(${addCommas(data.magical_power)})\n`,
        `&aNetworth: &6${addCommas(data.total_networth.toString().split(".")[0])}\n`,
        ` \n`,
        new TextComponent(`&a&l[PV] `).setClick("run_command", `/pv ${player}`),
        new TextComponent(`&e&l[SKYCRYPT] `).setClick("open_url", `https://sky.lenny.ie/${player}`),
        new TextComponent(`&c&l[KICK] `).setClick("run_command", `/party kick ${player}`),
        new TextComponent(`&7&l[BLOCK]\n`).setClick("run_command", `/ignore add ${player}`),
        `&4&m${ChatLib.getChatBreak(" ")}\n`,
    ]
    new Message(...profile_vex).chat()
})
    .catch(error => {
      console.error(error.toString());
    });
};

module.exports = { partyFinderJoin }