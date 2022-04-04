export { DraggedPart }

import * as TBX from "toybox-engine";
import Settings from "../../Settings";

import { Part, PartType } from "../RobotLogic/Part";
import { PartDrawingUtil } from "./PartDrawingUtil";

class DraggedPart extends TBX.UI.Panel {

    public part: Part;

    public get iconUrl(): string {
        return this.part.Type + "/" + this.part.Id;
    }

    public constructor() {
        super();
        this.Init();
    }

    private Init(): void {
        this.Active = false;
        this.Name = "DraggedPart";
        this.Style.Layout.Dock = TBX.UI.DockType.TopLeft;
        this.Position = new TBX.Vertex(0, 0, 0);
        this.BackColor = TBX.Color.Empty;
        this.Style.Values.backgroundSize = "cover";
    }

    public ApplyData(part?: Part): void {
        if (part) {
            this.part = part;
            this.Size = PartDrawingUtil.GetSize(this.part.Type);
            this.Style.Background.Image = 'url("' + Settings.ResourcesRoot + Settings.PartsRoot + this.iconUrl + '.png")';
            setTimeout(() => {
                this.Active = true;
            }, 100);
        } else {
            this.Active = false;
        }
    }

    public SetPosition(Position: TBX.Vertex): void {
        this.Position = Position.Add(new TBX.Vertex(- this.Size.X / 2, - this.Size.Y / 2));
        if ((this.part.Type === PartType.Arm ||this.part.Type === PartType.Leg) && Position.X + this.Size.X / 2 > 960) {
            this.Style.Values.transform = "scaleX(-1)";
        } else {
            this.Style.Values.transform = "scaleX(1)";
        }
    }

    public SetFlip(Position: TBX.Vertex) {

    }

    public Update(): void {
        super.Update();
    }
}
