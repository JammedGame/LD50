export { Robot, SlotType, SlotTypeValues, SlotTypeToPartType }

import { Part, PartType, PartTypeValues } from "./Part";

const UNNAMED = "Unnamed";

enum SlotType
{
    Head = "Head",
    Torso = "Torso",
    LeftArm = "LeftArm",
    RightArm = "RightArm",
    LeftLeg = "LeftLeg",
    RightLeg = "RightLeg"
}

function SlotTypeValues(): string[] {
    let Values = [];
    for (let Value in SlotType) {
        if (isNaN(Number(Value))) {
            Values.push(SlotType[Value]);
        }
    }
    return Values;
}

function SlotTypeToPartType(slotType: SlotType) {
    if (slotType.includes('Leg')) return PartType.Leg;
    if (slotType.includes('Arm')) return PartType.Arm;
    return slotType as unknown as PartType;
}

interface IRobotData
{
    Name: string;
    Parts: { [key: string]: Part };
}

class Robot
{
    public Name: string;
    public Slots: { [key: string]: Part }
    public get Parts(): Part[] {
        return Object.values(this.Slots);
    }
    public constructor(Old?: Robot, Data?: IRobotData) {
        this.Slots = {};
        if (Data) {
            this.Name = Data.Name;
            SlotTypeValues().forEach((Type: SlotType) => {
                this.Slots[Type] = Data.Parts[Type];
            });
        }
        else if (Old) {
            this.Name = Old.Name;
            SlotTypeValues().forEach((Type: SlotType) => {
                this.Slots[Type] = Old.Slots[Type];
            });
        }
        else {
            this.Name = UNNAMED;
            SlotTypeValues().forEach((Type: SlotType) => {
                this.Slots[Type] = new Part();
                this.Slots[Type].Type = SlotTypeToPartType(Type);
            });
        }
    }
    public Copy(): Robot {
        return new Robot(this);
    }
}
