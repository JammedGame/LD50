import { Robot } from "../RobotLogic/Robot";
import { PartSet } from "./PartSet";

export { RobotGen }

const data = require("./sets.json");

class RobotGen {

    public static Any(): Robot {
        let partSet: PartSet = parsePartSet();
        return new Robot(null, "jsonRobot",
            partSet.head[Math.floor(Math.random() * partSet.head.length)],
            partSet.torso[Math.floor(Math.random() * partSet.torso.length)],
            partSet.leftArm[Math.floor(Math.random() * partSet.leftArm.length)],
            partSet.rightArm[Math.floor(Math.random() * partSet.rightArm.length)],
            partSet.leftLeg[Math.floor(Math.random() * partSet.leftLeg.length)],
            partSet.rightLeg[Math.floor(Math.random() * partSet.rightLeg.length)])
    }
}

function parsePartSet(): PartSet {
    return Object.assign(new PartSet, data)
}

