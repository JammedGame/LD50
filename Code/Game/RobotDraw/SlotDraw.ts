export { SlotDraw }

import * as TBX from "toybox-engine";

import { Part, PartType } from "../RobotLogic/Part";
import { SlotType } from "../RobotLogic/Robot";
import { PartHoverDetails } from "./PartHoverDetails";

class SlotDraw extends TBX.Tile
{
    public RData: Part;
    public partType: PartType;
    public slotType: SlotType;
    public Hovered: boolean;
    public ParentPosition: TBX.Vertex;
    private _Details: PartHoverDetails;
    public constructor(Old?: SlotDraw)
    {
        super(Old);
        this.Data["Pickable"] = true;
        this._Details = new PartHoverDetails();
    }
    public Copy(): SlotDraw
    {
        return new SlotDraw(this);
    }
    public ApplyData(RData: Part): void
    {
        this.RData = RData;
        this._Details.ApplyData(RData);
        this.SetArt();
        this.SetDimmensions();
    }
    public SetHovered(Value: boolean): void
    {
        this.Hovered = Value;
        this._Details.SetVisible(Value);
        this.SetColor();
    }
    public SetPositions(): void
    {
        switch(this.slotType) {
            case SlotType.Head: this.SetPartPosition(new TBX.Vertex(0,-260,0)); break;
            case SlotType.Torso: this.SetPartPosition(new TBX.Vertex(0,0,0.1)); break;
            case SlotType.LeftArm: this.SetPartPosition(new TBX.Vertex(-185,5,0)); break;
            case SlotType.RightArm: this.SetPartPosition(new TBX.Vertex(185,5,0)); break;
            case SlotType.LeftLeg: this.SetPartPosition(new TBX.Vertex(-95,205,0)); break;
            case SlotType.RightLeg: this.SetPartPosition(new TBX.Vertex(95,205,0)); break;
            default: this.SetPartPosition(new TBX.Vertex(0,0,0)); break;
        }
    }
    private SetPartPosition(Offset: TBX.Vertex): void
    {
        this.Position = Offset.Add(this.ParentPosition);
        this._Details.SetPosition(this.Position);
    }
    private SetDimmensions(): void
    {
        switch(this.slotType) {
            case SlotType.Head: this.Size = new TBX.Vertex(255, 255); break;
            case SlotType.Torso: this.Size = new TBX.Vertex(310, 310); break;
            case SlotType.LeftArm: this.Size = new TBX.Vertex(195, 310); break;
            case SlotType.RightArm: this.Size = new TBX.Vertex(195, 310); break;
            case SlotType.LeftLeg: this.Size = new TBX.Vertex(195, 235); break;
            case SlotType.RightLeg: this.Size = new TBX.Vertex(195, 235); break;
            default: this.Size = new TBX.Vertex(310, 310);
        }
        if (this.slotType === SlotType.RightArm || this.slotType === SlotType.RightLeg)
        {
            this.FlipX = true;
        }
    }
    private SetArt(): void
    {
        if(this.RData)
        {
            this.CreateTileset(this.RData.Type, this.RData.Id);
        }
    }
    private CreateTileset(Type: PartType, Id: string): void
    {
        let CompleteUrl = "Resources/Textures/Parts/" + Type + "/" + Id + ".png";
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
