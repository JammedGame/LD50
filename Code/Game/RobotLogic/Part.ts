import { Random } from 'toybox-engine';
import {ResourceType} from './ResourceType'
import { SlotType } from './Robot';

export { Part, PartType, PartTypeValues }

const UNNAMED = "Unnamed";

enum PartType
{
    Head = "Head",
    Torso = "Torso",
    Arm = "Arm",
    Leg = "Leg"
}

function PartTypeValues(): string[] {
    let Values = [];
    for (let Value in PartType) {
        if (isNaN(Number(Value))) {
            Values.push(PartType[Value]);
        }
    }
    return Values;
}

class Part
{
    public Id: string;
    public Name: string;
    public Status: number;
    public Type: PartType;
    public PrimaryResource: ResourceType;
    public SecondaryResource: ResourceType;
    public TeritaryResource: ResourceType;

    public constructor(Old?: Partial<Part>, Type?: PartType)
    {
        if(Old)
        {
            this.Id = Old.Id;
            this.Name = Old.Name;
            this.Status = Old.Status;
            this.Type = Old.Type;
            this.PrimaryResource = Old.PrimaryResource;
        }
        else
        {
            this.Id = UNNAMED;
            this.Name = UNNAMED;
            this.Status = 100;
            this.Type = Type || PartType.Head;
            this.PrimaryResource = ResourceType.Lithium;
        }
    }
    public Copy(): Part
    {
        return new Part(this);
    }

    public GetBuyPrice(): number {
        return 50; // const
    }

    public GetSellingPrice(): number {
        if (this.Status >= 100) return 40;
        if (this.Status >= 80) return 40;
        if (this.Status >= 60) return 20;
        if (this.Status >= 40) return 10;
        if (this.Status > 0) return 5;
        return 1;
    }

    public IsAssignableToSlot(slotType: SlotType)
    {
        switch (this.Type)
        {
            case PartType.Arm: return slotType == SlotType.LeftArm || slotType == SlotType.RightArm;
            case PartType.Leg: return slotType == SlotType.LeftLeg || slotType == SlotType.RightLeg;
            case PartType.Head: return slotType == SlotType.Head;
            case PartType.Torso: return slotType == SlotType.Torso;
            default: return false;
        }
    }

    public GetGatherAmount(resourceType: ResourceType): number {
        if (resourceType == this.PrimaryResource) return this.GetPrimaryGatherAmount();
        if (resourceType == this.SecondaryResource) return this.GetSecondaryGatherAmount();
        if (resourceType == this.TeritaryResource) return this.GetSecondaryGatherAmount();
        return 0;
    }

    public GetPrimaryGatherAmount(): number {
        if (this.Status >= 100) return 5;
        if (this.Status >= 80) return 5;
        if (this.Status >= 60) return 4;
        if (this.Status >= 40) return 3;
        if (this.Status > 0) return 1;
        return 0;
    }

    public GetSecondaryGatherAmount(): number {
        if (this.TeritaryResource == this.SecondaryResource || this.TeritaryResource == undefined || this.TeritaryResource == null)
        {
            // table type 1 (has only secondary resource)
            if (this.Status >= 100) return 3;
            if (this.Status >= 80) return 2;
            if (this.Status >= 60) return 2;
            if (this.Status >= 40) return 1;
            if (this.Status > 0) return 1;
        }
        else
        {
            // table type 2 (has both secondary and tertiary resource)
            if (this.Status >= 100) return 2;
            if (this.Status >= 80) return 2;
            if (this.Status >= 60) return 2;
            if (this.Status >= 40) return 1;
            if (this.Status > 0) return 1;
        }

        return 0;
    }

    ApplyRandomDamage(): void {
        this.Status -= Random.Next(10, 30);

        // cap >0
        if (this.Status < 0)
            this.Status = 0;
	}
}