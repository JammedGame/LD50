export { GameScene };

import * as TBX from "toybox-engine";
import { RobotGen } from "./Data/RobotGen";
import { PartDraw } from "./RobotDraw/PartDraw";

import { RobotDraw } from "./RobotDraw/RobotDraw";
import { Part } from "./RobotLogic/Part";
import { Robot } from "./RobotLogic/Robot";

class GameScene extends TBX.Scene2D
{
    public static Current:GameScene;
    private _Robot: RobotDraw;
    private _HoveredPart?: PartDraw;
    public constructor(Old?:GameScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitGameScene();
            GameScene.Current = this;
        }
    }
    private InitGameScene() : void
    {
        this.Name = "Game";
        this.CreateBackground("Paper");
        this._Robot = new RobotDraw();
        this._Robot.ApplyData(this._Robot.GenerateRobot());
        this._Robot.SetPosition(new TBX.Vertex(960, 540));
        this.Events.MouseMove.push(this.MouseMove.bind(this));
        this.Attach(this._Robot);

    }
    public Reset(): void
    {
        
    }
    public MouseMove(Game: TBX.Game, Args: any): void
    {
        const SceneObject = TBX.Runner.Current.PickSceneObject(Args.UnscaledLocation);
        if(SceneObject && SceneObject instanceof PartDraw)
        {
            const PickedPart = SceneObject as unknown as PartDraw;
            if (PickedPart != this._HoveredPart)
            {
                if (this._HoveredPart)
                {
                    this._HoveredPart.SetHovered(false);
                }
                this._HoveredPart = PickedPart;
                this._HoveredPart.SetHovered(true);
            }
        }
        else
        {
            if (this._HoveredPart)
            {
                this._HoveredPart.SetHovered(false);
                this._HoveredPart = undefined;
            }
        }
    }
    protected CreateBackground(Name:string) : void
    {
        let Back:TBX.Tile = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/"+Name+".png"], new TBX.Vertex(960,540), new TBX.Vertex(1920, 1080, 1));
        Back.Fixed = true;
        this.Attach(Back);
    }
    protected CreateLabel(Text:string) : TBX.UI.Label
    {
        let Label:TBX.UI.Label = new TBX.UI.Label(null, Text);
        Label.Size = new TBX.Vertex(800, 80);
        Label.Position = new TBX.Vertex(960, 100, 0.2);
        Label.ForeColor = TBX.Color.FromRGBA(244,208,63,255);
        Label.Style.Text.Size = 60;
        Label.Style.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
}