class GameData {
  constructor() {
    this.xp = 0;
    this.level = 1;
    this.next_level_xp = 20;

    // setInterval(() => {
    //   this.autoIncrementXp();
    // }, 1000);

    PubSub.subscribe("user_click_xp", () => {
      this.autoIncrementXp();
    });
  }

  autoIncrementXp() {
    this.addXp(this.level * 5);
  }

  addXp(amount) {
    this.xp = this.xp + amount;
    this.maybeLevelUp(this.xp);

    PubSub.publish("xp_changed", {
      xp: this.xp,
      next_level_xp: this.next_level_xp,
    });
  }

  maybeLevelUp(xp) {
    if (xp >= this.next_level_xp) {
      this.level += 1;
      // this.next_level_xp = this.next_level_xp * 2 * this.level;
      this.next_level_xp = this.level * 100;

      PubSub.publish("level_up", {
        level: this.level,
        next_level_xp: this.next_level_xp,
      });
    }
  }
}

new GameData();
