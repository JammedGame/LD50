export { GameScene };

import * as TBX from "toybox-engine";

import Settings from "../Settings";
import { RobotGen } from "./Data/RobotGen";
import { SlotDraw } from "./RobotDraw/SlotDraw";
import { RobotDraw } from "./RobotDraw/RobotDraw";
import { PartGen } from "./Data/PartGen";
import { SlotType } from "./RobotLogic/Robot";
import { ResourceType } from "./RobotLogic/ResourceType";
import { InventoryPanel } from "./Interface/Inventory/InventoryPanel";
import { InventoryIcon } from "./Interface/Inventory/InventoryIcon";
import { InterfaceFactory } from "./Interface/InterfaceFactory";

class GameScene extends TBX.Scene2D
{
    public static Current:GameScene;
    private _Robot: RobotDraw;
    private _HoveredSlot?: SlotDraw;
    private _BackButton: TBX.UI.Button;
    private _Inventory: InventoryPanel;
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
    private InitGameScene(): void
    {
        this.Name = "Game";
        this.CreateBackground("Paper");
        this._Robot = new RobotDraw();
        this._Robot.ApplyData(RobotGen.randomRobot());
        //this._Robot.ApplyData(RobotGen.generateSet(3));
        this._Robot.SetPosition(new TBX.Vertex(960, 540));
        this.Events.MouseMove.push(this.MouseMove.bind(this));
        this.Attach(this._Robot);
        this._BackButton = this.CreateButton("Menu", TBX.UI.DockType.BottomLeft, new TBX.Vertex(50,50,0));
        this._BackButton.Events.Click.push(this.GoBack.bind(this));
        this._Inventory = InterfaceFactory.GenerateInventory();
        this.Attach(this._Inventory);
    }
    public Reset(): void
    {
        
    }
    public GoBack(): void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
    public MouseMove(Game: TBX.Game, Args: any): void
    {
        const SceneObject = TBX.Runner.Current.PickSceneObject(Args.UnscaledLocation);
        if(SceneObject && SceneObject instanceof SlotDraw)
        {
            const PickedPart = SceneObject as unknown as SlotDraw;
            if (PickedPart != this._HoveredSlot)
            {
                if (this._HoveredSlot)
                {
                    this._HoveredSlot.SetHovered(false);
                }
                this._HoveredSlot = PickedPart;
                this._HoveredSlot.SetHovered(true);
            }
        }
        else
        {
            if (this._HoveredSlot)
            {
                this._HoveredSlot.SetHovered(false);
                this._HoveredSlot = undefined;
            }
        }
    }
    protected CreateBackground(Name:string) : void
    {
        let Back:TBX.Tile = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/"+Name+".png"], new TBX.Vertex(960,540), new TBX.Vertex(1920, 1080, 1));
        Back.Fixed = true;
        this.Attach(Back);
    }
    protected CreateButton(Text: string, Dock: TBX.UI.DockType, Position: TBX.Vertex) : TBX.UI.Button
    {
        let Button:TBX.UI.Button = new TBX.UI.Button(null, Text);
        Button.Name = Text;
        Button.Position = Position;
        Button.ForeColor = Settings.ForeColor;
        Button.BackColor = TBX.Color.Empty;
        Button.Dock = Dock;
        Button.Style.Border.Color = Settings.ForeColor;
        Button.Style.Padding.All = 0;
        Button.Style.Border.Width = 4;
        Button.Style.Border.Radius = 8;
        this.Attach(Button);
        return Button;
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
