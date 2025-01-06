/**
 * Format data into key-value pairs based on the provided schema and handle various data types
 * @param {Array} schema - Array of objects describing the format [{ key: "id", type: "string" }, ...]
 * @param {Array} data - Array of arrays containing data to be formatted [[1, "mahdi", 14], ...]
 * @returns {Array} - Formatted data as an array of objects with various data types handled
 */
function formatData(schema, data) {
  if (!Array.isArray(schema) || !Array.isArray(data)) {
      throw new Error("Both schema and data should be arrays.");
  }

  const flattenObject = (obj) => {
      return Object.keys(obj).reduce((acc, key) => {
          if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
              Object.assign(acc, flattenObject(obj[key]));
          } else {
              acc[key] = obj[key];
          }
          return acc;
      }, {});
  };

  return data.map((row, rowIndex) => {
      if (!Array.isArray(row)) {
          throw new Error(`Each data row should be an array. Issue at row ${rowIndex}`);
      }

      let formattedObject = {};
      schema.forEach((field, index) => {
          if (!field.key || !field.type) {
              throw new Error("Each schema object must have 'key' and 'type' properties.");
          }

          let value = row[index];
          // Convert value to the specified type
          switch (field.type) {
              case "number":
                  value = Number(value);
                  if (isNaN(value)) {
                      throw new Error(
                          `Invalid value for type 'number' at row ${rowIndex}, index ${index}`
                      );
                  }
                  break;

              case "string":
                  value = String(value);
                  break;

              case "boolean":
                  value = Boolean(value);
                  break;

              case "date":
                  value = new Date(value);
                  if (isNaN(value.getTime())) {
                      throw new Error(`Invalid date format at row ${rowIndex}, index ${index}`);
                  }
                  break;

              case "array":
                  value = Array.isArray(value) ? value : [value];
                  break;

              case "object":
                  value = typeof value === "object" ? value : {};
                  break;

              case "any":
                  // Keep the original value as is
                  break;

              default:
                  throw new Error(`Unsupported type '${field.type}' in schema.`);
          }

          formattedObject[field.key] = value;
      });

      // Flatten any nested objects in the meta field
      if (formattedObject.meta && typeof formattedObject.meta === "object") {
          formattedObject.meta = flattenObject(formattedObject.meta);
      }

      return formattedObject;
  });
}

module.exports = {
  formatData
};
