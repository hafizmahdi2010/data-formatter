const { formatData } = require('./index');
const express = require('express');
const app = express();
const port = 3000;

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


app.get('/', (req, res) => {
  try {
    const formattedData = formatData(schema, data);
    res.json(formattedData);
  } catch (error) {
    console.error("Error formatting data:", error.message);
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})



/* Output:
[
  { id: 1, name: "mahdi", isActive: true, meta: { hobbies: ["coding", "music"] } },
  { id: 2, name: "rohan", isActive: false, meta: { hobbies: ["sports", "reading"] } }
]
*/
