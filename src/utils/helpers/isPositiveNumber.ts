function isPositiveNumber(str: string): boolean {
  return /^(\d+\.\d+|\.\d+|\d+)$/.test(str) && parseFloat(str) > 0;
}

export default isPositiveNumber;
