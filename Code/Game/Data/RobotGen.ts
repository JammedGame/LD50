import { Part, PartTypeValues } from "../RobotLogic/Part";
import { Robot, SlotType, SlotTypeToPartType, SlotTypeValues } from "../RobotLogic/Robot";
import { PartSet } from "./PartSet";

export { RobotGen }

const data = require("./sets.json");

class RobotGen {

    public static randomRobot(): Robot {
        let partSet: PartSet = parsePartSet();
        let RobotData = {
            Name: "jsonRobot",
            Parts: {}
        }
        SlotTypeValues().forEach(slotType => {
            const partType = SlotTypeToPartType(slotType as SlotType);
            RobotData.Parts[slotType]
                = partSet[partType][Math.floor(Math.random() * partSet[partType].length)]
        });
        return new Robot(null, RobotData);
    }

    public static generateSet(setIndex: number): Robot {
        let partSet: PartSet = parsePartSet();
        let RobotData = {
            Name: 'Set'+setIndex,
            Parts: {}
        }
        
        SlotTypeValues().forEach(slotType => {
            const partType = SlotTypeToPartType(slotType as SlotType);
            RobotData.Parts[slotType]
                = partSet[partType][setIndex]
        });
        return new Robot(null, RobotData);
    }
}

function parsePartSet(): PartSet {
    return new PartSet(data);
}
