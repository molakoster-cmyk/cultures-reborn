// ===============================
// GAME STATE
// ===============================
let gameState = "settlement"; // settlement | combat

// ===============================
// PLAYER
// ===============================
let player = {
  name: "Mountain Warrior",
  health: 100,
  stamina: 100,
  attack: 10,
  defense: 8
};

// ===============================
// ENEMY
// ===============================
let currentEnemy = null;

// ===============================
// UI FUNCTIONS
// ===============================
function updateUI() {
  document.getElementById("charName").textContent = player.name;
  document.getElementById("health").textContent = player.health;
  document.getElementById("stamina").textContent = player.stamina;
  document.getElementById("attack").textContent = player.attack;
  document.getElementById("defense").textContent = player.defense;
}

function log(text) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += text + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

// ===============================
// SETTLEMENT ACTIONS
// ===============================
function train() {
  if (gameState !== "settlement") {
    log("You cannot train during combat.");
    return;
  }

  if (player.stamina < 10) {
    log("Too tired to train.");
    return;
  }

  player.stamina -= 10;
  player.attack += 1;
  log("You train with heavy stone weapons. Attack increased.");

  updateUI();
}

function rest() {
  if (gameState !== "settlement") {
    log("You cannot rest during combat.");
    return;
  }

  player.stamina = Math.min(100, player.stamina + 20);
  player.health = Math.min(100, player.health + 10);

  log("You rest inside the mountain halls.");

  updateUI();
}

// ===============================
// EXPLORATION
// ===============================
function explore() {
  if (gameState !== "settlement") {
    log("You are already facing danger.");
    return;
  }

  if (player.stamina < 15) {
    log("Not enough stamina to explore.");
    return;
  }

  player.stamina -= 15;

  currentEnemy = {
    name: "Mountain Beast",
    health: 40,
    attack: 8,
    defense: 5
  };

  gameState = "combat";
  log("⚔️ A Mountain Beast emerges from the rocks!");

  updateUI();
}

// ===============================
// COMBAT
// ===============================
function attackEnemy() {
  if (gameState !== "combat" || !currentEnemy) {
    log("There is nothing to attack.");
    return;
  }

  let damageToEnemy = Math.max(1, player.attack - currentEnemy.defense);
  let damageToPlayer = Math.max(1, currentEnemy.attack - player.defense);

  currentEnemy.health -= damageToEnemy;
  player.health -= damageToPlayer;

  log(`You strike the ${currentEnemy.name} for ${damageToEnemy} damage.`);
  log(`The ${currentEnemy.name} hits you for ${damageToPlayer} damage.`);

  if (currentEnemy.health <= 0) {
    log(`🏆 You have slain the ${currentEnemy.name}!`);
    currentEnemy = null;
    gameState = "settlement";
  }

  if (player.health <= 0) {
    log("💀 You collapse and are dragged back to the settlement.");
    player.health = 50;
    currentEnemy = null;
    gameState = "settlement";
  }

  updateUI();
}

function retreat() {
  if (gameState !== "combat") {
    log("You are not in combat.");
    return;
  }

  log("You retreat back to the settlement, wounded but alive.");
  player.stamina = Math.max(0, player.stamina - 10);

  currentEnemy = null;
  gameState = "settlement";

  updateUI();
}

// ===============================
// INIT
// ===============================
updateUI();
log("🏔️ The Mountain Folk settlement stands firm among the peaks.");
