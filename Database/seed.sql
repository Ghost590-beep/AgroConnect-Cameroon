-- =========================================================
-- AgroConnect Cameroon — database schema + seed data
--
-- Rewritten to a minimal 3-table schema that matches exactly
-- what the frontend consumes (auth, products, user profile).
-- Category/subcategory are plain strings on products, not a
-- separate normalized table — the frontend never sends or
-- expects category IDs, only free-text names.
--
-- `orders` is intentionally kept as a real table with zero
-- seed rows: the frontend has no order-creation flow (checkout
-- is client-side/localStorage only), so this table has no
-- writer today. It exists so GET /api/user/orders and the
-- orders_completed/total_earnings stats have one honest,
-- testable code path instead of a hardcoded empty response.
-- =========================================================

DROP DATABASE IF EXISTS agroconnect;
CREATE DATABASE agroconnect
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE agroconnect;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    location VARCHAR(255) DEFAULT 'Cameroon',
    profile_image LONGTEXT, -- stores a base64 data URI, not just a path — needs more than VARCHAR(500)
    notification_prefs JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(50),
    min_order INT DEFAULT 1,
    location VARCHAR(255),
    image VARCHAR(500),
    status ENUM('active','draft') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_user ON products(user_id);

-- =========================
-- ORDERS (read-only surface today — see header note)
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- =========================================================
-- SEED DATA
-- =========================================================

-- Sample login password for BOTH seeded users: Password123!
INSERT INTO users (full_name, email, password, phone, location) VALUES
('Jane Doe', 'jane.farmer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237677414252', 'Yaounde'),
('John Buyer', 'john.buyer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237691234567', 'Douala');

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Cassava', 'Crops & Seeds', 'Tubers', 'Fresh cassava available in bulk quantity', 5000.00, 10, 'bag', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Banana', 'Crops & Seeds', 'Grains', 'Ripe bananas, sold by the bunch', 1000.00, 20, 'bunch', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Milk', 'Animals', 'Dairy', 'Fresh cow milk, sold by the litre', 2000.00, 10, 'litre', 1, 'Yaounde', 'draft'
FROM users WHERE email = 'jane.farmer@example.com';

-- No seed rows in `orders` — deliberately empty, see header note.
-- =========================================================
-- AgroConnect Cameroon — database schema + seed data
--
-- Rewritten to a minimal 3-table schema that matches exactly
-- what the frontend consumes (auth, products, user profile).
-- Category/subcategory are plain strings on products, not a
-- separate normalized table — the frontend never sends or
-- expects category IDs, only free-text names.
--
-- `orders` is intentionally kept as a real table with zero
-- seed rows: the frontend has no order-creation flow (checkout
-- is client-side/localStorage only), so this table has no
-- writer today. It exists so GET /api/user/orders and the
-- orders_completed/total_earnings stats have one honest,
-- testable code path instead of a hardcoded empty response.
-- =========================================================

DROP DATABASE IF EXISTS agroconnect;
CREATE DATABASE agroconnect
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE agroconnect;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    location VARCHAR(255) DEFAULT 'Cameroon',
    profile_image LONGTEXT, -- stores a base64 data URI, not just a path — needs more than VARCHAR(500)
    notification_prefs JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(50),
    min_order INT DEFAULT 1,
    location VARCHAR(255),
    image VARCHAR(500),
    status ENUM('active','draft') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_user ON products(user_id);

-- =========================
-- ORDERS (read-only surface today — see header note)
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- =========================================================
-- SEED DATA
-- =========================================================

-- Sample login password for BOTH seeded users: Password123!
INSERT INTO users (full_name, email, password, phone, location) VALUES
('Jane Doe', 'jane.farmer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237677414252', 'Yaounde'),
('John Buyer', 'john.buyer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237691234567', 'Douala');

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Cassava', 'Crops & Seeds', 'Tubers', 'Fresh cassava available in bulk quantity', 5000.00, 10, 'bag', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Banana', 'Crops & Seeds', 'Grains', 'Ripe bananas, sold by the bunch', 1000.00, 20, 'bunch', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Milk', 'Animals', 'Dairy', 'Fresh cow milk, sold by the litre', 2000.00, 10, 'litre', 1, 'Yaounde', 'draft'
FROM users WHERE email = 'jane.farmer@example.com';

