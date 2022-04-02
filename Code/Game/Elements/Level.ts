export { Level }

import * as TBX from "toybox-engine";

class Level
{
    private _Scene:TBX.Scene2D;
    private _Obstacles:TBX.Tile[];
    public constructor(Old?:Level, Scene?:TBX.Scene2D)
    {
        this._Scene = Scene;
        if(Old)
        {
            //TODO
        }
        else
        {
            this.Init();
        }
    }
    private Init() : void
    {
        this._Obstacles = [];
        for(let i = 0; i < 100; i++)
        {
            this.GenerateObstacle(i * 400 + 540);
        }
    }
    public Reset() : void
    {
        for(let i = 0; i < this._Obstacles.length; i++)
        {
            this._Scene.Remove(this._Obstacles[i]);
        }
        this._Obstacles = [];
        this.Init();
    }
    private GenerateObstacle(Offset:number) : void
    {
        let Location:number = TBX.Random.Next(350,830);
        let UpperTile:TBX.Tile = new TBX.Tile();
        UpperTile.Size = new TBX.Vertex(80, Location - 150, 1);
        UpperTile.Position = new TBX.Vertex(Offset, UpperTile.Size.Y / 2, 0.4);
        UpperTile.Paint = TBX.Color.FromRGBA(23,38,49,255);
        UpperTile.Collision.Active = true;
        this._Obstacles.push(UpperTile);
        let LowerTile:TBX.Tile = new TBX.Tile();
        LowerTile.Size = new TBX.Vertex(80, 930 - Location, 1);
        LowerTile.Position = new TBX.Vertex(Offset, Location + 150 + LowerTile.Size.Y / 2, 0.4);
        LowerTile.Paint = TBX.Color.FromRGBA(23,38,49,255);
        LowerTile.Collision.Active = true;
        this._Obstacles.push(LowerTile);
        this._Scene.Attach(UpperTile);
        this._Scene.Attach(LowerTile);
    }
}