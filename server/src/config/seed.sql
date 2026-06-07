USE agrofamily;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255) DEFAULT 'Cameroon',
    profile_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- USER ACTIONS
-- =========================
CREATE TABLE user_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action ENUM('farmer','buyer','service_provider','admin') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- NOTIFICATIONS
-- =========================
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    receives_order_notifications BOOLEAN DEFAULT TRUE,
    receives_promotion_notifications BOOLEAN DEFAULT TRUE,
    receives_newsletter BOOLEAN DEFAULT TRUE,
    receives_sms_notifications BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- CATEGORIES
-- =========================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE,
    UNIQUE(category_id, name)
);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
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

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(id),

    FOREIGN KEY (subcategory_id)
        REFERENCES subcategories(id)
);

-- =========================
-- PRODUCT IMAGES
-- =========================
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- CART
-- =========================
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- PAYMENT METHODS
-- =========================
CREATE TABLE payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- =========================
-- PAYMENT PROVIDERS
-- =========================
CREATE TABLE payment_providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method_id INT NOT NULL,
    provider_name VARCHAR(100) NOT NULL,

    FOREIGN KEY (method_id)
        REFERENCES payment_methods(id)
        ON DELETE CASCADE,

    UNIQUE(method_id, provider_name)
);

-- =========================
-- ORDERS
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    total_price DECIMAL(10,2),

    payment_method_id INT NOT NULL,
    payment_provider_id INT,

    status ENUM(
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled'
    ) DEFAULT 'pending',

    delivery_name VARCHAR(100),
    delivery_phone VARCHAR(20),
    delivery_location VARCHAR(255),

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (payment_method_id)
        REFERENCES payment_methods(id),

    FOREIGN KEY (payment_provider_id)
        REFERENCES payment_providers(id)
);

-- =========================
-- ORDER ITEMS
-- =========================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,

    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
);

-- =========================
-- ESCROW
-- =========================
CREATE TABLE escrow_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL UNIQUE,

    amount DECIMAL(10,2) NOT NULL,

    status ENUM(
        'holding',
        'released',
        'refunded'
    ) DEFAULT 'holding',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);

-- =========================
-- REVIEWS
-- =========================
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    product_id INT NOT NULL,

    rating INT CHECK(rating BETWEEN 1 AND 5),

    comment TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- FAVORITES
-- =========================
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    product_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- INDEXES
-- =========================
CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_products_name
ON products(name);

CREATE INDEX idx_products_status
ON products(status);

CREATE INDEX idx_orders_status
ON orders(status);

CREATE INDEX idx_reviews_rating
ON reviews(rating);USE agrofamily;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255) DEFAULT 'Cameroon',
    profile_image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- USER ACTIONS
-- =========================
CREATE TABLE user_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action ENUM('farmer','buyer','service_provider','admin') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- NOTIFICATIONS
-- =========================
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    receives_order_notifications BOOLEAN DEFAULT TRUE,
    receives_promotion_notifications BOOLEAN DEFAULT TRUE,
    receives_newsletter BOOLEAN DEFAULT TRUE,
    receives_sms_notifications BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- CATEGORIES
-- =========================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE,
    UNIQUE(category_id, name)
);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
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

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(id),

    FOREIGN KEY (subcategory_id)
        REFERENCES subcategories(id)
);

-- =========================
-- PRODUCT IMAGES
-- =========================
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- CART
-- =========================
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- PAYMENT METHODS
-- =========================
CREATE TABLE payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- =========================
-- PAYMENT PROVIDERS
-- =========================
CREATE TABLE payment_providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method_id INT NOT NULL,
    provider_name VARCHAR(100) NOT NULL,

    FOREIGN KEY (method_id)
        REFERENCES payment_methods(id)
        ON DELETE CASCADE,

    UNIQUE(method_id, provider_name)
);

-- =========================
-- ORDERS
-- =========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    total_price DECIMAL(10,2),

    payment_method_id INT NOT NULL,
    payment_provider_id INT,

    status ENUM(
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled'
    ) DEFAULT 'pending',

    delivery_name VARCHAR(100),
    delivery_phone VARCHAR(20),
    delivery_location VARCHAR(255),

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (payment_method_id)
        REFERENCES payment_methods(id),

    FOREIGN KEY (payment_provider_id)
        REFERENCES payment_providers(id)
);

-- =========================
-- ORDER ITEMS
-- =========================
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,

    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
);

-- =========================
-- ESCROW
-- =========================
CREATE TABLE escrow_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL UNIQUE,

    amount DECIMAL(10,2) NOT NULL,

    status ENUM(
        'holding',
        'released',
        'refunded'
    ) DEFAULT 'holding',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);

-- =========================
-- REVIEWS
-- =========================
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    product_id INT NOT NULL,

    rating INT CHECK(rating BETWEEN 1 AND 5),

    comment TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- FAVORITES
-- =========================
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    product_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- INDEXES
-- =========================
CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_products_name
ON products(name);

CREATE INDEX idx_products_status
ON products(status);

CREATE INDEX idx_orders_status
ON orders(status);

CREATE INDEX idx_reviews_rating
ON reviews(rating);