/* Functions used to format strings that should have a different color code depending on their type (example 1/5 = green 7/5 = red) */
const { addCommas } = require("../functions/helperFunctions")

function dailyRunsColorizer(str) {
    let daily_runs = str || 0;
    if (daily_runs >= 4) {
        daily_runs = `&c${str}`;
    } else if (daily_runs <= 1) {
        daily_runs = `&a${str}`;
    } else {
        daily_runs = `&e${str}`;
    }
    return daily_runs
}

function secretsColorizer(str) {
    let total_secrets = str || 0;
    if (total_secrets <= 100) {
        total_secrets = `&c&lWARNING LOW SECRETS : ${addCommas(total_secrets)}`;
    } else if (total_secrets <= 2500) {
        total_secrets = `&c&lLOWER SECRETS : ${addCommas(total_secrets)}`;
    } else if (total_secrets <= 5000) {
        total_secrets = `&e${addCommas(total_secrets)}`;
    } else if (total_secrets <= 10000) {
        total_secrets = `&9${addCommas(total_secrets)}`;
    } else if (total_secrets <= 22000) {
        total_secrets = `&d${addCommas(total_secrets)}`;
    } else {
        total_secrets = `&2${addCommas(total_secrets)}`;
    }
    return total_secrets
}

module.exports = {
    secretsColorizer,
    dailyRunsColorizer
}