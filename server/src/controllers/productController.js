import db from "../config/db.js";

/* ─────────────────────────────
   CATEGORY + SUBCATEGORY MAPS
───────────────────────────── */
const categoryMap = {
  "Crops & Seeds": 1,
  "Animals": 2,
  "Machines & Tools": 3,
  "Services": 4,
  "Medications": 5,
  "Training": 6,
};

const subcategoryMap = {
  Vegetables: 1,
  Fruits: 2,
  Grains: 3,
  Seeds: 4,
  "Dairy Products": 5,

  Livestock: 6,

  Tractors: 7,
  "Hand Tools": 8,
  "Irrigation Equipment": 9,
  "Harvesting Equipment": 10,

  "Farm Labour": 11,
  Transportation: 12,
  Consultancy: 13,
  "Equipment Rental": 14,

  "Animal Medicine": 15,
  "Crop Protection": 16,
  Supplements: 17,

  "Farming Techniques": 18,
  "Sustainable Agriculture": 19,
  "Market Access": 20,
};


const categoryReverseMap = {
  1: "Crops & Seeds",
  2: "Animals",
  3: "Machines & Tools",
  4: "Services",
  5: "Medications",
  6: "Training",
};

const subcategoryReverseMap = {
  1: "Vegetables",
  2: "Fruits",
  3: "Grains",
  4: "Seeds",
  5: "Dairy Products",
  6: "Livestock",
  7: "Tractors",
  8: "Hand Tools",
  9: "Irrigation Equipment",
  10: "Harvesting Equipment",
  11: "Farm Labour",
  12: "Transportation",
  13: "Consultancy",
  14: "Equipment Rental",
  15: "Animal Medicine",
  16: "Crop Protection",
  17: "Supplements",
  18: "Farming Techniques",
  19: "Sustainable Agriculture",
  20: "Market Access",
};
/* ─────────────────────────────
   CREATE PRODUCT
───────────────────────────── */
export const createProduct = (req, res) => {
console.log("BODY:", req.body);
console.log("FILE:", req.file);
  try {
    const {
  name,
  category,
  subcategory,
  price,
  location,
  description,
  unit,
  stock_quantity,
  min_order
} = req.body;

const image = req.file
  ? `/uploads/products/${req.file.filename}`
  : null;

    const category_id = categoryMap[category];
    const subcategory_id = subcategoryMap[subcategory];

    if (!category_id) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (!subcategory_id) {
      return res.status(400).json({ message: "Invalid subcategory" });
    }

    const sql = `
      INSERT INTO products (
        user_id,
        category_id,
        subcategory_id,
        name,
        description,
        price,
        stock_quantity,
        unit,
        location,
        image,
        min_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    db.query(
      sql,
     [
       req.user.id,
       category_id,
       subcategory_id,
       name,
       description,
       price,
       stock_quantity || 0,
       unit || null,
       location,
       image,
       req.body.min_order || 0
    ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Failed to create product",
          });
        }

        res.status(201).json({
          message: "Product uploaded successfully",
          productId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ─────────────────────────────
   GET PRODUCTS
───────────────────────────── */
export const getProducts = (req, res) => {
  const sql = `
    SELECT
      products.*,
      users.full_name AS farmer
    FROM products
    JOIN users ON products.user_id = users.id
    ORDER BY products.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    const products = result.map((product) => ({
      ...product,
      category: categoryReverseMap[product.category_id] || null,
      subcategory: subcategoryReverseMap[product.subcategory_id] || null,
    }));

    res.json(products);
  });
};