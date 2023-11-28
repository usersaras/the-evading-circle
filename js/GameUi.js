console.log("Game UI Loaded");

class GameUI {
  constructor() {
    this.button = document.getElementById("add-xp");
    this.progressBar = document.getElementById("level-progress");
    this.currentXp = document.getElementById("current-xp");
    this.nextLevelXp = document.getElementById("next-level-xp");
    this.currentLevel = document.getElementById("current-level");
    this.huzzah = document.getElementById("huzzah");

    this.button.addEventListener("click", () => {
      PubSub.publish("user_click_xp");
    });

    PubSub.subscribe("xp_changed", (tag, data) => {
      this.updateProgressBar(data.xp, data.next_level_xp);
      this.updateCurrentXp(data.xp);
    });

    PubSub.subscribe("level_up", (tag, data) => {
      this.updateCurrentLevel(data.level);
      this.updateNextLevelXp(data.next_level_xp);
      this.showHuzzaz();
    });
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

  showHuzzaz() {
    this.huzzah.style.opacity = 1;
    setTimeout(() => {
      this.huzzah.style.opacity = 0;
    }, 2000);
  }
}

new GameUI();
