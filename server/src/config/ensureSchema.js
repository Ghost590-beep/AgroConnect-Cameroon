import db from "./db.js";
import EnvConfig from "./env.js";

const SCHEMA_COLUMN_CHECKS = [
  {
    name: "description",
    sql: "ALTER TABLE products ADD COLUMN description TEXT",
  },
  {
    name: "stock_quantity",
    sql: "ALTER TABLE products ADD COLUMN stock_quantity INT DEFAULT 0",
  },
  {
    name: "unit",
    sql: "ALTER TABLE products ADD COLUMN unit VARCHAR(50) DEFAULT NULL",
  },
  {
    name: "location",
    sql: "ALTER TABLE products ADD COLUMN location VARCHAR(255) DEFAULT NULL",
  },
  {
    name: "image",
    sql: "ALTER TABLE products ADD COLUMN image VARCHAR(500) DEFAULT NULL",
  },
  {
    name: "status",
    sql: "ALTER TABLE products ADD COLUMN status ENUM('active','sold_out','draft') DEFAULT 'active'",
  },
  {
    name: "min_order",
    sql: "ALTER TABLE products ADD COLUMN min_order INT DEFAULT 0",
  },
];
// Additional checks for categories/subcategories
SCHEMA_COLUMN_CHECKS.push(
  {
    name: "categories.description",
    sql: "ALTER TABLE categories ADD COLUMN description TEXT",
  },
  {
    name: "subcategories.description",
    sql: "ALTER TABLE subcategories ADD COLUMN description TEXT",
  },
);

const columnExists = async (columnIdentifier) => {
  // columnIdentifier may be 'column' or 'table.column' for cross-table checks
  const [maybeTable, maybeColumn] = columnIdentifier.split(".");
  let columnName = columnIdentifier;
  let tableName = 'products';
  if (maybeColumn) {
    tableName = maybeTable;
    columnName = maybeColumn;
  }
  const dbName = EnvConfig.getDbName();
  const rows = await db.query(
    `SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [dbName, tableName, columnName],
  );
  return rows[0]?.count > 0;
};

const ensureSchema = async () => {
  for (const column of SCHEMA_COLUMN_CHECKS) {
    try {
      const exists = await columnExists(column.name);
      if (!exists) {
        await db.query(column.sql);
      }
    } catch (error) {
      console.warn(`Could not ensure column ${column.name}:`, error.message);
    }
  }
};

export default ensureSchema;
