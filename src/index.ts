export type BigIntToString<T> = T extends bigint
  ? string
  : T extends object
  ? BigIntValuesToStrings<T>
  : T;

type BigIntValuesToStrings<T> = {
  [K in keyof T]: BigIntToString<T[K]>;
};

const bigIntToString = <T>(obj: T): BigIntToString<T> => {
  if (obj instanceof Array) {
    return obj.map(bigIntToString) as any;
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, bigIntToString(value)])
    ) as any;
  }

  if (typeof obj === "bigint") {
    return obj.toString() as any;
  }

  return obj as any;
};

export default bigIntToString;
