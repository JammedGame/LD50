import { Part } from "../RobotLogic/Part";
import { ResourceType } from "../RobotLogic/ResourceType";
import { SlotType } from "../RobotLogic/Robot";
import { PartSet } from "./PartSet";

export { PartGen }

const data = require("./sets.json");

class PartGen {

    public static generateAllParts(slotType: SlotType, primaryResource: ResourceType): Part [] {

        // let allParts = new Array();
        // allParts.push(parsePartSet()[SlotType.Head]);
        // allParts.push(parsePartSet()[slotType]);
        // allParts.push(parsePartSet()[slotType]);
        // allParts.push(parsePartSet()[slotType]);
        // allParts.push(parsePartSet()[slotType]);


        return allParts;
    }

    public static generatePart(slotType: SlotType, primaryResource: ResourceType): Part {

        let slotPart: Part[] = parsePartSet()[slotType];
        slotPart = slotPart.filter(element => {
            return element.PrimaryResource === primaryResource
        })

        return slotPart[Math.floor(Math.random() * slotPart.length)];
    }
}

function parsePartSet(): PartSet {
    return Object.assign(new PartSet, data)
}
