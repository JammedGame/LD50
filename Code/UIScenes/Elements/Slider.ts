export { Slider }

import * as TBX from "toybox-engine";
import Settings from "../../Settings";

class Slider extends TBX.UI.Panel
{
    private _Percent:number;
    private _Pointer:TBX.UI.Panel;
    private _Label:TBX.UI.Label;
    private _OnChange:Function[];
    public get Change():Function[] { return this._OnChange; }
    public constructor(Old?:Slider, Text?:string, Value?:number)
    {
        super(Old);
        this._OnChange = [];
        if(Old)
        {
            //TODO
        }
        else
        {
            this._Percent = 0.5;
            this.Init(Text, Value);
        }
    }
    public Init(Text?:string, Value?:number) : void
    {
        this._Percent = Value;
        this.Size = new TBX.Vertex(800, 50, 1);
        this.Dock = TBX.UI.DockType.Top;
        this.BackColor = TBX.Color.Empty;
        this.Style.Border.Color = Settings.ForeColor;
        this.Style.Border.Width = 4;
        this.Style.Border.Radius = 8;
        this._Pointer = new TBX.UI.Panel;
        this._Pointer.Style.Layout.Dock = TBX.UI.DockType.Left;
        this._Pointer.BackColor = Settings.ForeColor;
        this._Pointer.Size = new TBX.Vertex(400, 50, 1);
        this._Pointer.Style.Border.Radius = 4;
        this.Children.push(this._Pointer);
        this.Events.Click.push(this.Click.bind(this));
        this._Label = new TBX.UI.Label(null, Text);
        this._Label.Dock = TBX.UI.DockType.Top;
        this._Label.Position = new TBX.Vertex(0, -50, 0);
        this._Label.ForeColor = Settings.ForeColor;
        this._Label.Size = new TBX.Vertex(960, 45);
        this._Label.Style.Text.Size = 30;
        this._Label.Style.Border.Width = 0;
        this.Children.push(this._Label);
    }
    public OnAttach(Args:any) : void
    {
        this.UpdatePointer();
    }
    private UpdatePointer() : void
    {
        this._Pointer.Size.X = this._Percent * this.Size.X;
        this._Pointer.Update();
    }
    public Toggle(Toggled:boolean) : void
    {
        this.Active = Toggled;
        this._Pointer.Active = Toggled;
        this._Label.Active = Toggled;
    }
    private Click(G:TBX.Game, Args:any) : void
    {
        let Value:number = Args.Location.X;
        Value /= this.Element.clientWidth;
        this._Percent = Value;
        this.UpdatePointer();
        for(let i in this._OnChange)
        {
            this._OnChange[i](Value);
        }
    }
}
