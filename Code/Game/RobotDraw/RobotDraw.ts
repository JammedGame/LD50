export { RobotDraw }

import * as TBX from "toybox-engine";

import { SlotDraw } from "./SlotDraw";
import { Robot, SlotType, SlotTypeToPartType, SlotTypeValues } from "../RobotLogic/Robot";

class RobotDraw extends TBX.Tile {
    
    public RData: Robot;
    public SlotDraws: { [key: string]: SlotDraw }
    private _Scene?: TBX.Scene2D;

    public get SlotsArray(): SlotDraw[] {
        return Object.values(this.SlotDraws);
    }

    public constructor(Old?: RobotDraw) {
        super(Old);
        this.SlotDraws = {};
        SlotTypeValues().forEach(SlotTypeValue => {
            this.SlotDraws[SlotTypeValue] = new SlotDraw();
            this.SlotDraws[SlotTypeValue].partType = SlotTypeToPartType(SlotTypeValue as SlotType);
            this.SlotDraws[SlotTypeValue].slotType = SlotTypeValue as SlotType;
            this.SlotDraws[SlotTypeValue].ParentPosition = this.Position;
        });
        if (Old) {
            if (Old.RData) {
                this.ApplyData(Old.RData.Copy());
            }
        }
        else {
            this.RData = new Robot();
        }
    }

    public Copy(): RobotDraw {
        return new RobotDraw(this);
    }

    public SetPosition(Value: TBX.Vertex): void {
        this.Position = Value;
        this.SlotsArray.forEach((Slot: SlotDraw) => {
            Slot.ParentPosition = Value;
            Slot.SetPositions();
        });
    }

    public OnAttach(Args: any): void {
        this._Scene = Args.Scene;
        this.SlotsArray.forEach((Slot: SlotDraw) => {
            this._Scene.Attach(Slot);
        });
    }

    public OnRemove(Args: any): void {
        this.SlotsArray.forEach((Slot: SlotDraw) => {
            this._Scene.Remove(Slot);
        });
        this._Scene = null;
    }

    public ApplyData(RData: Robot): void {
        this.RData = RData;
        for (let Slot in RData.Slots) {
            this.SlotDraws[Slot].ApplyData(RData.Slots[Slot]);
        }
    }

    public Update(): void {

    }
}
