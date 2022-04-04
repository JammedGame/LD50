export { ResourceType, ResourceTypeValues }

enum ResourceType {
    Oil = "oil",
    Lithium = "lithium",
    Platina = "platina",
    Plutonium = "plutonium",
    Gas = "gas",
    Iron = "iron"
}

function ResourceTypeValues(): string[] {
    let Values = [];
    for (let Value in ResourceType) {
        if (isNaN(Number(Value))) {
            Values.push(ResourceType[Value]);
        }
    }
    return Values;
}
