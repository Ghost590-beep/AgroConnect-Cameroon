import ensureSchema from './src/config/ensureSchema.js';

(async () => {
  try {
    await ensureSchema();
    console.log('ensureSchema executed');
  } catch (e) {
    console.error('ensureSchema failed:', e.stack || e.message);
  } finally {
    process.exit(0);
  }
})();