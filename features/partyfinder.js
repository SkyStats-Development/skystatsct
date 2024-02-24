import axios from "axios";

function sanitizeString(input) {
    // Define the mapping of original to sanitized names
    const mapping = {
        'CATACOMBS_ENTRANCE': '&e&lEntrance',
        'CATACOMBS_FLOOR_ONE': '&e&lCatacombs Floor 1',
        'CATACOMBS_FLOOR_TWO': '&a&lCatacombs Floor 2',
        'CATACOMBS_FLOOR_THREE': '&a&lCatacombs Floor 3',
        'CATACOMBS_FLOOR_FOUR': '&a&lCatacombs Floor 4',
        'CATACOMBS_FLOOR_FIVE': '&2&lCatacombs Floor 5',
        'CATACOMBS_FLOOR_SIX': '&2&lCatacombs Floor 6',
        'CATACOMBS_FLOOR_SEVEN': '&2&lCatacombs Floor 7',
        'MASTER_CATACOMBS_FLOOR_ONE': '&c&lMM Catacombs Floor 1',
        'MASTER_CATACOMBS_FLOOR_TWO': '&c&lMM Catacombs Floor 2',
        'MASTER_CATACOMBS_FLOOR_THREE': '&c&lMM Catacombs Floor 3',
        'MASTER_CATACOMBS_FLOOR_FOUR': '&c&lMM Catacombs Floor 4',
        'MASTER_CATACOMBS_FLOOR_FIVE': '&4&lMM Catacombs Floor 5',
        'MASTER_CATACOMBS_FLOOR_SIX': '&4&lMM Catacombs Floor 6',
        'MASTER_CATACOMBS_FLOOR_SEVEN': '&4&lMM Catacombs Floor 7'
    };

    // Replace each original name with its sanitized counterpart
    let sanitized = input;
    for (const key in mapping) {
        // Creating a case-insensitive regex to match the keys
        const regex = new RegExp('\\b' + key + '\\b', 'i'); // Add word boundaries to avoid partial matches
        if (regex.test(sanitized)) {
            sanitized = sanitized.replace(regex, (match) => mapping[key]);
        }
    }

    return sanitized;
}

function addCommas(num) {
    try {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (error) {
      return 0;
    }
  }

function apiCall(player, classs, number) {
    print(player)
  axios.get(`https://api.skystats.lol/partyfinder/${player}?key=73d628c622231d1603013f90a8dc198e8eeddc1901d4bab74b5e46b0470417a71aad66da42ef1e3276f1e1c3c95f71c67d46e37fa347626d18c0731734c729ee`)
    .then(response => {
    let data = response.data.data

    let daily_runs = data.dungeons.daily_completed_runs;
    if (daily_runs >= 4) {
        daily_runs = `&c${data.dungeons.daily_completed_runs}`;
    } else if (daily_runs <= 1) {
        daily_runs = `&a${data.dungeons.daily_completed_runs}`;
    } else {
        daily_runs = `&e${data.dungeons.daily_completed_runs}`;
    }

    let total_secrets = data.dungeons.catacombs_secrets;

    if (total_secrets <= 100) {
        total_secrets = `&c&l&mWARNING LOW SECRETS : ${total_secrets}`;
    } else if (total_secrets <= 750) {
        total_secrets = `&c&mLOWER SECRETS : ${total_secrets}`;
    } else if (total_secrets <= 5000) {
        total_secrets = `&e${total_secrets}`;
    } else if (total_secrets <= 10000) {
        total_secrets = `&9${total_secrets}`;
    } else if (total_secrets <= 200000) {
        total_secrets = `&d${total_secrets}`;
    } else {
        total_secrets = `&2${total_secrets}`;
    }

    let messages = [
        `&4&m${ChatLib.getChatBreak(" ")}`,
        `&6&lStat Info for ${player} &6&lon ${data.player_profilename}`,
        ` `,
        `&a&lCatacombs Level: &b&l${data.dungeons.catacombs_experience.levelWithProgress.toFixed(2)} &7| &b&l${classs} ${number}`,
        `&aTotal Secrets: ${addCommas(total_secrets)}`,
        `&aLast Floor Played: ${sanitizeString(data.dungeons.last_floor)} &7(${daily_runs}&7/5 Dailys)`,
        ` `,
        `&aMP: &6&l${data.selected_magical_power} &7(${addCommas(data.magical_power)})`,
        `&aNetworth: &6${addCommas(data.total_networth.toString().split(".")[0])}`,
        `&4&m${ChatLib.getChatBreak(" ")}`
    ]
    ChatLib.chat(messages.join("\n"))

    })
    .catch(error => {

      console.error(error.toString());
    });
};

register("chat", (player, classs, number) => {
    apiCall(player, classs, number);

}).setCriteria("Party Finder > ${player} joined the dungeon group! (${classs} Level ${number})")