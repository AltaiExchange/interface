import { formatUnits, parseUnits } from "viem";

export function FormatDecimalsAsEth(value: string, decimals: number): string {
  const bigValue = parseUnits(value, decimals);
  const multipliedValue = bigValue / BigInt(10 ** decimals);
  const formattedValue = formatUnits(multipliedValue, decimals);
  return formattedValue;
}
export function GenerateRandomAnimation() {
  const animations = [
    "token-rise",
    "token-fall",
    "token-drift-left",
    "token-drift-right",
  ];
  const randomAnim = animations[Math.floor(Math.random() * animations.length)];
  return randomAnim;
}

export function NumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function FormatAddressDesign(
  address: string | `0x${string}`,
  startChars = 6,
  endChars = 6
) {
  if (address.length <= startChars + endChars) {
    return address;
  }

  const visiblePart =
    address.substring(0, startChars) +
    "..." +
    address.substring(address.length - endChars);
  return visiblePart;
}

export function CapitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function HelperConvertToUint(
  price: number,
  expo: number,
  targetDecimals: number
): bigint {
  if (price < 0 || expo > 0 || expo < -255) {
    throw new Error("Invalid price or expo value");
  }
  const priceDecimals: number = -expo;

  if (targetDecimals >= priceDecimals) {
    return BigInt(price) * BigInt(10 ** (targetDecimals - priceDecimals));
  } else {
    return BigInt(price) / BigInt(10 ** (priceDecimals - targetDecimals));
  }
}

export function HelperDecimalsConverter(
  amount: number,
  fromDecimals: number,
  toDecimals: number
): number {
  let convertedAmount: number;

  if (fromDecimals > toDecimals) {
    convertedAmount =
      Number(amount) / Number(10 ** (fromDecimals - toDecimals));
  } else {
    convertedAmount =
      Number(amount) * Number(10 ** (toDecimals - fromDecimals));
  }

  return convertedAmount;
}
