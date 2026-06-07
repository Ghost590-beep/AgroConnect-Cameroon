import db from './src/config/db.js';

(async () => {
  try {
    const rows = await db.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='agrofamily' AND TABLE_NAME='categories'");
    console.log(JSON.stringify(rows, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
})();