import { Part, PartType } from "../RobotLogic/Part";
import { ResourceType } from "../RobotLogic/ResourceType";
import { SlotType } from "../RobotLogic/Robot";
import { PartSet } from "./PartSet";

export { PartGen }

const data = require("./sets.json");
const allResourceTypes: ResourceType[] = [ResourceType.Oil, ResourceType.Lithium, ResourceType.Platina, ResourceType.Plutonium, ResourceType.Gas, ResourceType.Iron];
const allPartTypes: PartType[] = [ PartType.Head, PartType.Torso, PartType.Arm, PartType.Leg ];

class PartGen {

    public static generateInitialPartOffers(): Part[]
    {
        var allParts: Part[] = [];

        allPartTypes.forEach(partType => {
            allResourceTypes.forEach(resourceType => {
                var newPart: Part = this.generatePart(partType, resourceType);
                if (newPart == null || newPart == undefined)
                {
                    console.info(`FAILED to find part for ${partType} ${resourceType}`);
                    return;
                }
                allParts.push(newPart);
            });
        });

        return allParts;
    }

    public static generatePart(partType: PartType, primaryResource: ResourceType): Part {
        let partsForType: Part[] = parsePartSet()[partType].filter(element => element.PrimaryResource === primaryResource);
        let newPart: Part = partsForType[Math.floor(Math.random() * partsForType.length)];
        return newPart;
    }

}

function parsePartSet(): PartSet {
    return Object.assign(new PartSet, data)
}
