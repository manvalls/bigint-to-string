# bigint-to-string

`bigint-to-string` is a TypeScript utility that provides type-safe conversion of `bigint` values to `string` within objects. This package ensures that all `bigint` values in an object are recursively converted to `string`, while maintaining the original structure and types of the object.

## Installation

You can install this package using npm:

```bash
npm install bigint-to-string
```

Or using yarn:

```bash
yarn add bigint-to-string
```

## Usage

Import the `bigIntToString` function and use it to convert `bigint` values to `string` in your objects:

```typescript
import bigIntToString from "bigint-to-string";

const obj = {
  id: 1n,
  nested: {
    value: 2n,
    array: [3n, 4n],
  },
};

const converted = bigIntToString(obj);

console.log(converted);
// Output:
// {
//   id: "1",
//   nested: {
//     value: "2",
//     array: ["3", "4"]
//   }
// }
```

## Type Safety

The `bigint-to-string` package leverages TypeScript's powerful type system to ensure type safety throughout the conversion process. The `BigIntToString` type recursively transforms all `bigint` values to `string` while preserving the structure and types of the original object.

### Example

Given the following type:

```typescript
type ExampleType = {
  id: bigint;
  nested: {
    value: bigint;
    array: bigint[];
  };
};
```

When using `bigIntToString`, the resulting type will be:

```typescript
type ConvertedType = BigIntToString<ExampleType>;
// {
//   id: string;
//   nested: {
//     value: string;
//     array: string[];
//   };
// }
```

This ensures that your code remains type-safe and that all `bigint` values are correctly converted to `string`.

## API

### `bigIntToString<T>(obj: T): BigIntToString<T>`

Converts all `bigint` values in the given object to `string`.

- **obj**: The object to convert.
- **returns**: A new object with all `bigint` values converted to `string`.

## License

This project is licensed under the MIT License.
