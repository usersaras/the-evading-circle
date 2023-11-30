console.log("Game UI Loaded");

class GameUI {
  constructor() {
    this.button = document.getElementById("add-xp");
    this.progressBar = document.getElementById("level-progress");
    this.currentXp = document.getElementById("current-xp");
    this.nextLevelXp = document.getElementById("next-level-xp");
    this.currentLevel = document.getElementById("current-level");
    this.huzzah = document.getElementById("huzzah");

    this.initialButtonWidth = 100;

    this.button.addEventListener("click", () => {
      PubSub.publish("user_click_xp");
    });

    this.instantiateButton();
    this.buttonGoesCrazy();

    PubSub.subscribe("xp_changed", (tag, data) => {
      this.updateProgressBar(data.xp, data.next_level_xp);
      this.updateCurrentXp(data.xp);
    });

    PubSub.subscribe("level_up", (tag, data) => {
      this.updateCurrentLevel(data.level);
      this.updateNextLevelXp(data.next_level_xp);
      this.showHuzzaz();
      this.increaseButtonSpeed(data.level);
    });
  }

  instantiateButton() {
    this.button.style.height = this.initialButtonWidth + "px";
    this.button.style.width = this.initialButtonWidth + "px";
  }

  increaseButtonSpeed(level) {
    const wh = `${
      this.initialButtonWidth - ((level * 10) / 100) * this.initialButtonWidth
    }px`;

    this.button.style.width = wh;
    this.button.style.height = wh;
    this.button.style.transition = `${8 / level}s`;
  }

  updateCurrentXp(xp) {
    this.currentXp.innerHTML = xp;
  }

  updateProgressBar(xp, next_level_xp) {
    this.progressBar.style.width = (xp / next_level_xp) * 100 + "%";
  }

  updateCurrentLevel(level) {
    this.currentLevel.innerHTML = level;
  }

  updateNextLevelXp(xp) {
    this.nextLevelXp.innerHTML = xp;
  }

  buttonGoesCrazy() {
    setInterval(() => {
      this.button.style.top = generateRandomCoordinates();
      this.button.style.bottom = generateRandomCoordinates();
      this.button.style.left = generateRandomCoordinates();
      this.button.style.right = generateRandomCoordinates();
    }, 300);
  }

  showHuzzaz() {
    this.huzzah.style.opacity = 1;
    setTimeout(() => {
      this.huzzah.style.opacity = 0;
    }, 2000);
  }
}

function generateRandomCoordinates() {
  return Math.floor(Math.random() * (95 - 5 + 1) + 5) + "%";
}

new GameUI();
