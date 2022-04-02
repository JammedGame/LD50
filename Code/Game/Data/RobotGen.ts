import { Robot } from "../RobotLogic/Robot";
import { PartSet } from "./PartSet";

export { RobotGen }

const data = require("./sets.json");

class RobotGen {

    public static randomRobot(): Robot {
        let partSet: PartSet = parsePartSet();
        return new Robot(null, "jsonRobot",
            partSet.Head[Math.floor(Math.random() * partSet.Head.length)],
            partSet.Torso[Math.floor(Math.random() * partSet.Torso.length)],
            partSet.LeftArm[Math.floor(Math.random() * partSet.LeftArm.length)],
            partSet.RightArm[Math.floor(Math.random() * partSet.RightArm.length)],
            partSet.LeftLeg[Math.floor(Math.random() * partSet.LeftLeg.length)],
            partSet.RightLeg[Math.floor(Math.random() * partSet.RightLeg.length)])
    }
}

function parsePartSet(): PartSet {
    return Object.assign(new PartSet, data)
}

