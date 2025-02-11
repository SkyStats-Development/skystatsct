const { secretsColorizer, sprColorizer, dailyRunsColorizer } = require("../functions/colorizeFunctions");
const { checkShitterStatus } = require("../functions/shitterFunctions");
const { addCommas, sanitizeString, timeToString, Catterpillerterizer } = require('../functions/helperFunctions');
import axios from "axios";
import { pogdata } from "../functions/pogFunctions";



function kuudraFinderJoin(player) {
  /* OH MY FREAKING JESUS CHIST BAKED ON A STCIK I CANT CODE SHIT WITHOUT ADDING AN API FOR IT FIRST (competative shitting with myself) */
  axios.get(`https://api.skystats.lol/kuudrafinder/${player}?key=${pogdata.API_KEY}`)
    .then(response => {
      let data = response.data.data

      let profile_vex = [
        `&4&m${ChatLib.getChatBreak(" ")}\n`,
        `&6&lStat Info for ${player} &6&lon ${data.player_profilename}\n`,
        ` \n`
          `Skill Average: `
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
}

function partyFinderJoin(player) {
  axios.get(`https://api.skystats.lol/partyfinder/${player}?key=${pogdata.API_KEY}`)
    .then(response => {
      let data = response.data.data.profileData;
      const selectedClass = data.dungeons.classes.class_object[data.dungeons.classes.selected_class];
      const levelWithProgress = selectedClass.experience.levelWithProgress;
      let profile_vex = [
        `&4&m${ChatLib.getChatBreak(" ")}\n`,
        `&6&lStat Info for ${player} &6&lon ${data.player_profilename}\n`,
        ` \n`,
        `&a&lCatacombs Level: &b&l${data.dungeons.catacombs_experience.levelWithProgress.toFixed(2)} &7|| &b&l${Catterpillerterizer(data.dungeons.classes.selected_class)} ${levelWithProgress.toFixed(2)}\n`,
        `\n`,
        `&aTotal Secrets: ${secretsColorizer(data.dungeons.hypixel_secrets)} &7|| &bPer Run: ${sprColorizer(data.dungeons.hypixel_secrets, data.dungeons.total_runs)}\n`,
        `&aLast Floor Played: ${sanitizeString(data.dungeons.last_floor)} &7(${dailyRunsColorizer(data.dungeons.daily_completed_runs)}&7/5 Dailies)\n`,
        `\n`,
        `&aMP: &6&l${Catterpillerterizer(data.selected_magical_power)} &7(${addCommas(data.magical_power)})\n`,
        `&aNetworth: &6${addCommas(data.total_networth.toString().split(".")[0])}\n`,
        ` \n`,
        new TextComponent(`&a&l[PV] `).setClick("run_command", `/pv ${player}`),
        new TextComponent(`&e&l[SKYCRYPT] `).setClick("open_url", `https://sky.shiiyu.moe/${player}`),
        new TextComponent(`&c&l[KICK] `).setClick("run_command", `/party kick ${player}`),
        new TextComponent(`&7&l[BLOCK]\n`).setClick("run_command", `/ignore add ${player}`),
        `&4&m${ChatLib.getChatBreak(" ")}\n`,
      ];

      console.log('a')


      checkShitterStatus(player).then(status => {
        if (status && status.case === true) {
          profile_vex.splice(11, 0, status.response + "\n");
        }

        new Message(...profile_vex).chat();
      }).catch(error => {
        ChatLib.chat("&6[SkyStats] &4&lERROR &7- &cFailed to check shitter status.");
        console.error(error);
      });
    })
    .catch(error => {
      if (error.message === "Cannot read property \"profileData\" from undefined") {
        ChatLib.chat("&6[SkyStats] &4&lERROR &7- &cPlayer not found or API returned unknown response.");
      }
    })
    .catch(error => {
      if (error.message === "Cannot read property \"profileData\" from undefined") {
        ChatLib.chat("&6[SkyStats] &4&lERROR &7- &cPlayer not found or API returned unknown response.");
      }
    });
}

/*
soon perhaps?
        `&aPB Times: `,
        new TextComponent("Normal").setHover("show_text", "&6&lHIII"),
        ` &7| `,
        new TextComponent("MM").setHover("show_text", "hover text or something"),
        ` \n`,
        */


module.exports = { partyFinderJoin, kuudraFinderJoin }