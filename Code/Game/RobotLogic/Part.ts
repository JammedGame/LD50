export { Part, PartSlot, PartSlotValues }

const UNNAMED = "Unnamed";

enum PartSlot
{
    Head = "HEAD",
    Torso = "TORSO",
    LeftArm = "LEFT_ARM",
    RightArm = "RIGHT_ARM",
    LeftLeg = "LEFT_LEG",
    RightLeg = "RIGHT_LEG"
}

function PartSlotValues(): string[] {
    let Values = [];
    for (let Value in PartSlot) {
        if (isNaN(Number(Value))) {
            Values.push(PartSlot[Value]);
        }
    }
    return Values;
}

class Part
{
    public Id: string;
    public Name: string;
    public Status: number;
    public Slot: PartSlot;
    public constructor(Old?: Part, Slot?: PartSlot)
    {
        if(Old)
        {
            this.Id = Old.Id;
            this.Name = Old.Name;
            this.Status = Old.Status;
            this.Slot = Old.Slot;
        }
        else
        {
            this.Id = UNNAMED;
            this.Name = UNNAMED;
            this.Status = 100;
            this.Slot = Slot || PartSlot.Head;
        }
    }
    public Copy(): Part
    {
        return new Part(this);
    }
}
