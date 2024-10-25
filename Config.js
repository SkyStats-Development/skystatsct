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
        const categories = ["General", "Dungeons"];
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
        category: 'Dungeons',
        subcategory: 'Party Finder',
    })
    queuestats = true;

    @SwitchProperty({
        name: 'Kuudra Queue Stats',
        description: "Shows a player's stats when they join a kuudra queue.",
        category: 'Kuudra',
        subcategory: 'Party Finder',
    })
    kkqueuestats = true; /* kk does not stand for anything - get your head out of the gutter bbg :3 */

    @SwitchProperty({
        name: 'Class Helper',
        description: "Shows what class should go where in a normal run of 1M-1T-1B-1A-1H.",
        category: 'Dungeons',
        subcategory: 'Floor 7 Boss',
    })
    classLocationHelper = true;

    @SwitchProperty({
        name: 'Simon Says (SS/Buttons) Slover',
        description: "Helps you solve the P1 Device",
        category: 'Dungeons',
        subcategory: 'Floor 7 Boss',
    })
    p1devHelper = true;


    @SwitchProperty({
        name: 'Levers (lights) Slover',
        description: "Helps you solve the P2 Device",
        category: 'Dungeons',
        subcategory: 'Floor 7 Boss',
    })
    p2devHelper = true;


    @SwitchProperty({
        name: 'Arrow Align Slover',
        description: "Helps you solve the P3 Device",
        category: 'Dungeons',
        subcategory: 'Floor 7 Boss',
    })
    p3devHelper = true;


    @SwitchProperty({
        name: 'P4 Device Solver (The Target Thing)',
        description: "Helps you solve the P4 Device (I forgor the name - dm me at @axle.coffee with the name thanks)",
        category: 'Dungeons',
        subcategory: 'Floor 7 Boss',
    })
    p3devHelper = true;


    @SwitchProperty({
        name: 'Forward PD Helper',
        description: "Helps you forward p3 PD in floor 7.",
        category: 'Pre Dev',
        subcategory: 'P3 PD',
    })
    forwardHelperPD = true;

    @SwitchProperty({
        name: 'i4 PD helper',
        description: "Shows a timer until you can do part 4 of the device and warns you if you don't have a mask on your head.",
        category: 'Pre Dev',
        subcategory: 'P3 PD',
    })
    i4helper = true;

    @SwitchProperty({
        name: 'Dragon PD Helper',
        description: "Shows where to stonk down from 4 to 5 to help with Dragon PD in m7.",
        category: 'Pre Dev',
        subcategory: 'P5 PD',
    })
    dragonPDhelper = true;

    @SwitchProperty({
        name: 'PD Route Helper',
        description: "Shows where to stonk in F7/m7. CHESTS REQUIRED",
        category: 'Pre Dev',
        subcategory: 'PD',
    })
    normalPDhelper = true;

    @SwitchProperty({
        name: 'PD Route Helper (No Chests)',
        description: "Shows where to stonk in F7/m7 without using chests.",
        category: 'Pre Dev',
        subcategory: 'PD',
    })
    chestlessPDhelper = true;
}

export default new Config();