export type BigIntToString<T> = T extends bigint
  ? string
  : T extends object
  ? BigIntValuesToStrings<T>
  : T;

type BigIntValuesToStrings<T> = {
  [K in keyof T]: BigIntToString<T[K]>;
};

const bigIntToString = <T>(obj: T, base: number = 10): BigIntToString<T> => {
  if (obj instanceof Array) {
    return obj.map(bigIntToString) as any;
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, bigIntToString(value)])
    ) as any;
  }

  if (typeof obj === "bigint") {
    return obj.toString(base) as any;
  }

  return obj as any;
};

export const returnBigIntToString =
  (base: number = 10) =>
  <A extends any[], R>(
    fn: (...args: A) => R
  ): ((...args: A) => BigIntToString<R>) => {
    return (...args: Parameters<typeof fn>): BigIntToString<R> => {
      return bigIntToString(fn(...args), base);
    };
  };

export const asyncReturnBigIntToString =
  (base: number = 10) =>
  <A extends any[], R>(
    fn: (...args: A) => Promise<R>
  ): ((...args: A) => Promise<BigIntToString<R>>) => {
    return async (
      ...args: Parameters<typeof fn>
    ): Promise<BigIntToString<R>> => {
      return bigIntToString(await fn(...args), base);
    };
  };

export const parseBigInt = (str: string, base: number = 10): bigint => {
  if (base === 10) {
    return BigInt(str);
  }

  const chunkSize = 10;

  let result = BigInt(0);

  for (let i = 0; i < str.length; i += chunkSize) {
    const chunk = str.slice(i, i + chunkSize);
    result *= BigInt(base ** chunk.length);
    result += BigInt(parseInt(chunk, base));
  }

  return result;
};

export default bigIntToString;
