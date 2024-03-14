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

  const timeToString = (timeMilliseconds) => {
    if(!timeMilliseconds) {
        return "No Times"
    }
    timeSeconds = Math.floor(timeMilliseconds / 1000)
    timeMinutes = Math.floor(timeSeconds / 60)
    return `${timeMinutes}:${(timeSeconds % 60).toString().padStart(2, "0")}`
}

function Catterpillerterizer(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = {
    timeToString,
    Catterpillerterizer,
    addCommas,
    sanitizeString
}