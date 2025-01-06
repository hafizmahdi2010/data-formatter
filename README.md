
# Data Formatter Library

A modern and professional library designed to simplify the process of working with SQL-like data structures in Node.js applications. This library helps you convert raw data into structured key-value pairs, supporting various data types such as strings, numbers, booleans, dates, arrays, and objects.



## Features

- Simplifies working with structured data: Convert SQL-like data into easy-to-handle key-value pairs.
- Supports multiple data types: String, number, boolean, date, array, and object.
- User-friendly API: Flexible schema-based approach for defining data types.
- Error handling: Robust validation to ensure data type consistency.


## Installation

To install the library, use npm:

```bash
  npm install data-formatter
```

## Usage
```javascript
const { formatData } = require('data-formatter-library');

const schema = [
    { key: "id", type: "number" },
    { key: "name", type: "string" },
    { key: "isActive", type: "boolean" },
    { key: "meta", type: "object" },
    { key: "tags", type: "array" },
    { key: "createdAt", type: "date" }
];

const data = [
    [1, "mahdi", true, { hobbies: ["coding", "music"] }, ["developer", "tech"], "2025-01-06T12:00:00Z"],
    [2, "rohan", false, { hobbies: ["sports", "reading"] }, ["sports", "reading"], "2025-01-07T15:00:00Z"]
];

try {
    const formattedData = formatData(schema, data);
    console.log(formattedData);
} catch (error) {
    console.error("Error formatting data:", error.message);
}
    

