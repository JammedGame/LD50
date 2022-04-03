export { Robot, SlotType, SlotTypeValues, SlotTypeToPartType }

import { Part, PartType, PartTypeValues } from "./Part";
import { ResourceType } from "./ResourceType";

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

class Robot {

    public Name: string;
    public Slots: { [key: string]: Part | undefined }

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
                this.Slots[Type] = undefined;
            });
        }
    }

    public Copy(): Robot {
        return new Robot(this);
    }

    public GetGatherAmount(resourceType: ResourceType) : number
    {
        var amount: number = 0;

        this.Parts.forEach(x =>
        {
            amount += x.GetGatherAmount(resourceType);
        });

        // full set bonus
        if (this.Parts.every(x => x.PrimaryResource == resourceType))
        {
            amount += 5;
        }

        return amount;
    }
}
