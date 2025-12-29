let player = {
  health: 100,
  stamina: 100,
  attack: 10,
  defense: 8
};

let settlement = {
  pop: 5,
  workers: 3,
  wood: 20,
  stone: 10,
  food: 20
};

let enemy = null;
let defending = false;

function log(text) {
  document.getElementById("log").innerHTML += text + "<br>";
}

function updateUI() {
  health.textContent = player.health;
  stamina.textContent = player.stamina;
  attack.textContent = player.attack;
  defense.textContent = player.defense;

  healthBar.style.width = player.health + "%";

  pop.textContent = settlement.pop;
  workers.textContent = settlement.workers;
  wood.textContent = settlement.wood;
  stone.textContent = settlement.stone;
  food.textContent = settlement.food;

  if (enemy) {
    combatPanel.style.display = "block";
    enemyHp.textContent = enemy.hp;
    enemyBar.style.width = (enemy.hp / enemy.maxHp) * 100 + "%";
  } else {
    combatPanel.style.display = "none";
  }
}

function train() {
  if (settlement.food < 5) return log("Not enough food.");
  settlement.food -= 5;
  player.attack += 1;
  log("You train warriors. Attack +1.");
  updateUI();
}

function rest() {
  player.stamina = Math.min(100, player.stamina + 30);
  player.health = Math.min(100, player.health + 20);
  settlement.food -= 2;
  log("You rest in the longhouse.");
  updateUI();
}

function explore() {
  if (enemy) return log("You are already in combat!");
  if (player.stamina < 10) return log("Too tired to explore.");

  player.stamina -= 10;

  if (Math.random() < 0.6) {
    enemy = {
      hp: 30,
      maxHp: 30,
      attack: 10,
      defense: 5
    };
    log("🐺 A mountain beast attacks!");
  } else {
    settlement.wood += 5;
    settlement.stone += 3;
    log("You gather resources in the wilds.");
  }
  updateUI();
}

function attackEnemy() {
  if (!enemy) return;

  let dmgToEnemy = Math.max(1, player.attack - enemy.defense);
  let dmgToPlayer = Math.max(1, enemy.attack - (defending ? player.defense * 2 : player.defense));

  enemy.hp -= dmgToEnemy;
  player.health -= dmgToPlayer;
  defending = false;

  log(`You deal ${dmgToEnemy}. Enemy hits you for ${dmgToPlayer}.`);

  if (enemy.hp <= 0) {
    let loot = randomLoot();
    if (loot.attack) player.attack += loot.attack;
    if (loot.defense) player.defense += loot.defense;
    log(`Enemy defeated! Looted ${loot.name}.`);
    enemy = null;
  }

  if (player.health <= 0) {
    log("You fall in battle and lose supplies.");
    player.health = 50;
    settlement.food = Math.max(0, settlement.food - 10);
    enemy = null;
  }

  updateUI();
}

function defend() {
  defending = true;
  log("You brace for impact.");
}

function retreat() {
  log("You retreat to the settlement.");
  enemy = null;
  updateUI();
}

updateUI();
