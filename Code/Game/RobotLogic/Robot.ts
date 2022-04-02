export { Robot }

import { Part, PartSlot, PartSlotValues } from "./Part";

const UNNAMED = "Unnamed";

class Robot
{
    public Name: string;
    public Parts: { [key: string]: Part }
    public get PartsArray(): Part[]
    {
        return Object.values(this.Parts);
    }
    public constructor(Old?: Robot)
    {
        this.Parts = {};
        if(Old)
        {
            this.Name = Old.Name;
            Old.PartsArray.forEach((P: Part) => {
                this.Parts[P.Slot] = P.Copy();
            });
        }
        else
        {
            this.Name = UNNAMED;
            PartSlotValues().forEach(PartSlotValue => {
                this.Parts[PartSlotValue] = new Part();
                this.Parts[PartSlotValue].Slot = PartSlotValue as PartSlot;
            });
        }
    }
    public Copy(): Robot
    {
        return new Robot(this);
    }
}
