import { onOpenWindowPacket, onWindowItemsPacket } from "../../BloomCore/utils/Events"

let inContainer = false
let invSize = null
let dontResetNext = false
let renderData = null

if (inContainer === true) {
    print("inContainer is true")
}

const containerNames = [
    /^§rParty Finder§r \(\d+\/\d+\)§r$/,
    "§rParty Finder§r",
    /^§rParty Finder§r\(\d+\/\d+\)§r$/,
    /^Party Finder§r$/,
    /^Large Chest§r$/
]

onOpenWindowPacket((title, windowid, hasSlots, slotCount, guiID, entityID, event) => {
    if (!containerNames.some(a => title.match(a))) return;
        print("Entered Party Finder Qeueue... Holding")
        if (inContainer === false) {
            print("I am now true")
            inContainer = true
        }

    }
)

register("guiClosed", () => {
    inContainer = false
    invSize = null
    renderData = null
})

onWindowItemsPacket((items) => {
    print(inContainer)
    if (!inContainer) return;
    for (let i = 0; i < items.length && i < invSize; i++) {
        if (!items[i]) continue

        let item = new Item(items[i])
        let itemName = item.getName()
        if (itemName == " ") {
            continue
        }
        print(itemName)
    }

})

