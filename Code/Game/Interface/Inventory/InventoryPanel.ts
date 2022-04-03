export { InventoryPanel }

import * as TBX from "toybox-engine";

import Settings from "../../../Settings";
import { Part } from "../../RobotLogic/Part";
import { InventoryIcon } from "./InventoryIcon";

class InventoryPanel extends TBX.UI.Panel {

    public parts: Part[];
    public icons: InventoryIcon[];

    public constructor(dock: TBX.UI.DockType) {
        super();
        this.icons = [];
        this.parts = [];
        this.Init(dock);
    }
    
    private Init(dock: TBX.UI.DockType): void {
        this.Name = "InventoryPanel";
        this.Style.Layout.Dock = dock;
        this.Size = new TBX.Vertex(180, 660);
        this.Position = new TBX.Vertex(-10, 0, 0);
        this.BackColor = TBX.Color.FromRGBA(255, 255, 255, 80);
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

    public ApplyData(parts: Part[]): void {
        this.parts = parts;
        this.RenderIcons();
    }

    private RenderIcons(): void {
        if (this.icons.length > 0) {
            this.icons.forEach(icon => {
                this.Remove(icon);
            });
        }
        this.icons = [];
        this.parts.forEach(part => {
            const icon = new InventoryIcon(part);
            this.icons.push(icon);
            this.Attach(icon);
        });
    }
}
