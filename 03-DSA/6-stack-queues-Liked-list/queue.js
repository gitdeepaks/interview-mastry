class Queue {
  constructor() {
    this.queue = [];
    this.head = 0;
    this.tail = 0;
    this.maxSize = 100;
  }

  enqueue(item) {
    if (this.isFull()) {
      return false;
    }
    this.queue[this.tail] = item;
    this.tail = (this.tail + 1) % this.maxSize;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const item = this.queue[this.head];
    this.queue[this.head] = null;
    this.head = (this.head + 1) % this.maxSize;
    return item;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.queue[this.head];
  }

  getLength() {
    return (this.tail + this.maxSize - this.head) % this.maxSize;
  }

  isEmpty() {
    return this.head === this.tail;
  }

  isFull() {
    return this.getLength() === this.maxSize;
  }
}

function reverserString(str) {
  const queue = new Queue();

  for (let i = str.length - 1; i >= 0; i--) {
    queue.enqueue(str[i]);
  }
  let reverserString = "";

  while (!queue.isEmpty()) {
    reverserString += queue.dequeue();
  }
  return reverserString;
}

console.log(reverserString("Hello!"));
