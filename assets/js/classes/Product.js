// Product class represents a single product item
// Contains all product data and methods to manage product state
class Product {
    constructor(id, name, model, storage, color, amount, price, img) {
        this.id = id;
        this.name = name;
        this.model = model;
        this.storage = storage;
        this.color = color;
        this.amount = amount;
        this.price = price;
        this.img = img;
        this.maxAmount = amount;
    }


    // Update the amount of this product
    // @param {number} change - Amount to add or subtract (use -1 to add to cart, 1 to remove)
    updateAmount(change) {
        this.amount = Math.max(0, this.amount + change);
    }


    // Reset maxAmount to current amount value
    setMaxAmount() {
        this.maxAmount = parseInt(this.amount);
    }

    // Get order data for this product
    // Calculates how many units were ordered
    // @returns {Object} Order object with all necessary product information
    getOrderData() {
        return {
            id: this.id,
            img: this.img,
            name: this.name,
            model: this.model,
            storage: this.storage,
            color: this.color,
            amount: this.maxAmount - this.amount,
            price: this.price,
            date: new Date(),
        };
    }


    // Convert product to plain object for storage
    // @returns {Object}
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            model: this.model,
            storage: this.storage,
            color: this.color,
            amount: this.amount,
            price: this.price,
            img: this.img,
            maxAmount: this.maxAmount,
        };
    }


    // Create Product instance from plain object
    // @param {Object} obj
    // @returns {Product}
    static fromObject(obj) {
        const product = new Product(
            obj.id,
            obj.name,
            obj.model,
            obj.storage,
            obj.color,
            obj.amount,
            obj.price,
            obj.img
        );
        if (obj.maxAmount) {
            product.maxAmount = obj.maxAmount;
        }
        return product;
    }
}