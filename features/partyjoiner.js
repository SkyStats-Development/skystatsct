import Party from "../../BloomCore/Party";

register(`chat`, (player) => {
    if (player !== Player.getName()) return;
    print("HELLO " + player);

    for (let key in Party.members) {
        print(Party.members[key])
    }


print(JSON.stringify(Party.excludePlayers, null, 2));


    //Party.excludePlayers = []

}).setCriteria("Party Finder > ${player} joined the dungeon group! (${classs} Level ${number})")