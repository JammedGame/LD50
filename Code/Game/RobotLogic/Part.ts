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
            Values.push(Value);
        }
    }
    return Values;
}

class Part
{
    public Name: string;
    public Status: number;
    public Slot: PartSlot;
    public constructor(Old?: Part, Slot?: PartSlot)
    {
        if(Old)
        {
            this.Name = Old.Name;
            this.Status = Old.Status;
            this.Slot = Old.Slot;
        }
        else
        {
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
