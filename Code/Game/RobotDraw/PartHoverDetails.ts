export { PartHoverDetails }

import * as TBX from "toybox-engine";
import Settings from "../../Settings";

import { Part } from "../RobotLogic/Part";

class PartHoverDetails extends TBX.UI.Panel
{
    public RData: Part;
    public Hovered: boolean;
    public ParentPosition: TBX.Vertex;
    public SlotLabel: TBX.UI.Label;
    public StatusLabel: TBX.UI.Label;
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
        this.Position = Offset.Copy().Add(new TBX.Vertex(-960,130,0));
    }
    public Init(): void
    {
        this.Active = false;
        this.Style.Layout.Dock = TBX.UI.DockType.Top;
        this.Size = new TBX.Vertex(180, 80);
        this.BackColor = TBX.Color.FromRGBA(255,255,255,200);
        this.Style.Values.flexDirection = "column";
        this.Style.Values.flexDirection = "column";
        this.Style.Border.Color = Settings.ForeColor;
        this.Style.Border.Radius = 8;
        this.Style.Border.Width = 4;
        this.SlotLabel = new TBX.UI.Label();
        this.SlotLabel.Style.Text.Size = 16;
        this.SlotLabel.Style.Values.textTransform = "uppercase";
        this.SlotLabel.ForeColor = Settings.ForeColor2;
        this.SlotLabel.Dock = TBX.UI.DockType.None;
        this.SlotLabel.Style.Margin.Top = -15;
        this.SlotLabel.Style.Margin.Bottom = -30;
        this.Attach(this.SlotLabel);
        this.StatusLabel = new TBX.UI.Label();
        this.StatusLabel.Style.Text.Size = 32;
        this.StatusLabel.ForeColor = Settings.ForeColor;
        this.StatusLabel.Dock = TBX.UI.DockType.None;
        this.Attach(this.StatusLabel);
        this.Update();
    }
    public ApplyData(RData: Part): void
    {
        this.SlotLabel.Text = RData.Type;
        this.StatusLabel.Text = "Status: " + RData.Status + "%";
    }
    public SetVisible(Value: boolean): void
    {
        this.Active = Value;
    }
}
