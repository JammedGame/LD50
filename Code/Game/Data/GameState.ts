import { Part } from "../RobotLogic/Part";
import { ResourceType } from "../RobotLogic/ResourceType";
import { Robot } from "../RobotLogic/Robot";

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
		this.currentRobot = new Robot();
		this.inventory = new InventoryState();
		this.missions = new ActiveMissionsState();
	}
}

class ResourceStorage
{
	public resources: SingleResourceState[];

	constructor()
	{
		this.resources.push(new SingleResourceState(ResourceType.GAS, 100));
		this.resources.push(new SingleResourceState(ResourceType.GOLD, 100));
	}

	public GetResource(resourceType: ResourceType): SingleResourceState
	{
		return this.resources.find(x => x.resourceType == resourceType);
	}

	public GetAmount(resourceType: ResourceType): number
	{
		return this.GetResource(resourceType).amount;
	}

	public Give(resourceType: ResourceType, amount: number): void
	{
		this.GetResource(resourceType).amount += amount;
	}

	public CanAfford(resourceType: ResourceType, amount: number): boolean
	{
		return this.GetAmount(resourceType) >= amount;
	}

	public Spend(resourceType: ResourceType, amount: number): boolean
	{
		// return false if overspent.
		var resource = this.GetResource(resourceType);
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

		console.log('Failed to find part in inventory: ${part}');
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
		this.parts = this.GenerateInitialOffers();
	}

	public GenerateInitialOffers(): Part[]
	{
		var _part: Part[] = [];
		// todo generate parts.
		return _part;
	}

	public Buy(part: Part): boolean
	{
		const index = this.parts.indexOf(part);
		if (index == -1)
		{
			return false;
		}

		this.parts.splice(index, 1);

		var newPart: Part = new Part();
		newPart.PrimaryResource

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
		this.missions.push(new SingleMissionState(ResourceType.GAS, ResourceType.GOLD));
		this.missions.push(new SingleMissionState(ResourceType.GAS, ResourceType.GOLD));
		this.missions.push(new SingleMissionState(ResourceType.GAS, ResourceType.GOLD));
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