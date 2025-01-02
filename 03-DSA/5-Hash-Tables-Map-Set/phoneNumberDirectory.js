function phoneNumberDirectory(phoneNumbers) {
  const dir = new Map();

  for (const entry of phoneNumbers) {
    const [name, phoneNumber] = entry.split(":");

    dir.set(name, phoneNumber);
  }

  return dir;
}

console.log(
  phoneNumberDirectory([
    "Antonio:123-123-4548",
    "Brandon:123-123-4148",
    "Hitesh:123-123-7978",
  ])
);
