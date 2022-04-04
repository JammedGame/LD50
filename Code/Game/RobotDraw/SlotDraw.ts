export { SlotDraw }

import * as TBX from "toybox-engine";

import { Part, PartType } from "../RobotLogic/Part";
import { SlotType } from "../RobotLogic/Robot";
import { PartDrawingUtil } from "./PartDrawingUtil";
import { PartHoverDetails } from "./PartHoverDetails";

const PICKABLE = "Pickable";

class SlotDraw extends TBX.Tile
{
    public RData: Part | undefined;
    public partType: PartType;
    public slotType: SlotType;
    public Hovered: boolean;
    public ParentPosition: TBX.Vertex;
    private _Details: PartHoverDetails;
    public constructor(Old?: SlotDraw)
    {
        super(Old);
        this.Data[PICKABLE] = true;
        this._Details = new PartHoverDetails();
        if (Old) {
            this.RData = Old.RData;
            this.partType = Old.partType;
            this.slotType = Old.slotType;
            this.ParentPosition = Old.ParentPosition;
        }
    }
    public Copy(): SlotDraw
    {
        return new SlotDraw(this);
    }
    public ApplyData(RData?: Part): void
    {
        this.RData = RData;
        if (RData) {
            this._Details.ApplyData(RData);
        } else {
            this.SetHovered(false);
        }
        this.SetArt();
        this.SetDimmensions();
    }
    public SetHovered(Value: boolean): void
    {
        if (this.RData) {
            this.Hovered = Value;
            this._Details.SetVisible(Value);
            this.SetColor();
        } else {
            this._Details.SetVisible(false);
        }
    }
    public SetPositions(): void
    {
        this.SetPartPosition(PartDrawingUtil.GetPosition(this.slotType));
    }
    private SetPartPosition(Offset: TBX.Vertex): void
    {
        this.Position = Offset.Add(this.ParentPosition);
        this._Details.SetPosition(this.Position);
    }
    private SetDimmensions(): void
    {
        this.Size = PartDrawingUtil.GetSize(this.partType);
        if (this.slotType === SlotType.RightArm || this.slotType === SlotType.RightLeg)
        {
            this.FlipX = true;
        }
    }
    private SetArt(): void
    {
        if(this.RData) {
            this.Active = true;
            this.CreateTileset(this.RData.Type, this.RData.Id);
        } else {
            this.Active = false;
            if (this.slotType === SlotType.Torso) {
                this.Active = true;
                this.CreateTileset(PartType.Torso, "TorsoRig");
                this.Paint = TBX.Color.White;
            }
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
