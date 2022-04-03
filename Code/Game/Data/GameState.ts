import { Part } from "../RobotLogic/Part";
import { ResourceType } from "../RobotLogic/ResourceType";
import { Robot } from "../RobotLogic/Robot";
import { PartGen } from "./PartGen";
import { RobotGen } from "./RobotGen";

export { GameState }

class GameState
{
	public resources: ResourceStorage;
	public currentRobot: Robot;
	public inventory: InventoryState;
	public shop: ShopState;
	public missions: ActiveMissionsState;

	public constructor()
	{
		this.shop = new ShopState();
		this.resources = new ResourceStorage();
		this.currentRobot = RobotGen.randomRobot();
		this.inventory = new InventoryState();
		this.missions = new ActiveMissionsState();
	}
}

class ResourceStorage
{
	public resources: SingleResourceState[];

	constructor()
	{
		this.resources = [];
		this.resources.push(new SingleResourceState(ResourceType.Oil, 100));
		this.resources.push(new SingleResourceState(ResourceType.Lithium, 100));
		this.resources.push(new SingleResourceState(ResourceType.Platina, 100));
		this.resources.push(new SingleResourceState(ResourceType.Plutonium, 100));
		this.resources.push(new SingleResourceState(ResourceType.Gas, 100));
		this.resources.push(new SingleResourceState(ResourceType.Iron, 100));
	}

	private getResource(resourceType: ResourceType): SingleResourceState
	{
		return this.resources.find(x => x.resourceType == resourceType);
	}

	public GetAmount(resourceType: ResourceType): number
	{
		return this.getResource(resourceType).amount;
	}

	public Give(resourceType: ResourceType, amount: number): void
	{
		this.getResource(resourceType).amount += amount;
	}

	public CanAfford(resourceType: ResourceType, amount: number): boolean
	{
		return this.GetAmount(resourceType) >= amount;
	}

	public Spend(resourceType: ResourceType, amount: number): boolean
	{
		// return false if overspent.
		var resource = this.getResource(resourceType);
		resource.amount -= amount;
		return resource.amount >= 0;
	}
}

class SingleResourceState
{
	public amount: number;
	public resourceType: ResourceType;

	public constructor(resourceType: ResourceType, amount: number)
	{
		this.amount = amount;
		this.resourceType = resourceType;
	}
}

class InventoryState
{
	public parts: Part[];

	public constructor()
	{
		this.parts = [];
	}

	public Remove(part: Part): boolean
	{
		const index = this.parts.indexOf(part);
		if (index > -1)
		{
			this.parts.splice(index, 1);
			return true;
		}

		console.info('Failed to find part in inventory: ${part}');
		return false;
	}

	public Add(part: Part): void
	{
		this.parts.push(part);
	}
}

class ShopState
{
	public parts: Part[];

	public constructor()
	{
		this.parts = PartGen.generateInitialPartOffers();
	}

	public Buy(part: Part): boolean
	{
		const index = this.parts.indexOf(part);
		if (index == -1)
		{
			return false;
		}

		this.parts.splice(index, 1);
		this.parts.push();
		return true;
	}
}

class ActiveMissionsState
{
	public missions: SingleMissionState[];

	public constructor()
	{
		this.GenerateMissions();
	}

	public GenerateMissions(): void
	{
		this.missions = [];
		this.missions.push(new SingleMissionState(ResourceType.Gas, ResourceType.Lithium));
		this.missions.push(new SingleMissionState(ResourceType.Gas, ResourceType.Lithium));
		this.missions.push(new SingleMissionState(ResourceType.Gas, ResourceType.Lithium));
	}
}

class SingleMissionState
{
	public resource1: ResourceType;
	public resource2: ResourceType;

	public constructor(resource1: ResourceType, resource2: ResourceType)
	{
		this.resource1 = resource1;
		this.resource2 = resource2;
	}
}
