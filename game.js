let player = {
  name: "Mountain Warrior",
  health: 100,
  stamina: 100,
  attack: 10,
  defense: 8
};

let currentEnemy = null;

function updateUI() {
  document.getElementById("charName").textContent = player.name;
  document.getElementById("health").textContent = player.health;
  document.getElementById("stamina").textContent = player.stamina;
  document.getElementById("attack").textContent = player.attack;
  document.getElementById("defense").textContent = player.defense;
}

function log(text) {
  document.getElementById("log").innerHTML = text + "<br>" + document.getElementById("log").innerHTML;
}

function train() {
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
  player.stamina = Math.min(100, player.stamina + 20);
  player.health = Math.min(100, player.health + 10);
  log("You rest inside the mountain halls.");
  updateUI();
}

function explore() {
  if (player.stamina < 15) {
    log("Not enough stamina to explore.");
    return;
  }

  player.stamina -= 15;

  let enemy = {
    name: "Mountain Beast",
    attack: 8,
    defense: 5,
    health: 40
  };

  log("You encounter a Mountain Beast!");

  let damageToEnemy = Math.max(0, player.attack - enemy.defense);
  let damageToPlayer = Math.max(0, enemy.attack - player.defense);

  enemy.health -= damageToEnemy;
  player.health -= damageToPlayer;

  log(`You deal ${damageToEnemy} damage. You receive ${damageToPlayer} damage.`);

  if (player.health <= 0) {
    log("You have fallen in battle...");
    player.health = 50;
  }

  updateUI();
}

updateUI();
