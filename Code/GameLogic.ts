export { GameLogic };

import * as TBX from "toybox-engine";

import { SoundManager } from "./SoundManager";
import { MenuScene } from "./UIScenes/MenuScene";
import { SettingsScene } from "./UIScenes/SettingsScene";
import { CreditsScene } from "./UIScenes/CreditsScene";
import { GameOverScene } from "./UIScenes/GameOverScene";
import { LoadingScene } from "./UIScenes/LoadingScene";
import { GameScene } from "./Game/GameScene";
import Settings from "./Settings";

class GameLogic
{
    private _Game:TBX.Game;
    private _Runner:TBX.Runner;
    public constructor(Old?:GameLogic)
    {
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
        TBX.Settings.GlobalFontFamily = "Reenie Beanie";
        if(window.location.href.indexOf("itch.io") != -1)
        {
            TBX.Settings.GlobalFontScale = 0.67;
        }
        this._Game = new TBX.Game();
        this._Game.Name = Settings.Name;
        let SM:SoundManager = new SoundManager();
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0));
        this._Game.Attach(new MenuScene());
        this._Game.Attach(new SettingsScene());
        this._Game.Attach(new CreditsScene());
        this._Game.Attach(new GameScene());
        this._Game.Attach(new GameOverScene());
        this._Game.Attach(new LoadingScene());
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Loading");
        this._Runner.Run();
    }
}