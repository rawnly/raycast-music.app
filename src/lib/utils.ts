export const formatNumber = (num: number, fixed = 1) => {
  if (num < 1e3) return num.toString();
  if (num < 1e6) return (num / 1e3).toFixed(fixed) + "K";
  if (num < 1e9) return (num / 1e6).toFixed(fixed) + "M";

  return (num / 1e9).toFixed(1) + "B";
};

export const getNumberFormat = (n: number) =>
  formatNumber(n, 0).replace(/\d+|\.\d+/g, "");
