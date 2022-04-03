import { Part } from "../RobotLogic/Part";
import { ResourceType } from "../RobotLogic/ResourceType";
import { SlotType } from "../RobotLogic/Robot";
import { PartSet } from "./PartSet";

export { PartGen }

const data = require("./sets.json");

class PartGen {

    public static generateParts(slotType: SlotType): Part[] {

        let slotPart: Part[] = parsePartSet()[slotType];

        let primaryGold: Part[] = new Array();
        let primaryGas: Part[] = new Array();

        slotPart.forEach(element => {
            switch (element.PrimaryResource) {
                case ResourceType.GOLD: primaryGold.push(element); break;
                case ResourceType.GAS: primaryGas.push(element); break;
            }
        });

        // slotPart[Math.floor(Math.random() * slotPart[slotType].length)]    

        console.log("primaryGold:", primaryGold)
        console.log("primaryGas:", primaryGas)
        return primaryGold;
    }

    public static generatePart(slotType: SlotType, primaryResource: ResourceType): Part {

        let slotPart: Part[] = parsePartSet()[slotType];

        console.log("slotPart", slotPart)

        const result  = slotPart.filter(element => {
            return element.PrimaryResource === primaryResource
        })

        console.log("result", result)

        return result[Math.floor(Math.random() * result.length)];
    }

}

function parsePartSet(): PartSet {
    return Object.assign(new PartSet, data)
}
