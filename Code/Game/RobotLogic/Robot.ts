export { Robot }

import { Part } from "./Part";

const UNNAMED = "Unnamed";

class Robot
{
    public Name: string;
    public Head: Part;
    public Torso: Part;
    public LeftArm: Part;
    public RightArm: Part;
    public LeftLeg: Part;
    public RightLeg: Part;
    public constructor(Old?: Robot)
    {
        if(Old)
        {
            this.Name = Old.Name;
            this.Head = Old.Head.Copy();
            this.Torso = Old.Torso.Copy();
            this.LeftArm = Old.LeftArm.Copy();
            this.RightArm = Old.RightArm.Copy();
            this.LeftLeg = Old.LeftLeg.Copy();
            this.RightLeg = Old.RightLeg.Copy();
        }
        else
        {
            this.Name = UNNAMED;
            this.Head = new Part();
            this.Torso = new Part();
            this.LeftArm = new Part();
            this.RightArm = new Part();
            this.LeftLeg = new Part();
            this.RightLeg = new Part();
        }
    }
    public Copy(): Robot {
        return new Robot(this);
    }
}
