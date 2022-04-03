export { InventoryIcon }

import * as TBX from "toybox-engine";

import Settings from "../../../Settings";
import { Part } from "../../RobotLogic/Part";

class InventoryIcon extends TBX.UI.Panel {
    public part: Part;
    public icon: TBX.UI.Panel;
    public label: TBX.UI.Label;
    public get iconUrl(): string {
        return this.part.Type + "/" + this.part.Id;
    }
    public constructor(part: Part) {
        super();
        this.part = part;
        this.Init();
    }
    public Init(): void {
        this.Name = "InventoryIcon";
        this.Size = new TBX.Vertex(150, 200);
        this.BackColor = TBX.Color.Empty;
        this.Style.Values.position = "relative";
        this.Style.Values.flexDirection = "column";
        this.icon = new TBX.UI.Panel();
        this.icon.Style.Margin.All = 0;
        this.icon.Style.Border.Radius = 8;
        this.icon.Size = new TBX.Vertex(150, 150);
        this.icon.Style.Background.Image = 'url("' + Settings.ResourcesRoot + Settings.PartsRoot + this.iconUrl + '.png")';
        this.icon.Style.Values.backgroundSize = "cover";
        this.icon.Style.Border.Radius = 8;
        this.icon.Style.Border.Width = 4;
        this.icon.Style.Border.Color = Settings.ForeColor;
        this.icon.Style.Values.position = "static";
        this.Attach(this.icon);
        if (Text) {
            this.label = new TBX.UI.Label();
            this.label.Text = this.part.Name;
            this.label.Dock = TBX.UI.DockType.None;
            this.label.Style.Values.position = "static";
            this.label.Size = new TBX.Vertex(150, 30);
            this.label.Style.Text.Size = 20;
            this.label.Style.Text.Weight = 700;
            this.label.Style.Values.textTransform = "uppercase";
            this.label.ForeColor = Settings.ForeColor;
            this.label.Update();
            this.Attach(this.label);
        }
        this.Update();
    }
}
