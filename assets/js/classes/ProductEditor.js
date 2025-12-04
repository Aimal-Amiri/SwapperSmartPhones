// ProductEditor class handles editing and creating products
class ProductEditor {
    constructor(dataManager, uiRenderer) {
        this.dataManager = dataManager;
        this.uiRenderer = uiRenderer;
        this.editingId = null;
    }

    // Open editor for a specific product
    // @param {number} productId
    editProduct(productId) {
        this.editingId = productId;
        const product = this.dataManager.getProductById(productId);
        if (product) {
            this.fillModalWithProductData(product);
        }
    }

    // Fill modal dialog with product data
    // @param {Product} product
    fillModalWithProductData(product) {
        document.querySelector('.modal-title').innerText = 'Edit Product';
        document.querySelector('#name').value = product.name;
        document.querySelector('#p-modal').value = product.model;
        document.querySelector('#storage').value = product.storage;
        document.querySelector('#color').value = product.color;
        document.querySelector('#amount').value = product.amount;
        document.querySelector('#price').value = product.price;
        this.previewFile(product.img);
    }

    // Prepare editor for new product
    prepareNewProductEditor() {
        this.editingId = null;
        document.querySelector('.modal-title').innerText = 'Add New Product';
        const form = document.querySelector('form.was-validated');
        if (form) form.reset();
        const preview = document.getElementById("img-preview");
        if (preview) preview.src = "";
    }

    // Save product (create or update)
    saveProduct() {
        const formData = this.getFormData();

        if (this.isFormDataEmpty(formData)) {
            this.showErrorToast();
            return;
        }

        if (this.editingId !== null) {
            this.updateExistingProduct(formData);
        } else {
            this.createNewProduct(formData);
        }
    }

    // Get form data
    // @returns {Object}
    getFormData() {
        return {
            name: document.getElementById('name')?.value.trim() || '',
            model: document.getElementById('p-modal')?.value.trim() || '',
            storage: document.getElementById('storage')?.value.trim() || '',
            color: document.getElementById('color')?.value.trim() || '',
            amount: document.getElementById('amount')?.value.trim() || '',
            price: document.getElementById('price')?.value.trim() || '',
        };
    }


    // Check if form data is empty
    // @param {Object} formData
    // @returns {boolean}
    isFormDataEmpty(formData) {
        return Object.values(formData).some(value => value === '');
    }


    // Update existing product
    // @param {Object} formData
    updateExistingProduct(formData) {
        const product = this.dataManager.getProductById(this.editingId);
        if (product) {
            product.name = formData.name;
            product.model = formData.model;
            product.storage = parseInt(formData.storage);
            product.color = formData.color;
            product.amount = parseInt(formData.amount);
            product.price = parseFloat(formData.price);
            this.handleImageUpload(product);
        }
    }


    // Create new product
    // @param {Object} formData
    createNewProduct(formData) {
        const lastId = this.getLastProductId();
        const newProduct = new Product(
            lastId + 1,
            formData.name,
            formData.model,
            formData.storage,
            formData.color,
            formData.amount,
            formData.price,
            ''
        );
        this.handleImageUpload(newProduct, true);
    }

    // Handle image upload
    // @param {Product} product
    // @param {boolean} isNewProduct
    handleImageUpload(product, isNewProduct = false) {
        const imgInput = document.getElementById('image');

        if (imgInput && imgInput.files.length > 0) {
            const reader = new FileReader();

            reader.onload = (e) => {
                product.img = e.target.result;
                this.saveProductData(product, isNewProduct);
            };
            reader.readAsDataURL(imgInput.files[0]);
        } else if (isNewProduct) {
            // New product must have an image
            return;
        } else {
            // Editing existing product, keep old image if no new one
            this.saveProductData(product, false);
        }
    }

    // Save product to storage
    // @param {Product} product
    // @param {boolean} isNewProduct
    saveProductData(product, isNewProduct) {
        if (isNewProduct) {
            this.dataManager.addProduct(product);
            this.uiRenderer.createProductCard(product);
        } else {
            this.dataManager.updateProduct(product.id, product);
        }
        this.editingId = null;
    }

    // Get last product ID
    // @returns {number}
    getLastProductId() {
        const products = this.dataManager.getAllProducts();
        return products.length > 0 ? products[products.length - 1].id : 0;
    }

    // Remove product
    // @param {number} productId
    removeProduct(productId) {
        this.dataManager.removeProduct(productId);
        this.uiRenderer.removeProductElement(productId);
    }

    // Preview image file
    // @param {string} imageSrc
    previewFile(imageSrc) {
        const preview = document.querySelector('#img-preview');
        if (preview) {
            preview.classList.add('mt-2');
            preview.src = imageSrc;
        }
    }

    // Show error toast
    showErrorToast() {
        const toastElement = document.getElementById('errorToast');
        if (toastElement) {
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
        }
    }
}