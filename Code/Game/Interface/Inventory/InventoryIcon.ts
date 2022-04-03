export { InventoryIcon }

import * as TBX from "toybox-engine";

import Settings from "../../../Settings";

class InventoryIcon extends TBX.UI.Panel
{
    public Icon: TBX.UI.Panel;
    public Label: TBX.UI.Label;
    public constructor(IconUrl: string, Text?: string)
    {
        super();
        this.Init(IconUrl, Text);
    }
    public Init(IconUrl: string, Text?: string): void
    {
        this.Name = "InventoryIcon";
        this.Size = new TBX.Vertex(150, 200);
        this.BackColor = TBX.Color.Empty;
        
        this.Style.Values.position = "relative";
        this.Style.Values.flexDirection = "column";
        this.Icon = new TBX.UI.Panel();
        this.Icon.Style.Margin.All = 0;
        this.Icon.Style.Border.Radius = 8;
        this.Icon.Size = new TBX.Vertex(150, 150);
        this.Icon.Style.Background.Image = 'url("/Resources/Textures/Parts/'+IconUrl+'.png")';
        this.Icon.Style.Values.backgroundSize = "cover";
        this.Icon.Style.Border.Radius = 8;
        this.Icon.Style.Border.Width = 4;
        this.Icon.Style.Border.Color = Settings.ForeColor;
        this.Icon.Style.Values.position = "static";
        this.Attach(this.Icon);
        if (Text)
        {
            this.Label = new TBX.UI.Label();
            this.Label.Text = Text;
            this.Label.Dock = TBX.UI.DockType.None;
            this.Label.Style.Values.position = "static";
            this.Label.Size = new TBX.Vertex(150, 30);
            this.Label.Style.Text.Size = 20;
            this.Label.Style.Text.Weight = 700;
            this.Label.Style.Values.textTransform = "uppercase";
            this.Label.ForeColor = Settings.ForeColor;
            this.Label.Update();
            this.Attach(this.Label);
        }
        this.Update();
    }
}
