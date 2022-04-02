export { PartDraw }

import * as TBX from "toybox-engine";

import { Part } from "../RobotLogic/Part";

class PartDraw extends TBX.Sprite
{
    public Data: Part;
    private _Scene?: TBX.Scene2D;
    public constructor(Old?: PartDraw)
    {
        super(Old);
        if(Old)
        {
            
        }
        else
        {
            
        }
    }
    public Copy(): PartDraw
    {
        return new PartDraw(this);
    }
    public OnAttach(Args: any)
    {
        this._Scene = Args.Scene;
        this._Scene.Attach(this);
    }
    public OnRemove(Args: any)
    {
        this._Scene = null;
        this._Scene.Remove(this);
    }
    public ApplyData(Data: Part): void
    {
        this.Data = Data;
    }
    public Update() : void
    {
        
    }
}
