import Party from "../../BloomCore/Party";

register(`chat`, (player) => {
    if (player !== Player.getName()) return;
    print("HELLO " + player);
    


}).setCriteria("Party Finder > ${player} joined the dungeon group! (${classs} Level ${number})")
