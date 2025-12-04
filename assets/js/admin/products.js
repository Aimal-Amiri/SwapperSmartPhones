// Initialize class instances
const dataManager = new DataManager();
const adminUIRenderer = new AdminUIRenderer();
const productEditor = new ProductEditor(dataManager, adminUIRenderer);

// Initialize the application
initializeApp();

/**
 * Initialize the admin products page
 */
async function initializeApp() {
    await dataManager.initialize();
    const products = dataManager.getAllProducts();
    adminUIRenderer.renderProducts(products);
    attachEventListeners();
}

/**
 * Handle edit button click
 */
function handleEdit(event) {
    event.preventDefault();
    const id = parseInt(event.target.closest('button').dataset.id);
    productEditor.editProduct(id);
}

/**
 * Handle remove button click
 */
function handleRemoveBtn(event) {
    event.preventDefault();
    const id = parseInt(event.target.closest('button').dataset.id);
    productEditor.removeProduct(id);
}

/**
 * Handle save button click
 */
function handleSave() {
    productEditor.saveProduct();
    initializeApp();
}

/**
 * Attach event listeners to buttons
 */
function attachEventListeners() {
    document.querySelectorAll('button[data-action="edit"]').forEach(btn => {
        btn.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('button[data-action="remove"]').forEach(btn => {
        btn.addEventListener('click', handleRemoveBtn);
    });
}

/**
 * Event listener for save button
 */
document.querySelector('#saveBtn')?.addEventListener('click', handleSave);

/**
 * Event listener for add new product button
 */
document.querySelector('#add-btn')?.addEventListener('click', function () {
    productEditor.prepareNewProductEditor();
});

/**
 * Event listener for reset products button
 */
document.querySelector('#reset-products')?.addEventListener('click', async function () {
    const data = await dataManager.fetchDataFromFile();
    dataManager.loadProducts(data);
    const products = dataManager.getAllProducts();
    adminUIRenderer.renderProducts(products);
    attachEventListeners();
});