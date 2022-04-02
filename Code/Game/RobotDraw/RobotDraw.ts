export { RobotDraw }

import * as TBX from "toybox-engine";

import { PartDraw } from "./PartDraw";
import { Robot } from "../RobotLogic/Robot";
import { Part, PartSlot, PartSlotValues } from "../RobotLogic/Part";

class RobotDraw extends TBX.Tile
{
    public Data: Robot;
    public Parts: { [key: string]: PartDraw }
    private _Scene?: TBX.Scene2D;
    public get PartsArray(): PartDraw[]
    {
        return Object.values(this.Parts);
    }
    public constructor(Old?: RobotDraw)
    {
        super(Old);
        this.Parts = {};
        PartSlotValues().forEach(PartSlotValue => {
            this.Parts[PartSlotValue] = new PartDraw();
            this.Parts[PartSlotValue].ParentPosition = this.Position;
        });
        if(Old)
        {
            if (Old.Data) {
                this.ApplyData(Old.Data.Copy());
            }
        }
        else
        {
            this.Data = new Robot();
        }
    }
    public Copy(): RobotDraw
    {
        return new RobotDraw(this);
    }
    public GenerateRobot(): Robot
    {
        let Bot = new Robot();
        let Head = new Part(null, PartSlot.Head);
        let Torso = new Part(null, PartSlot.Torso);
        let LeftArm = new Part(null, PartSlot.LeftArm);
        let RightArm = new Part(null, PartSlot.RightArm);
        let LeftLeg = new Part(null, PartSlot.LeftLeg);
        let RightLeg = new Part(null, PartSlot.RightLeg);
        Bot.Parts[PartSlot.Head] = Head;
        Bot.Parts[PartSlot.Torso] = Torso;
        Bot.Parts[PartSlot.LeftArm] = LeftArm;
        Bot.Parts[PartSlot.RightArm] = RightArm;
        Bot.Parts[PartSlot.LeftLeg] = LeftLeg;
        Bot.Parts[PartSlot.RightLeg] = RightLeg;
        return Bot;
    }
    public SetPosition(Value: TBX.Vertex): void
    {
        this.Position = Value;
        this.PartsArray.forEach((Part: PartDraw) => {
            Part.ParentPosition = Value;
            Part.SetPositions();
        });
    }
    public OnAttach(Args: any): void
    {
        this._Scene = Args.Scene;
        this.PartsArray.forEach((P: PartDraw) => {
            this._Scene.Attach(P);
        });
    }
    public OnRemove(Args: any): void
    {
        this.PartsArray.forEach((P: PartDraw) => {
            this._Scene.Remove(P);
        });
        this._Scene = null;
    }
    public ApplyData(Data: Robot): void
    {
        this.Data = Data;
        this.Data.PartsArray.forEach((P: Part) => {
            this.Parts[P.Slot].ApplyData(P);
        });
    }
    public Update() : void
    {
        
    }
}
