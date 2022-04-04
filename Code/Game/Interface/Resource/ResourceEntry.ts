export { ResourceEntry }

import * as TBX from "toybox-engine";

import Settings from "../../../Settings";

class ResourceEntry extends TBX.UI.Panel {

    public icon: TBX.UI.Panel;
    public label: TBX.UI.Label;

    public constructor(iconUrl: string) {
        super();
        this.Init(iconUrl);
    }

    public Init(iconUrl: string): void {
        this.Name = "InventoryIcon";
        this.Size = new TBX.Vertex(150, 50);
        this.BackColor = TBX.Color.Empty;
        this.Style.Values.position = "relative";
        this.Style.Values.flexDirection = "row";
        this.icon = this.CreateIcon(iconUrl);
        this.label = this.CreateLabel();
        this.Attach(this.icon);
        this.Attach(this.label);
    }

    public ApplyData(text: string): void {
        this.label.Text = text;
    }

    private CreateIcon(iconUrl: string): TBX.UI.Panel {
        const icon = new TBX.UI.Panel();
        icon.Style.Margin.All = 0;
        icon.Style.Border.Radius = 8;
        icon.Size = new TBX.Vertex(50, 50);
        icon.Style.Values.backgroundSize = "contain";
        icon.Style.Border.Radius = 2;
        icon.Style.Border.Width = 1;
        icon.Style.Border.Color = Settings.ForeColor;
        icon.Style.Values.position = "static";
        icon.Style.Background.Image = 'url("' + Settings.ResourcesRoot + Settings.ResourceIconsRoot + iconUrl + '_icon.png")';
        return icon;
    }

    private CreateLabel(): TBX.UI.Label {
        const label = new TBX.UI.Label();
        label.Text = '100';
        label.Dock = TBX.UI.DockType.None;
        label.Style.Values.position = "static";
        label.Size = new TBX.Vertex(100, 50);
        label.Style.Text.Size = 40;
        label.Style.Text.Weight = 700;
        label.Style.Values.textTransform = "uppercase";
        label.ForeColor = Settings.ForeColor;
        return label;
    }
}
