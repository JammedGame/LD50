export { PartDraw }

import * as TBX from "toybox-engine";
import { SpriteSet } from "toybox-engine";

import { Part, PartSlot } from "../RobotLogic/Part";

class PartDraw extends TBX.Sprite
{
    public Data: Part;
    public ParentPosition: TBX.Vertex;
    public constructor(Old?: PartDraw)
    {
        super(Old);
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
    public ApplyData(Data: Part): void
    {
        this.Data = Data;
        this.SetArt(Data.Slot);
        this.SetDimmensions(Data.Slot);
    }
    public SetPositions(): void
    {
        switch(this.Data.Slot) {
            case PartSlot.Head: this.SetPartPosition(new TBX.Vertex(0,-260,0)); break;
            case PartSlot.Torso: this.SetPartPosition(new TBX.Vertex(0,0,0)); break;
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
            case PartSlot.Head: this.CreateSpriteSet("Head", "head00"); break;
            case PartSlot.Torso: this.CreateSpriteSet("Torso", "torso00"); break;
            case PartSlot.LeftArm: this.CreateSpriteSet("Arm", "arm00"); break;
            case PartSlot.RightArm: this.CreateSpriteSet("Arm", "arm00"); break;
            case PartSlot.LeftLeg: this.CreateSpriteSet("Leg", "leg00"); break;
            case PartSlot.RightLeg: this.CreateSpriteSet("Leg", "leg00"); break;
            default: this.CreateSpriteSet(Slot, "torso00");
        }
    }
    private CreateSpriteSet(SlotUrl: string, ArtName: string): void
    {
        let CompleteUrl = "Resources/Textures/Parts/" + SlotUrl + "/" + ArtName + ".png";
        this.SpriteSets = [new SpriteSet(null, [CompleteUrl], "Default")];
        //this.CurrentSpriteSet = 0;
    }
    public Update() : void
    {
        
    }
}
