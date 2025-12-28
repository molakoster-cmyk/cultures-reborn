let player = {
  name: "Mountain Warrior",
  health: 100,
  maxHealth: 100,
  stamina: 100,
  attack: 10,
  defense: 8
};

let enemy = null;
let inCombat = false;

function log(text) {
  document.getElementById("log").innerHTML = text;
}

function updateUI() {
  document.getElementById("charName").textContent = player.name;
  document.getElementById("health").textContent = player.health;
  document.getElementById("stamina").textContent = player.stamina;
  document.getElementById("attack").textContent = player.attack;
  document.getElementById("defense").textContent = player.defense;

  document.getElementById("healthBar").style.width =
    (player.health / player.maxHealth) * 100 + "%";

  if (enemy) {
    document.getElementById("enemyName").textContent = enemy.name;
    document.getElementById("enemyHealth").textContent = enemy.health;
    document.getElementById("enemyHealthBar").style.width =
      (enemy.health / enemy.maxHealth) * 100 + "%";
  }
}

function train() {
  if (inCombat) return log("You cannot train during combat.");
  if (player.stamina < 10) return log("Too tired to train.");

  player.stamina -= 10;
  player.attack += 1;
  log("You train with heavy stone weapons. Attack increased.");
  updateUI();
}

function rest() {
  if (inCombat) return log("You cannot rest during combat.");

  player.stamina = Math.min(100, player.stamina + 25);
  player.health = Math.min(player.maxHealth, player.health + 15);
  log("You rest inside the mountain halls.");
  updateUI();
}

function explore() {
  if (inCombat) return log("You are already facing danger.");
  if (player.stamina < 15) return log("Not enough stamina to explore.");

  player.stamina -= 15;

  enemy = {
    name: "Mountain Beast",
    health: 50,
    maxHealth: 50,
    attack: 8,
    defense: 4
  };

  inCombat = true;
  document.getElementById("enemyBox").classList.remove("hidden");
  document.getElementById("combatActions").classList.remove("hidden");

  log("⚔️ A Mountain Beast emerges from the rocks!");
  updateUI();
}

function attackEnemy() {
  let damageToEnemy = Math.max(1, player.attack - enemy.defense);
  let damageToPlayer = Math.max(0, enemy.attack - player.defense);

  enemy.health -= damageToEnemy;
  player.health -= damageToPlayer;

  log(`You strike for ${damageToEnemy} damage. The beast hits you for ${damageToPlayer}.`);

  if (enemy.health <= 0) {
    endCombat("You defeated the Mountain Beast!");
  } else if (player.health <= 0) {
    player.health = 30;
    endCombat("You collapse and barely escape with your life.");
  }

  updateUI();
}

function defend() {
  let reduced = Math.max(0, enemy.attack - (player.defense * 2));
  player.health -= reduced;

  log(`You defend. The beast deals ${reduced} damage.`);
  updateUI();
}

function retreat() {
  if (Math.random() < 0.6) {
    endCombat("You successfully retreat into the mountains.");
  } else {
    let hit = enemy.attack;
    player.health -= hit;
    log(`Retreat failed! You take ${hit} damage.`);
    updateUI();
  }
}

function endCombat(message) {
  inCombat = false;
  enemy = null;

  document.getElementById("enemyBox").classList.add("hidden");
  document.getElementById("combatActions").classList.add("hidden");

  log(message);
  updateUI();
}

updateUI();
