export { Part }

const UNNAMED = "Unnamed";

class Part
{
    public Name: string;
    public Status: number;
    public constructor(Old?: Part)
    {
        if(Old)
        {
            this.Name = Old.Name;
            this.Status = Old.Status;
        }
        else
        {
            this.Name = UNNAMED;
            this.Status = 100;
        }
    }
    public Copy(): Part {
        return new Part(this);
    }
}
