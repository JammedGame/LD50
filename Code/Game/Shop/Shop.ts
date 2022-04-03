import { PartGen } from "../Data/PartGen";
import { Part } from "../RobotLogic/Part";
import { ResourceType } from "../RobotLogic/ResourceType";
import { SlotType } from "../RobotLogic/Robot";

export { Shop }

class Shop {
    public static getPartsForSet(slotType: SlotType): Part[] {

        let partArray: Part[] = new Array();
        const resources = Object.keys(ResourceType);

        resources.forEach(resource => {
            partArray.push(PartGen.generatePart(slotType, ResourceType[resource]));
        });

        return partArray;
    }

}
