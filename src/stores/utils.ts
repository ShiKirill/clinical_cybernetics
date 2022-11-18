export const Round = (value: number, digits = 0) => {
  const m = 10 ** digits;
  return Math.round((value + Number.EPSILON) * m) / m;
};
