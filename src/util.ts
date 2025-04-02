export const capitalize = (s: string) =>
  s
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
