export { GameScene };

import * as TBX from "toybox-engine";

import Settings from "../Settings";
import { RobotGen } from "./Data/RobotGen";
import { GameState } from "./Data/GameState";
import { SlotDraw } from "./RobotDraw/SlotDraw";
import { RobotDraw } from "./RobotDraw/RobotDraw";
import { InventoryPanel } from "./Interface/Inventory/InventoryPanel";
import { DraggedPart } from "./RobotDraw/DraggedPart";
import { Part } from "./RobotLogic/Part";
import { ResourcePanel } from "./Interface/Resource/ResourcePanel";

class GameScene extends TBX.Scene2D {
    public static Current: GameScene;
    public gameState: GameState;
    private _Robot: RobotDraw;
    private _Dragged: DraggedPart;
    private _HoveredSlot?: SlotDraw;
    private _BackButton: TBX.UI.Button;
    private _Inventory: InventoryPanel;
    private _Shop: InventoryPanel;
    private _Resources: ResourcePanel;

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
    private InitGameScene(): void {
        this.gameState = new GameState();

        this.Name = "Game";
        this.CreateBackground("Paper");
        this.Events.MouseDown.push(this.MouseDown.bind(this));
        window.addEventListener("mouseup", this.MouseUp.bind(this))
        window.addEventListener("mousemove", this.MouseMove.bind(this))

        this._BackButton = this.CreateButton("Menu", TBX.UI.DockType.BottomLeft, new TBX.Vertex(50, 50, 0));
        this._BackButton.Events.Click.push(this.GoBack.bind(this));

        this._Robot = new RobotDraw();
        this._Robot.SetPosition(new TBX.Vertex(960, 540));
        this.Attach(this._Robot);

        this._Inventory = new InventoryPanel(TBX.UI.DockType.Left);
        this._Inventory.Click = this.InventorySelect.bind(this);
        this.Attach(this._Inventory);

        this._Shop = new InventoryPanel(TBX.UI.DockType.Right);
        this._Shop.Click = this.ShopSelect.bind(this);
        this.Attach(this._Shop);

        this._Resources = new ResourcePanel();
        this.Attach(this._Resources);

        this._Dragged = new DraggedPart();
        this.Attach(this._Dragged);

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
        this._Resources.ApplyData(this.gameState.resources);
    }

    public GoBack(): void {
        TBX.Runner.Current.SwitchScene("Menu");
    }

    public InventorySelect(part: Part): void {
        this._Dragged.ApplyData(part);
        setTimeout(() => {
            this.gameState.inventory.Remove(part);
            this._Inventory.ApplyData(this.gameState.inventory.parts);
        }, 100);
    }

    public ShopSelect(part: Part): void {
        if (this.gameState.CanBuy(part)) {
            this._Dragged.ApplyData(part);
            setTimeout(() => {
                this.gameState.BuyPartFromShop(part);
                this._Shop.ApplyData(this.gameState.shop.parts);
                this._Resources.ApplyData(this.gameState.resources);
            }, 100);
        }
    }

    public MouseDown(Game: TBX.Game, Args: any): void {
        if (!this._Dragged?.Active) {
            const SceneObject = TBX.Runner.Current.PickSceneObject(Args.UnscaledLocation);
            if (SceneObject && SceneObject instanceof SlotDraw) {
                const PickedPart = SceneObject as unknown as SlotDraw;
                this._Dragged.ApplyData(PickedPart.RData);
                setTimeout(() => {
                    this._Robot.RemoveFromSlot(PickedPart.slotType);
                }, 100);
            }
        }
    }

    public MouseMove(event: any): void {
        let NewLocation = new TBX.Vertex(event.clientX, event.clientY, 1);
        if (this._Dragged?.Active) {
            this._Dragged.SetPosition(this.TransformMouseCoordinates(NewLocation));
        } else {
            const SceneObject = TBX.Runner.Current.PickSceneObject(NewLocation);
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

    public MouseUp(event: any): void {
        let NewLocation = new TBX.Vertex(event.clientX, event.clientY, 1);
        if (this._Dragged?.Active) {
            if (NewLocation.X < 200) {
                this.gameState.inventory.Add(this._Dragged.part);
                this._Dragged.ApplyData(undefined);
                this._Inventory.ApplyData(this.gameState.inventory.parts);
            } else if (NewLocation.X > 1720) {
                this.gameState.SellPart(this._Dragged.part);
                this._Dragged.ApplyData(undefined);
                this._Resources.ApplyData(this.gameState.resources);
            } else {
                const SceneObject = TBX.Runner.Current.PickSceneObject(NewLocation);
                if (SceneObject && SceneObject instanceof SlotDraw) {
                    const SelectedSlot = SceneObject as unknown as SlotDraw;
                    if (SelectedSlot.partType === this._Dragged.part.Type) {
                        let Replacement = undefined;
                        if (SelectedSlot.RData) {
                            Replacement = SelectedSlot.RData;
                        }
                        SelectedSlot.ApplyData(this._Dragged.part);
                        this._Dragged.ApplyData(Replacement);
                    } else {
                        this.gameState.inventory.Add(this._Dragged.part);
                        this._Dragged.ApplyData(undefined);
                        this._Inventory.ApplyData(this.gameState.inventory.parts);
                    }
                }
                else {
                    this.gameState.inventory.Add(this._Dragged.part);
                    this._Dragged.ApplyData(undefined);
                    this._Inventory.ApplyData(this.gameState.inventory.parts);
                }
            }
        }
    }

    public TransformMouseCoordinates(Value: TBX.Vertex): TBX.Vertex {
        const Body = document.getElementsByTagName("body")[0];
        return new TBX.Vertex(
            (Value.X / Body.clientWidth) * 1920,
            (Value.Y / Body.clientHeight) * 1080,
            1
        );
    }

    protected CreateBackground(Name: string): void {
        let Back: TBX.Tile = TBX.SceneObjectUtil.CreateTile(
            Name,
            ["Resources/Textures/Backgrounds/" + Name + ".png"],
            new TBX.Vertex(960, 540),
            new TBX.Vertex(1920, 1080, 1));
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
