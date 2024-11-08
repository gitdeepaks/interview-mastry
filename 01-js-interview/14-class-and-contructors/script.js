// Class and Contructors in Javascript

class Teacher {
  constructor(name, channel) {
    this.name = name;
    this.channel = channel;
  }

  intro() {
    return `Hello ${this.name}, lets start with ${this.channel}`;
  }
}

const badCoder = new Teacher("Deepak", "badCoder");

badCoder.intro();
