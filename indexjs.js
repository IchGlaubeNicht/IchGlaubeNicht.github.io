let bubbleCount = parseInt(localStorage.getItem('bubbleCount')) || 0;
let clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
let autoClickerActive = localStorage.getItem('autoClickerActive') === 'true' || false;
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 10;
const autoClickerCost = 50;
const autoClickerInterval = 1000;
let factoryActive = localStorage.getItem('factoryActive') === 'true' || false;
let factoryCost = parseInt(localStorage.getItem('factoryCost')) || 200;
let factoryProduction = parseInt(localStorage.getItem('factoryProduction')) || 10;
let factoryUpgradeCost = parseInt(localStorage.getItem('factoryUpgradeCost')) || 400;

const bubbleTea = document.getElementById('bubbleTea');
const bubbleCountDisplay = document.getElementById('bubbleCount');
const upgradeButton = document.getElementById('upgradeButton');
const autoClickerButton = document.getElementById('autoClickerButton');
const autoClickerStatus = document.getElementById('autoClickerStatus');
const factoryButton = document.getElementById('factoryButton');
const factoryStatus = document.getElementById('factoryStatus');
const resetButton = document.getElementById('resetButton');

bubbleCountDisplay.textContent = bubbleCount;
upgradeButton.textContent = `Upgrade: +${clickValue} Bubble Tea pro Klick (Kosten: ${upgradeCost})`;

if (autoClickerActive) {
    autoClickerStatus.textContent = 'Auto-Clicker: Aktiviert';
    autoClickerButton.textContent = 'Auto-Clicker: Bereits gekauft';
    startAutoClicker();
}

if (factoryActive) {
    factoryStatus.textContent = 'Fabrik: Aktiviert';
    factoryButton.textContent = `Fabrik upgraden: +${factoryProduction} Bubble Tea pro Sekunde (Kosten: ${factoryUpgradeCost})`;
    startFactory();
}

bubbleTea.addEventListener('click', () => {
    bubbleCount += clickValue;
    bubbleCountDisplay.textContent = bubbleCount;
    saveGame();
    createFallingPearl();
});

function createFallingPearl() {
    const pearl = document.createElement('div');
    pearl.className = 'pearl';
    pearl.style.left = (bubbleTea.offsetLeft + bubbleTea.clientWidth / 2 - 10) + 'px';
    pearl.style.top = bubbleTea.offsetTop + 'px';
    pearl.style.setProperty('--x', (Math.random() - 0.5) * 200);
    document.body.appendChild(pearl);

    pearl.addEventListener('animationend', () => {
        pearl.remove();
    });
}

upgradeButton.addEventListener('click', () => {
    if (bubbleCount >= upgradeCost) {
        bubbleCount -= upgradeCost;
        clickValue += 1;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        bubbleCountDisplay.textContent = bubbleCount;
        upgradeButton.textContent = `Upgrade: +${clickValue} Bubble Tea pro Klick (Kosten: ${upgradeCost})`;
        saveGame();
    } else {
        alert('Nicht genug Bubble Tea für das Upgrade!');
    }
});

autoClickerButton.addEventListener('click', () => {
    if (bubbleCount >= autoClickerCost && !autoClickerActive) {
        bubbleCount -= autoClickerCost;
        bubbleCountDisplay.textContent = bubbleCount;
        autoClickerActive = true;
        autoClickerStatus.textContent = 'Auto-Clicker: Aktiviert';
        autoClickerButton.textContent = 'Auto-Clicker: Bereits gekauft';
        saveGame();
        startAutoClicker();
    }
});

factoryButton.addEventListener('click', () => {
    if (bubbleCount >= factoryCost && !factoryActive) {
        bubbleCount -= factoryCost;
        bubbleCountDisplay.textContent = bubbleCount;
        factoryActive = true;
        factoryStatus.textContent = 'Fabrik: Aktiviert';
        factoryButton.textContent = `Fabrik upgraden: +${factoryProduction} Bubble Tea pro Sekunde (Kosten: ${factoryUpgradeCost})`;
        saveGame();
        startFactory();
    } else if (factoryActive && bubbleCount >= factoryUpgradeCost) {
        bubbleCount -= factoryUpgradeCost;
        factoryProduction += 10;
        factoryUpgradeCost = Math.floor(factoryUpgradeCost * 2);
        bubbleCountDisplay.textContent = bubbleCount;
        factoryButton.textContent = `Fabrik upgraden: +${factoryProduction} Bubble Tea pro Sekunde (Kosten: ${factoryUpgradeCost})`;
        saveGame();
    } else {
        alert('Nicht genug Bubble Tea für die Fabrik oder das Upgrade!');
    }
});

function startAutoClicker() {
    setInterval(() => {
        if (autoClickerActive) {
            bubbleCount += 1;
            bubbleCountDisplay.textContent = bubbleCount;
            saveGame();
        }
    }, autoClickerInterval);
}

function startFactory() {
    setInterval(() => {
        if (factoryActive) {
            bubbleCount += factoryProduction;
            bubbleCountDisplay.textContent = bubbleCount;
            saveGame();
        }
    }, 1000);
}

function saveGame() {
    localStorage.setItem('bubbleCount', bubbleCount);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('autoClickerActive', autoClickerActive);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('factoryActive', factoryActive);
    localStorage.setItem('factoryCost', factoryCost);
    localStorage.setItem('factoryProduction', factoryProduction);
    localStorage.setItem('factoryUpgradeCost', factoryUpgradeCost);
}

resetButton.addEventListener('click', () => {
    if (confirm('Möchtest du wirklich deinen Fortschritt zurücksetzen?')) {
        localStorage.clear();
        location.reload();
    }
});