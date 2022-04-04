import { Part, PartTypeValues } from "../RobotLogic/Part";

export { PartSet }

class PartSet {

    public Head: Part[];
    public Torso: Part[];
    public Arm: Part[];
    public Leg: Part[];

    public constructor(data: { [key: string]: Partial<Part>[] }) {
        this.Head = data["Head"].map(partData => new Part(partData));
        this.Torso = data["Torso"].map(partData => new Part(partData));
        this.Arm = data["Arm"].map(partData => new Part(partData));
        this.Leg = data["Leg"].map(partData => new Part(partData));
    }
}
