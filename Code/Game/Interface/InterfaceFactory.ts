export { InterfaceFactory }

import * as TBX from "toybox-engine";
import { PartGen } from "../Data/PartGen";

import { InventoryIcon } from "./Inventory/InventoryIcon";
import { InventoryPanel } from "./Inventory/InventoryPanel";

class InterfaceFactory {
    public static GenerateInventory(): InventoryPanel {
        const Invertory = new InventoryPanel(TBX.UI.DockType.Left);
        const parts = PartGen.generateInitialPartOffers();
        Invertory.ApplyData(parts);
        return Invertory;
    }

    public static GenerateShop(): InventoryPanel {
        const Shop = new InventoryPanel(TBX.UI.DockType.Right);
        const parts = PartGen.generateInitialPartOffers();
        Shop.ApplyData(parts);
        return Shop;
    }
}
