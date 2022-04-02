export { PartDraw }

import * as TBX from "toybox-engine";
import { SpriteSet } from "toybox-engine";

import { Part, PartSlot } from "../RobotLogic/Part";

class PartDraw extends TBX.Tile
{
    public RData: Part;
    public Hovered: boolean;
    public ParentPosition: TBX.Vertex;
    public constructor(Old?: PartDraw)
    {
        super(Old);
        this.Data["Pickable"] = true;
        if(Old)
        {
            
        }
        else
        {
            
        }
    }
    public Copy(): PartDraw
    {
        return new PartDraw(this);
    }
    public ApplyData(RData: Part): void
    {
        this.RData = RData;
        this.SetArt(RData.Slot);
        this.SetDimmensions(RData.Slot);
    }
    public SetHovered(Value: boolean): void
    {
        this.Hovered = Value;
        if (this.Hovered)
        {
            this.Paint = TBX.Color.FromString("#63D1F4");
        }
        else
        {
            this.Paint = TBX.Color.White;
        }
        this.Modified = true;
    }
    public SetPositions(): void
    {
        switch(this.RData.Slot) {
            case PartSlot.Head: this.SetPartPosition(new TBX.Vertex(0,-260,0)); break;
            case PartSlot.Torso: this.SetPartPosition(new TBX.Vertex(0,0,0.1)); break;
            case PartSlot.LeftArm: this.SetPartPosition(new TBX.Vertex(-185,5,0)); break;
            case PartSlot.RightArm: this.SetPartPosition(new TBX.Vertex(185,5,0)); break;
            case PartSlot.LeftLeg: this.SetPartPosition(new TBX.Vertex(-95,205,0)); break;
            case PartSlot.RightLeg: this.SetPartPosition(new TBX.Vertex(95,205,0)); break;
            default: this.SetPartPosition(new TBX.Vertex(0,0,0)); break;
        }
    }
    private SetPartPosition(Offset: TBX.Vertex): void
    {
        this.Position = Offset.Add(this.ParentPosition);
    }
    private SetDimmensions(Slot: PartSlot): void
    {
        switch(Slot) {
            case PartSlot.Head: this.Size = new TBX.Vertex(255, 255); break;
            case PartSlot.Torso: this.Size = new TBX.Vertex(310, 310); break;
            case PartSlot.LeftArm: this.Size = new TBX.Vertex(195, 310); break;
            case PartSlot.RightArm: this.Size = new TBX.Vertex(195, 310); break;
            case PartSlot.LeftLeg: this.Size = new TBX.Vertex(195, 235); break;
            case PartSlot.RightLeg: this.Size = new TBX.Vertex(195, 235); break;
            default: this.Size = new TBX.Vertex(310, 310);
        }
        if (Slot === PartSlot.RightArm || Slot === PartSlot.RightLeg)
        {
            this.FlipX = true;
        }
    }
    private SetArt(Slot: PartSlot): void
    {
        switch(Slot) {
            case PartSlot.Head: this.CreateTileset("Head", "head01"); break;
            case PartSlot.Torso: this.CreateTileset("Torso", "torso01"); break;
            case PartSlot.LeftArm: this.CreateTileset("Arm", "arm01"); break;
            case PartSlot.RightArm: this.CreateTileset("Arm", "arm01"); break;
            case PartSlot.LeftLeg: this.CreateTileset("Leg", "leg01"); break;
            case PartSlot.RightLeg: this.CreateTileset("Leg", "leg01"); break;
            default: this.CreateTileset(Slot, "torso01");
        }
    }
    private CreateTileset(SlotUrl: string, ArtName: string): void
    {
        let CompleteUrl = "Resources/Textures/Parts/" + SlotUrl + "/" + ArtName + ".png";
        this.Collection = new TBX.ImageCollection(null, [CompleteUrl]);
        this.Index = 0;
    }
    public Update() : void
    {
    }
}