-- No seed rows in `orders` — deliberately empty, see header note.
-- =========================================================
-- AgroConnect Cameroon — database schema + seed data
--
-- Rewritten to a minimal 3-table schema that matches exactly
-- what the frontend consumes (auth, products, user profile).
-- Category/subcategory are plain strings on products, not a
-- separate normalized table — the frontend never sends or
-- expects category IDs, only free-text names.
--
-- `orders` is intentionally kept as a real table with zero
-- seed rows: the frontend has no order-creation flow (checkout
-- is client-side/localStorage only), so this table has no
-- writer today. It exists so GET /api/user/orders and the
-- orders_completed/total_earnings stats have one honest,
-- testable code path instead of a hardcoded empty response.
-- =========================================================

DROP DATABASE IF EXISTS agroconnect;
CREATE DATABASE agroconnect
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE agroconnect;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    location VARCHAR(255) DEFAULT 'Cameroon',
    profile_image LONGTEXT, -- stores a base64 data URI, not just a path — needs more than VARCHAR(500)
    notification_prefs JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(50),
    min_order INT DEFAULT 1,
    location VARCHAR(255),
    image VARCHAR(500),
    status ENUM('active','draft') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_user ON products(user_id);

-- =========================
-- ORDERS (read-only surface today — see header note)
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- =========================================================
-- SEED DATA
-- =========================================================

-- Sample login password for BOTH seeded users: Password123!
INSERT INTO users (full_name, email, password, phone, location) VALUES
('Jane Doe', 'jane.farmer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237677414252', 'Yaounde'),
('John Buyer', 'john.buyer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237691234567', 'Douala');

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Cassava', 'Crops & Seeds', 'Tubers', 'Fresh cassava available in bulk quantity', 5000.00, 10, 'bag', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Banana', 'Crops & Seeds', 'Grains', 'Ripe bananas, sold by the bunch', 1000.00, 20, 'bunch', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Milk', 'Animals', 'Dairy', 'Fresh cow milk, sold by the litre', 2000.00, 10, 'litre', 1, 'Yaounde', 'draft'
FROM users WHERE email = 'jane.farmer@example.com';

-- No seed rows in `orders` — deliberately empty, see header note.
-- =========================================================
-- AgroConnect Cameroon — database schema + seed data
--
-- Rewritten to a minimal 3-table schema that matches exactly
-- what the frontend consumes (auth, products, user profile).
-- Category/subcategory are plain strings on products, not a
-- separate normalized table — the frontend never sends or
-- expects category IDs, only free-text names.
--
-- `orders` is intentionally kept as a real table with zero
-- seed rows: the frontend has no order-creation flow (checkout
-- is client-side/localStorage only), so this table has no
-- writer today. It exists so GET /api/user/orders and the
-- orders_completed/total_earnings stats have one honest,
-- testable code path instead of a hardcoded empty response.
-- =========================================================

DROP DATABASE IF EXISTS agroconnect;
CREATE DATABASE agroconnect
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE agroconnect;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    location VARCHAR(255) DEFAULT 'Cameroon',
    profile_image LONGTEXT, -- stores a base64 data URI, not just a path — needs more than VARCHAR(500)
    notification_prefs JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(50),
    min_order INT DEFAULT 1,
    location VARCHAR(255),
    image VARCHAR(500),
    status ENUM('active','draft') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_user ON products(user_id);

-- =========================
-- ORDERS (read-only surface today — see header note)
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- =========================================================
-- SEED DATA
-- =========================================================

-- Sample login password for BOTH seeded users: Password123!
INSERT INTO users (full_name, email, password, phone, location) VALUES
('Jane Doe', 'jane.farmer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237677414252', 'Yaounde'),
('John Buyer', 'john.buyer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237691234567', 'Douala');

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Cassava', 'Crops & Seeds', 'Tubers', 'Fresh cassava available in bulk quantity', 5000.00, 10, 'bag', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Banana', 'Crops & Seeds', 'Grains', 'Ripe bananas, sold by the bunch', 1000.00, 20, 'bunch', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Milk', 'Animals', 'Dairy', 'Fresh cow milk, sold by the litre', 2000.00, 10, 'litre', 1, 'Yaounde', 'draft'
FROM users WHERE email = 'jane.farmer@example.com';

