export { PartDrawingUtil }

import * as TBX from "toybox-engine";

import { PartType } from "../RobotLogic/Part";
import { SlotType } from "../RobotLogic/Robot";

class PartDrawingUtil {

    public static GetSize(partType: PartType): TBX.Vertex {
        switch(partType) {
            case PartType.Head: return new TBX.Vertex(255, 255);
            case PartType.Torso: return new TBX.Vertex(310, 310);
            case PartType.Arm: return new TBX.Vertex(195, 310);
            case PartType.Leg: return new TBX.Vertex(195, 235);
            default: return new TBX.Vertex(310, 310);
        }
    }

    public static GetPosition(slotType: SlotType): TBX.Vertex {
        switch(slotType) {
            case SlotType.Head: return new TBX.Vertex(0,-260,0.2);
            case SlotType.Torso: return new TBX.Vertex(0,0,0.1);
            case SlotType.LeftArm: return new TBX.Vertex(-185,5,0);
            case SlotType.RightArm: return new TBX.Vertex(185,5,0);
            case SlotType.LeftLeg: return new TBX.Vertex(-95,205,0);
            case SlotType.RightLeg: return new TBX.Vertex(95,205,0);
            default: return new TBX.Vertex(0,0,0);
        }
    }
}
