export function testFunction(name: string) {
  if (name.length > 3) {
    throw new Error("Length too big");
  }
  return name;
}
