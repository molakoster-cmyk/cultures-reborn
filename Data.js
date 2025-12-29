const lootTable = [
  { name: "Stone Axe", attack: 2 },
  { name: "Iron Sword", attack: 4 },
  { name: "Leather Armor", defense: 2 },
  { name: "Steel Shield", defense: 3 }
];

function randomLoot() {
  return lootTable[Math.floor(Math.random() * lootTable.length)];
}
