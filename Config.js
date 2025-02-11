import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
} from '../Vigilance/index.js';
import { pogdata } from "./functions/pogFunctions";

@Vigilant('ss', 'SS Settings', {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Party Kicker"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
}
)
class Config {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General",
            `
        &6&l&nSkyStats CT Module - SkyStats Development

        &6Daily Quote

        &a${pogdata.QUOTE}
        `
        )
    }

    @SwitchProperty({
        name: 'Crypt Command',
        description: "Toggles the /crypt command that generates a SkyCrypt link with the provided username.",
        category: 'General',
        subcategory: "General",
    })
    cryptCommand = true;

    @SwitchProperty({
        name: 'Queue Stats',
        description: "Shows a player's stats when they join a dungeon queue.",
        category: 'General',
        subcategory: 'Party Finder',
    })
    queuestats = true;
}

export default new Config();