/* Functions used to format strings that should have a different color code depending on their type (example 1/5 = green 7/5 = red) */
const { addCommas } = require('../functions/helperFunctions');

function dailyRunsColorizer(str) {
    let daily_runs = str || 0;
    if (daily_runs >= 4) {
        daily_runs = `&c${str}`;
    } else if (daily_runs <= 1) {
        daily_runs = `&a${str}`;
    } else {
        daily_runs = `&e${str}`;
    }
    return daily_runs;
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
    return total_secrets;
}

function sprColorizer(ts, tr) {
    let total_secrets = ts || 0.1;
    let total_runs = tr || 0.1;
    let secrets_per_run = total_secrets / total_runs;
    if (secrets_per_run <= 1) {
        secrets_per_run = `&c&l>> ${secrets_per_run.toFixed(2)} <<`;
    } else if (secrets_per_run <= 5) {
        secrets_per_run = `&e${secrets_per_run.toFixed(2)}`;
    } else if (secrets_per_run <= 7.5) {
        secrets_per_run = `&9${secrets_per_run.toFixed(2)}`;
    } else if (secrets_per_run <= 10) {
        secrets_per_run = `&d${secrets_per_run.toFixed(2)}`;
    } else if (secrets_per_run <= 16) {
        secrets_per_run = `&2${secrets_per_run.toFixed(2)}`;
    } else {
        secrets_per_run = `&2${secrets_per_run.toFixed(2)}`
    }

    //console.log(`Total Secrets ${ts}\nTotal Secrets LET ${total_secrets}\ntotal Runs ${tr}\nTotal RUns LET ${total_runs}\nsecrets per run ${secrets_per_run}`)
    return secrets_per_run;

}

module.exports = {
    secretsColorizer,
    sprColorizer,
    dailyRunsColorizer,
};
