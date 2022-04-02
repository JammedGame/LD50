import { Robot } from "../RobotLogic/Robot";
import { PartSet } from "./PartSet";

export { RobotGen }

const data = require("./sets.json");

class RobotGen {

    public static randomRobot(): Robot {
        let partSet: PartSet = parsePartSet();
        return new Robot(null, "jsonRobot",
            partSet.head[Math.floor(Math.random() * partSet.head.length)],
            partSet.Torso[Math.floor(Math.random() * partSet.Torso.length)],
            partSet.LeftArm[Math.floor(Math.random() * partSet.LeftArm.length)],
            partSet.rightArm[Math.floor(Math.random() * partSet.rightArm.length)],
            partSet.leftLeg[Math.floor(Math.random() * partSet.leftLeg.length)],
            partSet.rightLeg[Math.floor(Math.random() * partSet.rightLeg.length)])
    }
}

function parsePartSet(): PartSet {
    return Object.assign(new PartSet, data)
}

