// Initialize class instances
const dataManager = new DataManager();
const uiRenderer = new UIRenderer();
const filterManager = new FilterManager();
const cartManager = new CartManager(dataManager, uiRenderer);

// Initialize the application
initializeApp();

// Initialize the application
async function initializeApp() {
    await dataManager.initialize();
    const products = dataManager.getAllProducts();
    const cartItems = dataManager.getCartItems();

    uiRenderer.renderProducts(products);
    if (cartItems.length > 0) {
        cartManager.renderCart();
    } else {
        cartManager.updateCartDisplay();
    }
    attachEventListeners();
}

// Handle add to cart button click
function handleAddClick(event) {
    event.preventDefault();
    const id = parseInt(event.target.closest('button').dataset.id);

    cartManager.addToCart(id);
}

// Handle remove from cart button click
function handleRemoveBtn(event) {
    event.preventDefault();
    const id = parseInt(event.target.closest('button').dataset.id);
    cartManager.removeFromCart(id);
}

// Event listeners for filters
document.querySelectorAll('.model input, .storage input, .color input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        filterManager.updateSelectedFilters();
        applyFilter();
    });
});

// Apply filter to products
function applyFilter() {
    const products = dataManager.getAllProducts();
    const filteredProducts = products.filter(product => filterManager.matchesFilters(product));

    if (filteredProducts.length > 0) {
        uiRenderer.renderProducts(filteredProducts);
        attachEventListeners();
    }
}

// Event listener for continuing shopping
document.querySelector('#shoping-btn')?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location = 'index.html';
});

// Event listener for resetting filters
document.querySelector('#reset-filter')?.addEventListener('click', (event) => {
    event.preventDefault();
    filterManager.resetFilters();
    const allProducts = dataManager.getAllProducts();
    uiRenderer.renderProducts(allProducts);
    attachEventListeners();
});

// Event listeners for price sorting
document.querySelectorAll('[id^="price-"]').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const direction = event.target.id.split('-')[1];
        const products = dataManager.getAllProducts();
        const sortedProducts = ProductSortManager.sortByPrice(products, direction);
        uiRenderer.renderProducts(sortedProducts);
        attachEventListeners();
    });
});

// Event listener for checkout
document.querySelector('#order-btn')?.addEventListener('click', function () {
    cartManager.checkout();
});

// Attach event listeners to dynamically created buttons
function attachEventListeners() {
    document.querySelectorAll('button[data-action="addToCart"]').forEach(btn => {
        btn.addEventListener('click', handleAddClick);
    });
}

// Event listener for page load
window.addEventListener('load', function () {
    const cartItems = dataManager.getCartItems();
    if (cartItems.length > 0) {
        cartManager.renderCart();
    } else {
        cartManager.updateCartDisplay();
    }
    attachEventListeners();
});