class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(data) {
    const node = new Node(data);

    if (this.head === null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
  }

  get(index) {
    let current = this.head;

    let i = 0;

    while (i < index) {
      current = current.next;
      i++;
    }
    return current.data;
  }
  printAll() {
    let current = this.head;
    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }

  insertAt(index, data) {
    if (index === 0) {
      const node = new Node(data);
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let prev = null;
      let i = 0;

      while (i < index) {
        prev = current;
        current = current.next;
        i++;
      }
      const node = new Node(data);
      node.next = current;
      prev.next = node;
    }
  }
  removeFrom(index) {
    if (index === 0) {
      this.head = this.head.next;
    } else {
      let current = this.head;
      let prev = null;
      let i = 0;

      while (i < index) {
        prev = current;
        current = current.next;
        i++;
      }
      prev.next = current.next;
    }
  }
}

module.exports = { Node, LinkedList };

const list = new LinkedList();

list.add(100);
list.add(200);
list.add(300);
list.add(400);
list.insertAt(1, "a");
list.insertAt(3, "b");
list.removeFrom(3);

list.printAll();
