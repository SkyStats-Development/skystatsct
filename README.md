# 🌹 SkyStats Chattriggers Module 🌹

*Imagine a world where all the statistic information you need is displayed when someone joins your dungeon queue...*

## Welcome to SkyStats CT, the only dungeon stat checker you need!

## Installing

Requirements: 

- `Chattriggers Mod v2.2.0`
- `brain running a minimum of 0.25 braincell(s)`
- `Minecraft 1.8.9`
- `Java 8`
- `Forge for minecraft 1.8.9`

Suggested Requirements:

- `Chattrigers Mod v2.2.0`
- `3+ Braincells`
- `Minecraft 1.8.9 + Forge 1.8.9`
- `Patcher + Optifine Mods`
- `Zulu Java 8`
- `Prisim Launcher/GDLauncher`

To Install run the command `/ct import skystatsct` if it says something along the lines of "You must be an admin to run this command" you have incorrectly installed Chattriggers

To install forge/optifine/patcher/launchers etc there is multiple tutorials on YouTube, Google and reddit! 

## Commands/Features 

- `/ss` - Shows the help message
- `/ss simjoin <player>` - Developer Command - Simulates a player joining your dungeon queue (Defaults to Archer 50)
- `/crypt [player]` - Generates a SkyCrypt link to a fork of skycrypt https://sky.lenny.ie/
- `FEAT: Dungeon party finder` - when a player joins your dungeon queue (or a dungeon queue you're in) a message will be sent with stats on the player 

## Autentication

Our auth servers are very simple

- On startup or /ct reload

  > We call our api api.skystats.lol/auth/
  >
- We then (client side) get your UUID this is a string of numbers and letters that is public to any server - its basically your username in code form
- We send your username to our servers as a POST request (api.skystats.lol/auth/2e9f182f-ef09-43be-bac3-ea75a6775079)
- We then call the mojang api and check if the uuid matches the uuid sent to us
- Then we send the uuid back, verify again along with sending our API key to make the mod... you know... work...?
- This is obviously not "secure" for us but at this stage I see no real reason to make some sweaty auth server when a max of 10 people are gonna use this

OUR AUTH SERVERS CAN CHANGE AT ANY TIME - WE WILL NEVER REQUIRE YOU TO LOGIN WITH YOUR EMAIL/PASS/TOKEN/MICROSOFT/ETC 


## Licence

See licence file :3

## Version

0.0.1 SEMVER 🔁


# Thank you's 

a massive thank you to unclaimedbloom6, soopy, and other CT devs, without your projects I would probably still be lost :B
