export { RobotDraw }

import * as TBX from "toybox-engine";

import { PartDraw } from "./PartDraw";
import { Robot } from "../RobotLogic/Robot";
import { Part, PartSlotValues } from "../RobotLogic/Part";

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
        });
        if(Old)
        {
            this.Data = Old.Data.Copy();
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
    public OnAttach(Args: any)
    {
        this._Scene = Args.Scene;
        this.PartsArray.forEach((P: PartDraw) => {
            this._Scene.Attach(P);
        });
    }
    public OnRemove(Args: any)
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
            this.Parts[P.Slot].Data = P;
        });
    }
    public Update() : void
    {
        
    }
}
