// CartManager class handles shopping cart logic
// Manages cart operations and order creation
class CartManager {
    constructor(dataManager, uiRenderer) {
        this.dataManager = dataManager;
        this.uiRenderer = uiRenderer;
    }

    addToCart(productId, quantity = 1) {
        const product = this.dataManager.getProductById(productId);
        if (product && quantity > 0 && quantity <= product.amount) {
            // Check if product already in cart
            const cartItems = this.dataManager.getCartItems();
            const existingItem = cartItems.find(item => item.id === productId);

            if (existingItem) {
                // If already in cart, increase quantity
                existingItem.quantity = (existingItem.quantity || 1) + quantity;
            } else {
                // If new item, create copy with quantity
                const cartItem = new Product(
                    product.id,
                    product.name,
                    product.model,
                    product.storage,
                    product.color,
                    product.amount,
                    product.price,
                    product.img
                );
                cartItem.quantity = quantity;
                cartItem.maxAmount = product.amount; // Store max available
                this.dataManager.addToCart(cartItem);
            }

            // Update product amount in products array
            product.updateAmount(-quantity);
            this.dataManager.updateProduct(productId, { amount: product.amount });

            // Refresh cart display
            this.renderCart();
        }
    }

    updateCartQuantity(productId, newQuantity) {
        const cartItems = this.dataManager.getCartItems();
        const cartItem = cartItems.find(item => item.id === productId);
        const product = this.dataManager.getProductById(productId);

        if (cartItem && product && newQuantity > 0 && newQuantity <= cartItem.maxAmount) {
            const oldQuantity = cartItem.quantity || 1;
            const difference = newQuantity - oldQuantity;

            // Update product availability
            product.updateAmount(-difference);
            this.dataManager.updateProduct(productId, { amount: product.amount });

            // Update cart item quantity
            cartItem.quantity = newQuantity;
            this.dataManager.saveCartItems();
            this.renderCart();
        }
    }

    renderCart() {
        const cartItems = this.dataManager.getCartItems();
        this.uiRenderer.renderCartItems(cartItems);
        this.updateCartDisplay();
        this.attachCartEventListeners();
    }

    attachCartEventListeners() {
        // Quantity input change
        document.querySelectorAll('input[data-type="cart-quantity"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const newQuantity = Math.max(1, Math.min(50, parseInt(e.target.value) || 1));
                this.updateCartQuantity(productId, newQuantity);
            });
        });

        // Remove from cart
        document.querySelectorAll('button[data-action="removeFromCart"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(btn.dataset.id);
                this.removeFromCart(productId);
            });
        });
    }

    removeFromCart(productId) {
        const cartItems = this.dataManager.getCartItems();
        const cartItem = cartItems.find(item => item.id === productId);
        const product = this.dataManager.getProductById(productId);

        if (cartItem && product) {
            // Return the quantity back to product availability
            const quantity = cartItem.quantity || 1;
            product.updateAmount(quantity);
            this.dataManager.removeFromCart(productId);
            this.dataManager.updateProduct(productId, { amount: product.amount });
            this.renderCart();
        }
    }

    updateCartDisplay() {
        const cartItems = this.dataManager.getCartItems();
        const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        this.uiRenderer.updateNotification(totalItems);
    }

    checkout() {
        const cartItems = this.dataManager.getCartItems();
        const orders = JSON.parse(localStorage.getItem('orders')) || [];

        // Create order entries with quantities
        cartItems.forEach(item => {
            orders.push({
                id: item.id,
                img: item.img,
                name: item.name,
                model: item.model,
                storage: item.storage,
                color: item.color,
                quantity: item.quantity || 1,
                price: item.price,
                date: new Date(),
            });
        });

        localStorage.setItem('orders', JSON.stringify(orders));
        this.uiRenderer.showConfirmationToast();
        this.clearCart();
        return orders;
    }

    clearCart() {
        this.dataManager.clearCart();
        this.uiRenderer.clearCartDisplay();
        this.updateCartDisplay();
    }

    getCartItems() {
        return this.dataManager.getCartItems();
    }
}