const { secretsColorizer, dailyRunsColorizer } = require("../functions/colorizeFunctions");
const { addCommas, sanitizeString, timeToString } = require('../functions/helperFunctions');
import axios from "axios";

function partyFinderJoin(player, classs, number) {
    print(player)
  axios.get(`https://api.skystats.lol/partyfinder/${player}?key=73d628c622231d1603013f90a8dc198e8eeddc1901d4bab74b5e46b0470417a71aad66da42ef1e3276f1e1c3c95f71c67d46e37fa347626d18c0731734c729ee`)
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