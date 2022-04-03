export { GameScene };

import * as TBX from "toybox-engine";

import Settings from "../Settings";
import { GameState } from "./Data/GameState";
import { SlotDraw } from "./RobotDraw/SlotDraw";
import { RobotDraw } from "./RobotDraw/RobotDraw";
import { InventoryPanel } from "./Interface/Inventory/InventoryPanel";

class GameScene extends TBX.Scene2D
{
    public static Current: GameScene;
    public gameState: GameState;
    private _Robot: RobotDraw;
    private _HoveredSlot?: SlotDraw;
    private _PickedUpSlot?: SlotDraw;
    private _BackButton: TBX.UI.Button;
    private _Inventory: InventoryPanel;
    private _Shop: InventoryPanel;

    public constructor(Old?: GameScene) {
        super(Old);
        if (Old) {
            //TODO
        }
        else {
            this.InitGameScene();
            GameScene.Current = this;
        }
    }
    private InitGameScene(): void
    {
        this.gameState = new GameState();

        this.Name = "Game";
        this.CreateBackground("Paper");
        this.Events.MouseUp.push(this.MouseUp.bind(this));
        this.Events.MouseDown.push(this.MouseDown.bind(this));
        this.Events.MouseMove.push(this.MouseMove.bind(this));
        this._BackButton = this.CreateButton("Menu", TBX.UI.DockType.BottomLeft, new TBX.Vertex(50, 50, 0));
        this._BackButton.Events.Click.push(this.GoBack.bind(this));
        this._Robot = new RobotDraw();
        this._Robot.SetPosition(new TBX.Vertex(960, 540));
        this._Inventory = new InventoryPanel(TBX.UI.DockType.Left);
        this._Shop = new InventoryPanel(TBX.UI.DockType.Right);
        this.Attach(this._Robot);
        this.Attach(this._Inventory);
        this.Attach(this._Shop);
        this.ApplyState();
    }

    public Reset(): void {
        this.gameState = new GameState();
        this.ApplyState();
    }

    public ApplyState(): void {
        this._Robot.ApplyData(this.gameState.currentRobot);
        this._Inventory.ApplyData(this.gameState.inventory.parts);
        this._Shop.ApplyData(this.gameState.shop.parts);
    }

    public GoBack(): void {
        TBX.Runner.Current.SwitchScene("Menu");
    }

    public MouseDown(Game: TBX.Game, Args: any): void {
        if (!this._PickedUpSlot) {
            const SceneObject = TBX.Runner.Current.PickSceneObject(Args.UnscaledLocation);
            if (SceneObject && SceneObject instanceof SlotDraw) {
                const PickedPart = SceneObject as unknown as SlotDraw;
                this._PickedUpSlot = new SlotDraw(PickedPart);
                this._Robot.RemoveFromSlot(PickedPart.slotType);
                this.Attach(this._PickedUpSlot);
            }
        }
    }

    public MouseMove(Game: TBX.Game, Args: any): void {
        if (this._PickedUpSlot) {
            this._PickedUpSlot.Position.X = Args.UnscaledLocation.X;
            this._PickedUpSlot.Position.Y = Args.UnscaledLocation.Y;
            this._PickedUpSlot.Position.Z = 1;
        } else {
            const SceneObject = TBX.Runner.Current.PickSceneObject(Args.UnscaledLocation);
            if (SceneObject && SceneObject instanceof SlotDraw) {
                const PickedPart = SceneObject as unknown as SlotDraw;
                if (PickedPart != this._HoveredSlot) {
                    if (this._HoveredSlot) {
                        this._HoveredSlot.SetHovered(false);
                    }
                    this._HoveredSlot = PickedPart;
                    this._HoveredSlot.SetHovered(true);
                }
            }
            else {
                if (this._HoveredSlot) {
                    this._HoveredSlot.SetHovered(false);
                    this._HoveredSlot = undefined;
                }
            }
        }
    }

    public MouseUp(Game: TBX.Game, Args: any): void {
        if (this._PickedUpSlot) {
            if (Args.UnscaledLocation.X < 400) {
                this.gameState.inventory.Add(this._PickedUpSlot.RData);
                this.Remove(this._PickedUpSlot);
                this._PickedUpSlot = undefined;
                this._Inventory.ApplyData(this.gameState.inventory.parts);
            } else if (Args.UnscaledLocation.X > 1520) {
                // Sell to shop
                this.Remove(this._PickedUpSlot);
                this._PickedUpSlot = undefined;
                console.info('sold');
            } else {
                this._Robot.AttachToSlot(this._PickedUpSlot.slotType, this._PickedUpSlot.RData);
                this.Remove(this._PickedUpSlot);
                this._PickedUpSlot = undefined;
            }
        }
    }

    protected CreateBackground(Name: string): void {
        let Back: TBX.Tile = TBX.SceneObjectUtil.CreateTile(Name, ["Resources/Textures/Backgrounds/" + Name + ".png"], new TBX.Vertex(960, 540), new TBX.Vertex(1920, 1080, 1));
        Back.Fixed = true;
        this.Attach(Back);
    }

    protected CreateButton(Text: string, Dock: TBX.UI.DockType, Position: TBX.Vertex): TBX.UI.Button {
        let Button: TBX.UI.Button = new TBX.UI.Button(null, Text);
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

    protected CreateLabel(Text: string): TBX.UI.Label {
        let Label: TBX.UI.Label = new TBX.UI.Label(null, Text);
        Label.Size = new TBX.Vertex(800, 80);
        Label.Position = new TBX.Vertex(960, 100, 0.2);
        Label.ForeColor = TBX.Color.FromRGBA(244, 208, 63, 255);
        Label.Style.Text.Size = 60;
        Label.Style.Border.Width = 0;
        this.Attach(Label);
        return Label;
    }
}
