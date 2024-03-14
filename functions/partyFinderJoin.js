const { secretsColorizer, dailyRunsColorizer } = require("../functions/colorizeFunctions");
const { addCommas, sanitizeString, timeToString, Catterpillerterizer } = require('../functions/helperFunctions');
import axios from "axios";
import { pogdata } from "../functions/pogFunctions";

function partyFinderJoin(player) {
  axios.get(`https://api.skystats.lol/partyfinder/${player}?key=${pogdata.API_KEY}`)
    .then(response => {
    let data = response.data.data.profileData
    const selectedClass = data.dungeons.classes.class_object[data.dungeons.classes.selected_class];
    const levelWithProgress = selectedClass.experience.levelWithProgress;
    let profile_vex = [
        `&4&m${ChatLib.getChatBreak(" ")}\n`,
        `&6&lStat Info for ${player} &6&lon ${data.player_profilename}\n`,
        ` \n`,
        `&a&lCatacombs Level: &b&l${data.dungeons.catacombs_experience.levelWithProgress.toFixed(2)} &7| &b&l${Catterpillerterizer(data.dungeons.classes.selected_class)} ${levelWithProgress.toFixed(2)}\n`,
        `\n`,
        `&aTotal Secrets: ${secretsColorizer(data.dungeons.catacombs_secrets)}&7 | ${secretsColorizer(data.dungeons.hypixel_secrets)}\n`,
        `&aLast Floor Played: ${sanitizeString(data.dungeons.last_floor)} &7(${dailyRunsColorizer(data.dungeons.daily_completed_runs)}&7/5 Dailies)\n`,
        `\n`,
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

/*
soon perhaps?
        `&aPB Times: `,
        new TextComponent("Normal").setHover("show_text", "&6&lHIII"),
        ` &7| `,
        new TextComponent("MM").setHover("show_text", "hover text or something"),
        ` \n`,
        */


module.exports = { partyFinderJoin }