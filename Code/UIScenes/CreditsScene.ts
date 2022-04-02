export { CreditsScene }

import * as TBX from "toybox-engine";

import { UIScene } from "./UIScene"; 

class CreditsScene extends UIScene
{
    public static Current:CreditsScene;
    private _Back:TBX.UI.Button;
    public constructor(Old?:CreditsScene)
    {
        super(Old);
        if(Old)
        {
            //TODO
        }
        else
        {
            this.InitCreditsScene();
            CreditsScene.Current = this;
        }
    }
    private InitCreditsScene() : void
    {
        this.Name = "Credits";
        this._Title.Text = "Credits";
        this.CreateLabel("Miša Jovanović", -1);
        this.CreateLabel("Nikola Djordjević", 0);
        this.CreateLabel("Nikola Dragojlović", 1);
        this.CreateLabel("Ivan Plavšić", 2);
        this.CreateLabel("Jelena Ralčić", 3);
        this.CreateLabel("Filip Abramović", 4);
        this.CreateLabel("Ivana Jelić", 5);
        this.CreateLabel("Miloš Manojlović", 6);
        this._Back = this.CreateButton("Back", 3);
        this._Back.Events.Click.push(this.BackClick);
    }
    private BackClick() : void
    {
        TBX.Runner.Current.SwitchScene("Menu");
    }
}
