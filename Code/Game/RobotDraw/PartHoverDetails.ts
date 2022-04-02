export { PartHoverDetails }

import * as TBX from "toybox-engine";
import Settings from "../../Settings";

import { Part } from "../RobotLogic/Part";

class PartHoverDetails extends TBX.UI.Panel
{
    public RData: Part;
    public Hovered: boolean;
    public ParentPosition: TBX.Vertex;
    public Status: TBX.UI.Label;
    public constructor(Old?: PartHoverDetails)
    {
        super(Old);
        this.Init();
    }
    public Copy(): PartHoverDetails
    {
        return new PartHoverDetails(this);
    }
    public SetPosition(Offset: TBX.Vertex): void
    {
        this.Position = Offset.Copy().Add(new TBX.Vertex(-180,130,0));
    }
    public Init(): void
    {
        this.Active = false;
        this.Style.Layout.Dock = TBX.UI.DockType.TopLeft;
        this.Size = new TBX.Vertex(180, 80);
        this.BackColor = TBX.Color.FromRGBA(255,255,255,200);
        this.Style.Border.Color = Settings.ForeColor;
        this.Style.Border.Radius = 8;
        this.Style.Border.Width = 4;
        this.Status = new TBX.UI.Label();
        this.Status.Style.Text.Size = 32;
        this.Status.ForeColor = Settings.ForeColor;
        this.Status.Dock = TBX.UI.DockType.None;
        this.Attach(this.Status);
        this.Update();
    }
    public ApplyData(RData: Part): void
    {
        this.Status.Text = "Status: " + RData.Status + "%";
    }
    public SetVisible(Value: boolean): void
    {
        this.Active = Value;
    }
}