-- No seed rows in `orders` — deliberately empty, see header note.
-- =========================================================
-- AgroConnect Cameroon — database schema + seed data
--
-- Rewritten to a minimal 3-table schema that matches exactly
-- what the frontend consumes (auth, products, user profile).
-- Category/subcategory are plain strings on products, not a
-- separate normalized table — the frontend never sends or
-- expects category IDs, only free-text names.
--
-- `orders` is intentionally kept as a real table with zero
-- seed rows: the frontend has no order-creation flow (checkout
-- is client-side/localStorage only), so this table has no
-- writer today. It exists so GET /api/user/orders and the
-- orders_completed/total_earnings stats have one honest,
-- testable code path instead of a hardcoded empty response.
-- =========================================================

DROP DATABASE IF EXISTS agroconnect;
CREATE DATABASE agroconnect
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE agroconnect;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    location VARCHAR(255) DEFAULT 'Cameroon',
    profile_image LONGTEXT, -- stores a base64 data URI, not just a path — needs more than VARCHAR(500)
    notification_prefs JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(50),
    min_order INT DEFAULT 1,
    location VARCHAR(255),
    image VARCHAR(500),
    status ENUM('active','draft') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_user ON products(user_id);

-- =========================
-- ORDERS (read-only surface today — see header note)
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- =========================================================
-- SEED DATA
-- =========================================================

-- Sample login password for BOTH seeded users: Password123!
INSERT INTO users (full_name, email, password, phone, location) VALUES
('Jane Doe', 'jane.farmer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237677414252', 'Yaounde'),
('John Buyer', 'john.buyer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237691234567', 'Douala');

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Cassava', 'Crops & Seeds', 'Tubers', 'Fresh cassava available in bulk quantity', 5000.00, 10, 'bag', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Banana', 'Crops & Seeds', 'Grains', 'Ripe bananas, sold by the bunch', 1000.00, 20, 'bunch', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Milk', 'Animals', 'Dairy', 'Fresh cow milk, sold by the litre', 2000.00, 10, 'litre', 1, 'Yaounde', 'draft'
FROM users WHERE email = 'jane.farmer@example.com';

-- No seed rows in `orders` — deliberately empty, see header note.
-- =========================================================
-- AgroConnect Cameroon — database schema + seed data
--
-- Rewritten to a minimal 3-table schema that matches exactly
-- what the frontend consumes (auth, products, user profile).
-- Category/subcategory are plain strings on products, not a
-- separate normalized table — the frontend never sends or
-- expects category IDs, only free-text names.
--
-- `orders` is intentionally kept as a real table with zero
-- seed rows: the frontend has no order-creation flow (checkout
-- is client-side/localStorage only), so this table has no
-- writer today. It exists so GET /api/user/orders and the
-- orders_completed/total_earnings stats have one honest,
-- testable code path instead of a hardcoded empty response.
-- =========================================================

DROP DATABASE IF EXISTS agroconnect;
CREATE DATABASE agroconnect
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE agroconnect;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    location VARCHAR(255) DEFAULT 'Cameroon',
    profile_image LONGTEXT, -- stores a base64 data URI, not just a path — needs more than VARCHAR(500)
    notification_prefs JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    unit VARCHAR(50),
    min_order INT DEFAULT 1,
    location VARCHAR(255),
    image VARCHAR(500),
    status ENUM('active','draft') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_user ON products(user_id);

-- =========================
-- ORDERS (read-only surface today — see header note)
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50),
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- =========================================================
-- SEED DATA
-- =========================================================

-- Sample login password for BOTH seeded users: Password123!
INSERT INTO users (full_name, email, password, phone, location) VALUES
('Jane Doe', 'jane.farmer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237677414252', 'Yaounde'),
('John Buyer', 'john.buyer@example.com', '$2b$10$kIERxrL9pwYJYQ2pAdXrRuwOV6gdtxpUxiMnuAZkALiQV5s0Dx/I.', '+237691234567', 'Douala');

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Cassava', 'Crops & Seeds', 'Tubers', 'Fresh cassava available in bulk quantity', 5000.00, 10, 'bag', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Banana', 'Crops & Seeds', 'Grains', 'Ripe bananas, sold by the bunch', 1000.00, 20, 'bunch', 1, 'Yaounde', 'active'
FROM users WHERE email = 'jane.farmer@example.com';

INSERT INTO products (user_id, name, category, subcategory, description, price, stock_quantity, unit, min_order, location, status)
SELECT id, 'Milk', 'Animals', 'Dairy', 'Fresh cow milk, sold by the litre', 2000.00, 10, 'litre', 1, 'Yaounde', 'draft'
FROM users WHERE email = 'jane.farmer@example.com';

-- No seed rows in `orders` — deliberately empty, see header note.