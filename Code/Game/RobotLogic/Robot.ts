export { Robot }

import { Part, PartSlot, PartSlotValues } from "./Part";

const UNNAMED = "Unnamed";

class Robot {
    public Name: string;
    public Parts: { [key: string]: Part }
    public get PartsArray(): Part[] {
        return Object.values(this.Parts);
    }
    public constructor(Old?: Robot, Name?: string, Head?: Part, Torso?: Part, LeftArm?: Part, RightArm?: Part, LeftLeg?: Part, RightLeg?: Part) {
        this.Parts = {};
        if (Name) {
            this.Name = Name;
            this.Parts[PartSlot.Head] = Head;
            this.Parts[PartSlot.Torso] = Torso;
            this.Parts[PartSlot.LeftArm] = LeftArm;
            this.Parts[PartSlot.RightArm] = RightArm;
            this.Parts[PartSlot.LeftLeg] = LeftLeg;
            this.Parts[PartSlot.RightLeg] = RightLeg;
            return this;
        }
        if (Old) {
            this.Name = Old.Name;
            Old.PartsArray.forEach((P: Part) => {
                this.Parts[P.Slot] = P.Copy();
            });
        }
        else {
            this.Name = UNNAMED;
            PartSlotValues().forEach(PartSlotValue => {
                this.Parts[PartSlotValue] = new Part();
                this.Parts[PartSlotValue].Slot = PartSlotValue as PartSlot;
            });
        }
    }
    public Copy(): Robot {
        return new Robot(this);
    }
}
