export { ResourcePanel }

import * as TBX from "toybox-engine";

import Settings from "../../../Settings";
import { ResourceEntry } from "./ResourceEntry";
import { ResourceType, ResourceTypeValues } from "../../RobotLogic/ResourceType";
import { ResourceStorage } from "../../Data/GameState";

class ResourcePanel extends TBX.UI.Panel {

    public resourceEntries: { [key: string]: ResourceEntry }

    public constructor() {
        super();
        this.Init();
    }
    
    private Init(): void {
        this.Name = "ResourcePanel";
        this.Style.Layout.Dock = TBX.UI.DockType.Top;
        this.Size = new TBX.Vertex(920, 70);
        this.Position = new TBX.Vertex(0, -5, 0);
        this.BackColor = TBX.Color.FromRGBA(255, 255, 255, 80);
        this.Style.Padding.All = 10;
        this.Style.Values.flexDirection = "row";
        this.Style.Values.overflowY = "auto";
        this.Style.Values.overflowX = "hidden";
        this.Style.Values.justifyContent = "flex-start";
        this.Style.Border.Color = Settings.ForeColor;
        this.Style.Border.Radius = 8;
        this.Style.Border.Width = 4;
        this.resourceEntries = {};
        ResourceTypeValues().forEach(resource => {
            let entry = new ResourceEntry(resource);
            this.resourceEntries[resource] = entry;
            this.Attach(entry);
        });
    }

    public ApplyData(resources: ResourceStorage): void {
        ResourceTypeValues().forEach(resource => {
            this.resourceEntries[resource].ApplyData(resources.GetAmount(resource as ResourceType).toString())
        });
    }
}
