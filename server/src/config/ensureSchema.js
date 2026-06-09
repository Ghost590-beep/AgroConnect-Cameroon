import db from "./db.js";
import EnvConfig from "./env.js";

const TABLE_DEFINITIONS = [
  {
    name: "users",
    sql: `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      location VARCHAR(255) DEFAULT 'Cameroon',
      profile_image VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
  },
  {
    name: "user_actions",
    sql: `CREATE TABLE IF NOT EXISTS user_actions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      action ENUM('farmer','buyer','service_provider','admin') NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
  },
  {
    name: "notifications",
    sql: `CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      receives_order_notifications BOOLEAN DEFAULT TRUE,
      receives_promotion_notifications BOOLEAN DEFAULT TRUE,
      receives_newsletter BOOLEAN DEFAULT TRUE,
      receives_sms_notifications BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
  },
  {
    name: "categories",
    sql: `CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    )`,
  },
  {
    name: "subcategories",
    sql: `CREATE TABLE IF NOT EXISTS subcategories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
      UNIQUE(category_id, name)
    )`,
  },
  {
    name: "farmers",
    sql: `CREATE TABLE IF NOT EXISTS farmers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      farm_name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY uniq_farmer_user (user_id)
    )`,
  },
  {
    name: "payment_methods",
    sql: `CREATE TABLE IF NOT EXISTS payment_methods (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      description TEXT
    )`,
  },
  {
    name: "payment_providers",
    sql: `CREATE TABLE IF NOT EXISTS payment_providers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      method_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      FOREIGN KEY (method_id) REFERENCES payment_methods(id) ON DELETE CASCADE,
      UNIQUE(method_id, name)
    )`,
  },
  {
    name: "products",
    sql: `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      category_id INT NOT NULL,
      subcategory_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      stock_quantity INT DEFAULT 0,
      unit VARCHAR(50),
      location VARCHAR(255),
      image VARCHAR(500),
      status ENUM('active','sold_out','draft') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
    )`,
  },
  {
    name: "product_images",
    sql: `CREATE TABLE IF NOT EXISTS product_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      image_url VARCHAR(500) NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )`,
  },
  {
    name: "cart",
    sql: `CREATE TABLE IF NOT EXISTS cart (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )`,
  },
  {
    name: "orders",
    sql: `CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      total_price DECIMAL(10,2),
      payment_method_id INT NOT NULL,
      payment_provider_id INT,
      status ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
      delivery_name VARCHAR(100),
      delivery_phone VARCHAR(20),
      delivery_location VARCHAR(255),
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id),
      FOREIGN KEY (payment_provider_id) REFERENCES payment_providers(id)
    )`,
  },
  {
    name: "order_items",
    sql: `CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      product_id INT NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`,
  },
  {
    name: "escrow_accounts",
    sql: `CREATE TABLE IF NOT EXISTS escrow_accounts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL UNIQUE,
      amount DECIMAL(10,2) NOT NULL,
      status ENUM('holding','released','refunded') DEFAULT 'holding',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    )`,
  },
  {
    name: "reviews",
    sql: `CREATE TABLE IF NOT EXISTS reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      rating INT CHECK(rating BETWEEN 1 AND 5),
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )`,
  },
  {
    name: "favorites",
    sql: `CREATE TABLE IF NOT EXISTS favorites (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      product_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )`,
  },
];

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
  {
    name: "payment_methods.description",
    sql: "ALTER TABLE payment_methods ADD COLUMN description TEXT",
  },
  {
    name: "payment_providers.description",
    sql: "ALTER TABLE payment_providers ADD COLUMN description TEXT",
  },
];

const tableExists = async (tableName) => {
  const dbName = EnvConfig.getDbName();
  const rows = await db.query(
    `SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
    [dbName, tableName],
  );
  return rows[0]?.count > 0;
};

const columnExists = async (columnIdentifier) => {
  const [maybeTable, maybeColumn] = columnIdentifier.split(".");
  let columnName = columnIdentifier;
  let tableName = "products";
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

const ensureTables = async () => {
  for (const table of TABLE_DEFINITIONS) {
    try {
      const exists = await tableExists(table.name);
      if (!exists) {
        await db.query(table.sql);
      }
    } catch (error) {
      console.error(`Could not create table ${table.name}:`, error.message);
      throw error;
    }
  }
};

const ensureSchema = async () => {
  await ensureTables();

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
