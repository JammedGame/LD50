export { PartDraw }

import * as TBX from "toybox-engine";

import { Part, PartSlot } from "../RobotLogic/Part";
import { PartHoverDetails } from "./PartHoverDetails";

class PartDraw extends TBX.Tile
{
    public RData: Part;
    public Hovered: boolean;
    public ParentPosition: TBX.Vertex;
    private _Details: PartHoverDetails;
    public constructor(Old?: PartDraw)
    {
        super(Old);
        this.Data["Pickable"] = true;
        this._Details = new PartHoverDetails();
    }
    public Copy(): PartDraw
    {
        return new PartDraw(this);
    }
    public ApplyData(RData: Part): void
    {
        this.RData = RData;
        this._Details.ApplyData(RData);
        this.SetArt(RData.Slot);
        this.SetDimmensions(RData.Slot);
    }
    public SetHovered(Value: boolean): void
    {
        this.Hovered = Value;
        this._Details.SetVisible(Value);
        this.SetColor();
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
        this._Details.SetPosition(this.Position);
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
        console.log('setArt', this.RData)
        console.log('setArtId', this.RData.Id)
        
        switch(Slot) {
            case PartSlot.Head: this.CreateTileset("Head", this.RData.Id); break;
            case PartSlot.Torso: this.CreateTileset("Torso", this.RData.Id); break;
            case PartSlot.LeftArm: this.CreateTileset("Arm", this.RData.Id); break;
            case PartSlot.RightArm: this.CreateTileset("Arm", this.RData.Id); break;
            case PartSlot.LeftLeg: this.CreateTileset("Leg", this.RData.Id); break;
            case PartSlot.RightLeg: this.CreateTileset("Leg", this.RData.Id); break;
            default: this.CreateTileset(Slot, this.RData.Id);
        }
    }
    private CreateTileset(SlotUrl: string, Id: string): void
    {
        let CompleteUrl = "Resources/Textures/Parts/" + SlotUrl + "/" + Id + ".png";
        this.Collection = new TBX.ImageCollection(null, [CompleteUrl]);
        this.Index = 0;
    }
    public OnAttach(Args: any): void
    {
        super.OnAttach(Args);
        Args.Scene.Attach(this._Details);
    }
    public OnRemove(Args: any): void
    {
        super.OnRemove(Args);
        Args.Scene.Remove(this._Details);
    }
    public SetColor(): void
    {
        if (this.Hovered)
        {
            this.Paint = TBX.Color.FromString("#63D1F4");
        }
        else
        {
            this.Paint = TBX.Color.White;
        }
    }
    public Update() : void
    {
    }
}
