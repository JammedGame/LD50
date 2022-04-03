export { InterfaceFactory }

import * as TBX from "toybox-engine";

import { InventoryIcon } from "./Inventory/InventoryIcon";
import { InventoryPanel } from "./Inventory/InventoryPanel";

class InterfaceFactory
{
    public static GenerateInventory(): InventoryPanel
    {
        const Invertory = new InventoryPanel();
        let HeadIcon = new InventoryIcon("Head/head00", "Head");
        let TorsoIcon = new InventoryIcon("Torso/torso00", "Torso");
        let LegIcon = new InventoryIcon("Leg/leg00", "Leg");
        let ArmIcon = new InventoryIcon("Arm/arm00", "Arm");
        let ArmIcon2 = new InventoryIcon("Arm/arm00", "Arm");
        Invertory.Attach(HeadIcon);
        Invertory.Attach(TorsoIcon);
        Invertory.Attach(ArmIcon);
        Invertory.Attach(LegIcon);
        Invertory.Attach(ArmIcon2);
        return Invertory;
    }
}
