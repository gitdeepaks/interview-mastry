class HashTable {
  constructor(limit = 14) {
    this.storage = [];
    this.limit = limit;
  }

  _hash(key, max) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }

    return hash % max;
  }

  printTable() {
    for (let i = 0; i < this.storage.length; i++) {
      if (this.storage[i] !== undefined) {
        console.log(`Bucket ${i}: ${JSON.stringify(this)}`);
      } else {
        console.log(`Bucket ${i} Empty`);
      }
    }
  }

  set(key, value) {
    const index = this._hash(key, this.limit);

    if (this.storage[index] === undefined) {
      this.storage[index] = [[key, value]];
    } else {
      let inserted = false;

      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          this.storage[index][i][1] === value;

          inserted = true;
        }
      }
      if (inserted === false) {
        this.storage[index].push([key, value]);
      }
    }
  }
}

const myHashTable = new HashTable();

myHashTable.set("Jonny", "555-444-78787");
myHashTable.set("Antonio", "555-344-78789");
myHashTable.set("Deepak", "533-364-79700");
myHashTable.set("Sara", "523-564-79900");
myHashTable.set("Simon", "123-766-89000");

myHashTable.printTable();

// console.log(res);
