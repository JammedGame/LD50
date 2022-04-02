import { Part, PartSlot } from "../RobotLogic/Part";
import { Robot } from "../RobotLogic/Robot";

export { RobotGen }

class RobotGen
{
    public static Any(): Robot
    {
        let Bot: Robot = new Robot();
        Bot.Parts[PartSlot.Head] = new Part();

        return Bot;
    }
}
