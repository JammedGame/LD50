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

    public constructor() {
        super();
        this.Init();
    }

    public Init(): void {
        this.Name = "InventoryIcon";
        this.Size = new TBX.Vertex(150, 200);
        this.BackColor = TBX.Color.Empty;
        this.Style.Values.position = "relative";
        this.Style.Values.flexDirection = "column";
        this.icon = this.CreateIcon();
        this.label = this.CreateLabel();
        this.Attach(this.icon);
        this.Attach(this.label);
    }

    public ApplyData(part?: Part): void {
        if (part) {
            this.Active = true;
            this.part = part;
            this.label.Text = this.part.Name;
            this.icon.Style.Background.Image = 'url("' + Settings.ResourcesRoot + Settings.PartsRoot + this.iconUrl + '.png")';
        } else {
            this.Active = false;
        }
    }

    private CreateIcon(): TBX.UI.Panel {
        const icon = new TBX.UI.Panel();
        icon.Style.Margin.All = 0;
        icon.Style.Border.Radius = 8;
        icon.Size = new TBX.Vertex(150, 150);
        icon.Style.Values.backgroundSize = "cover";
        icon.Style.Border.Radius = 8;
        icon.Style.Border.Width = 4;
        icon.Style.Border.Color = Settings.ForeColor;
        icon.Style.Values.position = "static";
        return icon;
    }

    private CreateLabel(): TBX.UI.Label {
        const label = new TBX.UI.Label();
        label.Dock = TBX.UI.DockType.None;
        label.Style.Values.position = "static";
        label.Size = new TBX.Vertex(150, 30);
        label.Style.Text.Size = 20;
        label.Style.Text.Weight = 700;
        label.Style.Values.textTransform = "uppercase";
        label.ForeColor = Settings.ForeColor;
        return label;
    }
}
