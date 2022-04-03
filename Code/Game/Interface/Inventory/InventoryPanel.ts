export { InventoryPanel }

import * as TBX from "toybox-engine";

import Settings from "../../../Settings";
import { Part } from "../../RobotLogic/Part";

class InventoryPanel extends TBX.UI.Panel
{
    public constructor()
    {
        super();
        this.Init();
    }
    public Init(): void
    {
        this.Name = "InventoryPanel";
        this.Style.Layout.Dock = TBX.UI.DockType.Left;
        this.Size = new TBX.Vertex(180, 660);
        this.Position = new TBX.Vertex(-10, 0, 0);
        this.BackColor = TBX.Color.FromRGBA(255,255,255,80);
        this.Style.Padding.Vertical = 20;
        this.Style.Values.flexDirection = "column";
        this.Style.Values.overflowY = "auto";
        this.Style.Values.overflowX = "hidden";
        this.Style.Values.justifyContent = "flex-start";
        this.Style.Border.Color = Settings.ForeColor;
        this.Style.Border.Radius = 8;
        this.Style.Border.Width = 4;
        this.Update();
    }
}
