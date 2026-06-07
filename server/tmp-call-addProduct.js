import ProductService from './src/services/product.service.js';

(async () => {
  try {
    const product = {
      name: 'Script Product',
      description: 'A test product from script',
      price: '12.5',
      stock_quantity: '10',
      category: 'Fruits',
      subcategory: 'Citrus',
      user_id: 2,
      location: 'TestCity',
      image: null,
      status: 'active',
    };
    const res = await ProductService.addProduct(product);
    console.log('Created product:', res);
  } catch (e) {
    console.error('Error stack:');
    console.error(e.stack);
  } finally {
    process.exit(0);
  }
})();