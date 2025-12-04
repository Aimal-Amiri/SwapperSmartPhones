
// DataManager class handles all data operations
// Manages loading, storing, and retrieving product data from localStorage
class DataManager {
    constructor() {
        this.products = [];
        this.cartItems = [];
        this.orders = [];
    }

    // Initialize and load data from localStorage or JSON file
    // @returns {Promise<Object>} Loaded product data
    async initialize() {
        let data = JSON.parse(localStorage.getItem('products')) || [];

        if (data === null || data === undefined || data.length === 0 || !data.iphone) {
            data = await this.fetchDataFromFile();
        }

        this.loadProducts(data);
        this.loadCartItems();
        this.loadOrders();

        return data;
    }

    // Fetch product data from JSON file
    // @returns {Promise<Object>}
    async fetchDataFromFile() {
        try {
            const response = await fetch('./assets/data/products.json');
            const data = await response.json();
            localStorage.setItem('products', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('Cannot read file:', error);
            return { iphone: [] };
        }
    }

    // Load products into memory and convert to Product instances
    // @param {Object} data - Data object with product arrays
    loadProducts(data) {
        if (data.iphone) {
            this.products = data.iphone.map(item => Product.fromObject(item));
        }
    }


    // Load cart items from localStorage
    loadCartItems() {
        const cartData = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.cartItems = cartData.map(item => Product.fromObject(item));
    }

    // Load orders from localStorage
    loadOrders() {
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
    }

    // Get all products
    // @returns {Product[]}
    getAllProducts() {
        return this.products;
    }


    // Get product by ID
    // @param {number} id
    // @returns {Product|null}
    getProductById(id) {
        return this.products.find(product => product.id === id) || null;
    }

    // @param {Product[]} products
    // @returns {Product[]}
    getFilteredProducts(products) {
        return products;
    }

    // Get cart items
    getCartItems() {
        return this.cartItems;
    }

     // Add product to cart
     // @param {Product} product
    addToCart(product) {
        // Allow adding product even if exists - CartManager handles deduplication
        this.cartItems.push(product);
        this.saveCartItems();
    }

    // Remove product from cart
    // @param {number} id

    removeFromCart(id) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.saveCartItems();
    }

    //Clear cart
    clearCart() {
        this.cartItems = [];
        this.saveCartItems();
    }

    // Create an order from cart items
    // @returns {Object[]}
    createOrder() {
        const orderItems = this.cartItems.map(item => {
            const product = this.getProductById(item.id);
            return product ? product.getOrderData() : null;
        }).filter(item => item !== null);

        this.orders.push(...orderItems);
        this.saveOrders();
        return orderItems;
    }

    // Get all orders
    // @returns {Object[]}
    getOrders() {
        return this.orders;
    }

    // Save products to localStorage
    saveProducts() {
        const data = { iphone: this.products.map(p => p.toJSON()) };
        localStorage.setItem('products', JSON.stringify(data));
    }

    // Save cart items to localStorage
    saveCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems.map(item => item.toJSON())));
    }

    // Save orders to localStorage

    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    // Update a product
    // @param {number} id
    // @param {Object} updates

    updateProduct(id, updates) {
        const product = this.getProductById(id);
        if (product) {
            Object.assign(product, updates);
            this.saveProducts();
        }
    }

    // Add new product
    // @param {Product} product
    addProduct(product) {
        this.products.push(product);
        this.saveProducts();
    }

    // Remove product
    // @param {number} id
    removeProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
        }
    }
}