// Spielstatus
let playerName = '';
let playerHealth = 100;
let playerAttack = 10;
let playerDefense = 5;
let playerLevel = 1;
let enemiesDefeated = 0;
let playerPearls = 0;
let currentMonster = {};

const textOutput = document.getElementById('textOutput');
const playerNameDisplay = document.getElementById('playerName');
const playerHealthDisplay = document.getElementById('playerHealth');
const currencyDisplay = document.getElementById('currency');
const startButton = document.getElementById('startButton');
const searchMonsterButton = document.getElementById('searchMonsterButton');
const attackButton1 = document.getElementById('attackButton1');
const attackButton2 = document.getElementById('attackButton2');
const attackButton3 = document.getElementById('attackButton3');
const upgradeAttackButton = document.getElementById('upgradeAttackButton');
const upgradeDefenseButton = document.getElementById('upgradeDefenseButton');
const attackButtons = document.getElementById('attackButtons');
const upgradeButtons = document.getElementById('upgradeButtons');

// Funktion zum Anzeigen von Nachrichten
function displayMessage(message) {
    textOutput.textContent = message; // Setzt den gesamten Text
}

// Funktion zur Aktualisierung der Anzeige der Lebenspunkte und der Perlen
function updateDisplay() {
    playerNameDisplay.textContent = `Name: ${playerName}`;
    playerHealthDisplay.textContent = `Lebenspunkte: ${playerHealth}`;
    currencyDisplay.textContent = `Perlen: ${playerPearls}`;
}

// Funktion zum Starten des Spiels
function startGame() {
    playerName = prompt("Wie heißt du, Abenteurer?");
    if (playerName) {
        playerHealth = 100; // Setze Lebenspunkte auf den Startwert zurück
        playerAttack = 10; // Setze Angriff auf den Startwert zurück
        playerDefense = 5; // Setze Verteidigung auf den Startwert zurück
        playerLevel = 1; // Setze Level auf den Startwert zurück
        enemiesDefeated = 0; // Setze besiegte Gegner zurück
        playerPearls = 0; // Setze Perlen auf den Startwert zurück

        updateDisplay(); // Aktualisiere die Anzeige
        displayMessage(`Willkommen, ${playerName}! Erkunde den Dungeon und kämpfe gegen Monster.`);
        startButton.style.display = 'none';
        searchMonsterButton.style.display = 'block';
        attackButtons.style.display = 'block';
        upgradeButtons.style.display = 'block';
    } else {
        displayMessage('Du musst einen Namen eingeben, um zu spielen.');
    }
}

// Funktion zum Suchen eines Monsters
function searchMonster() {
    const encounterChance = Math.random();
    if (encounterChance < 0.5) {
        const monsterName = ['Goblin', 'Ork', 'Kobold'][Math.floor(Math.random() * 3)];
        const monsterHealth = Math.floor(Math.random() * 50) + 30;
        const monsterAttack = Math.floor(Math.random() * 10) + 5;
        currentMonster = { name: monsterName, health: monsterHealth, attack: monsterAttack };
        displayMessage(`Ein ${monsterName} erscheint! Er hat ${monsterHealth} Lebenspunkte.`);
        displayMonsterStatus();
    } else {
        displayMessage('Du findest nichts Interessantes.');
    }
}

// Funktion zum Anzeigen des Monsterstatus
function displayMonsterStatus() {
    displayMessage(`Der ${currentMonster.name} hat noch ${currentMonster.health} Lebenspunkte.`);
}

// Funktion zum Angreifen des Monsters
function attack(attackType) {
    if (!currentMonster.name) {
        displayMessage('Es gibt keinen Gegner, gegen den du kämpfen kannst.');
        return;
    }

    const attackDamage = {
        'Schlag': playerAttack,
        'Stich': playerAttack * 1.5,
        'Magie': playerAttack * 2
    }[attackType];

    // Spieler greift an
    currentMonster.health -= attackDamage;
    displayMessage(`Du greifst den ${currentMonster.name} mit ${attackType} an und verursachst ${attackDamage} Schaden.`);
    displayMonsterStatus();

    if (currentMonster.health <= 0) {
        enemiesDefeated += 1;
        playerPearls += 10; // Spieler erhält Perlen für den Sieg
        displayMessage(`Du hast den ${currentMonster.name} besiegt! Du erhältst 10 Perlen. Insgesamt: ${playerPearls} Perlen.`);
        updateDisplay(); // Aktualisiere die Anzeige
        currentMonster = {};
        if (enemiesDefeated % 3 === 0) {
            playerLevel += 1;
            playerAttack += 5;
            playerDefense += 2;
            displayMessage(`Du steigst auf Level ${playerLevel} auf! Deine Angriffskraft ist jetzt ${playerAttack} und deine Verteidigung ist jetzt ${playerDefense}.`);
        }
        searchMonster();
    } else {
        // Gegner greift zurück
        const damageTaken = Math.max(0, currentMonster.attack - playerDefense);
        playerHealth -= damageTaken;
        displayMessage(`Der ${currentMonster.name} greift dich an und verursacht ${damageTaken} Schaden. Du hast noch ${playerHealth} Lebenspunkte.`);
        
        if (playerHealth <= 0) {
            displayMessage('Du wurdest besiegt! Spiel beendet.');
            attackButtons.style.display = 'none';
            upgradeButtons.style.display = 'none';
            searchMonsterButton.style.display = 'none';
            startButton.style.display = 'block';
        }
    }
    updateDisplay(); // Aktualisiere die Anzeige
}

// Funktionen zum Upgraden
function upgradeAttack() {
    if (playerPearls >= 50) {
        playerPearls -= 50;
        playerAttack += 10;
        displayMessage(`Dein Angriff wurde verbessert! Deine Angriffskraft ist jetzt ${playerAttack}. Perlen übrig: ${playerPearls}.`);
        updateDisplay(); // Aktualisiere die Anzeige
    } else {
        displayMessage('Nicht genug Perlen für ein Upgrade.');
    }
}

function upgradeDefense() {
    if (playerPearls >= 50) {
        playerPearls -= 50;
        playerDefense += 5;
        displayMessage(`Deine Verteidigung wurde verbessert! Deine Verteidigung ist jetzt ${playerDefense}. Perlen übrig: ${playerPearls}.`);
        updateDisplay(); // Aktualisiere die Anzeige
    } else {
        displayMessage('Nicht genug Perlen für ein Upgrade.');
    }
}

// Event-Listener hinzufügen
startButton.addEventListener('click', startGame);
searchMonsterButton.addEventListener('click', searchMonster);
attackButton1.addEventListener('click', () => attack('Schlag'));
attackButton2.addEventListener('click', () => attack('Stich'));
attackButton3.addEventListener('click', () => attack('Magie'));
upgradeAttackButton.addEventListener('click', upgradeAttack);
upgradeDefenseButton.addEventListener('click', upgradeDefense);