// UIRenderer class handles all DOM creation and manipulation
// Responsible for rendering products, cart items, and UI components
class UIRenderer {
    constructor() {
        this.rowParent = document.getElementById('row-parent');
        this.shoppingContainer = document.getElementById('shoping-container');
        this.notificationElement = document.getElementById('notification');
        this.shoppingCartElement = document.querySelector('.shopping-cart');
    }

    renderProducts(products) {
        if (!this.rowParent) return;

        this.rowParent.innerHTML = '';
        products.forEach(product => {
            this.createProductCard(product);
        });
    }

    createProductCard(product) {
        if (!this.rowParent) return;

        const parentContainer = document.createElement('div');
        parentContainer.setAttribute('id', `${product.id}`);
        parentContainer.classList.add('col-sm-12', 'col-md-4', 'col-lg-3', 'py-md-2', 'mt-2', 'mt-md-0');

        const wrapper = document.createElement('div');
        wrapper.classList.add('d-flex', 'flex-column', 'mt-2', 'mt-md-0', 'align-items-center');
        wrapper.style.height = '100%';

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');
        cardContainer.style.height = '100%';

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = product.img;

        const { cardBody, cardTitle, cardText } = this.createCardBody(product);
        const addBtn = this.createButton(product.id, null, 'addToCart');

        cardContainer.append(img, cardBody);
        cardBody.append(cardTitle, cardText, addBtn);
        wrapper.appendChild(cardContainer);
        parentContainer.appendChild(wrapper);
        this.rowParent.appendChild(parentContainer);
    }

    renderCartItems(cartItems) {
        if (!this.shoppingContainer) return;

        this.shoppingContainer.innerHTML = '';
        cartItems.forEach(item => {
            this.createCartItem(item);
        });
    }

    createCartItem(item) {
        if (!this.shoppingContainer) return;

        const cardContainer = document.createElement('div');
        cardContainer.setAttribute('id', `cart-item-${item.id}`);
        cardContainer.classList.add('card', 'mb-3', 'shadow-sm', 'border-0', 'cart-item-card');

        const row = document.createElement('div');
        row.classList.add('row', 'g-0', 'align-items-center');

        // Image wrapper with better styling
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('col-5', 'col-md-4', 'col-lg-3', 'p-2', 'p-md-3');

        const img = document.createElement('img');
        img.classList.add('img-fluid', 'rounded-2');
        img.src = item.img;

        imgWrapper.appendChild(img);

        // Body wrapper with improved spacing
        const cardBodyWrapper = document.createElement('div');
        cardBodyWrapper.classList.add('col-7', 'col-md-8', 'col-lg-9', 'ps-2', 'ps-md-3', 'pe-2', 'pe-md-3', 'py-3');

        const { cardBody, cardTitle, cardText } = this.createCartItemBody(item);

        // Create quantity and action container
        const controlsDiv = document.createElement('div');
        controlsDiv.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'gap-2', 'mt-3', 'flex-wrap');

        // Quantity control with styling
        const quantityControlDiv = document.createElement('div');
        quantityControlDiv.classList.add('d-flex', 'align-items-center', 'gap-2');

        const quantityLabel = document.createElement('label');
        quantityLabel.classList.add('form-label', 'mb-0', 'fw-semibold', 'text-dark', 'small');
        quantityLabel.innerText = 'Qty:';
        quantityLabel.setAttribute('for', `cart-quantity-${item.id}`);

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.max = '50';
        quantityInput.value = item.quantity || 1;
        quantityInput.classList.add('form-control', 'form-control-sm', 'border');
        quantityInput.setAttribute('data-type', 'cart-quantity');
        quantityInput.setAttribute('data-product-id', item.id);
        quantityInput.id = `cart-quantity-${item.id}`;

        quantityControlDiv.append(quantityLabel, quantityInput);

        // Total price display
        const totalPrice = document.createElement('div');
        totalPrice.classList.add('fw-bold', 'fs-6');
        totalPrice.innerHTML = `€<span class="cart-item-total">${((item.price * (item.quantity || 1)).toFixed(2))}</span>`;

        // Remove button
        const removeBtn = this.createCartButton(item.id, 'fa-trash', 'removeFromCart');

        controlsDiv.append(quantityControlDiv, totalPrice, removeBtn);
        cardBody.append(cardTitle, cardText, controlsDiv);
        cardBodyWrapper.appendChild(cardBody);
        row.append(imgWrapper, cardBodyWrapper);
        cardContainer.appendChild(row);
        this.shoppingContainer.appendChild(cardContainer);
    }

    createCartItemBody(product) {
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'p-0');

        const cardTitle = document.createElement('h6');
        cardTitle.classList.add('card-title', 'mb-1', 'fw-bold', 'text-dark');
        cardTitle.innerText = product.name;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'mb-0', 'text-dark');
        cardText.innerHTML = `<span>€${product.price}</span> |${product.storage}GB |${product.color}`;

        return { cardBody, cardTitle, cardText };
    }

    createCartButton(id, iconClass, actionType) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-sm', 'buttons', 'ms-auto');
        btn.setAttribute('data-id', id);
        btn.setAttribute('data-action', actionType);
        btn.title = 'Remove from cart';

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', iconClass);
        btn.appendChild(icon);

        return btn;
    }

    createCardBody(product) {
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = product.name;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerText = `€${product.price}`;

        return { cardBody, cardTitle, cardText };
    }

    createButton(id, iconClass, actionType) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-sm', 'buttons', 'me-2');
        btn.setAttribute('data-id', id);
        btn.setAttribute('data-action', actionType);

        if (iconClass === null) {
            btn.innerText = 'Add to cart';
            btn.setAttribute('data-bs-toggle', 'offcanvas');
            btn.setAttribute('data-bs-target', '#shoping-cart');
        } else {
            const icon = document.createElement('i');
            icon.classList.add('fa-solid', iconClass);
            btn.appendChild(icon);
        }

        return btn;
    }

    updateNotification(itemCount) {
        if (!this.notificationElement) return;

        if (itemCount > 0) {
            this.notificationElement.classList.remove('d-none');
            this.notificationElement.classList.add('d-block');
            if (this.shoppingCartElement) {
                this.shoppingCartElement.style.marginTop = '-10px';
            }
            this.notificationElement.textContent = itemCount;
        } else {
            this.notificationElement.classList.add('d-none');
            this.notificationElement.classList.remove('d-block');
            if (this.shoppingCartElement) {
                this.shoppingCartElement.style.marginTop = '0';
            }
            this.notificationElement.textContent = '';
        }
    }

    updateCartItem(productId, quantity, newTotal) {
        const container = document.getElementById(`cart-item-${productId}`);
        if (!container) return;

        // Update quantity input value
        const qtyInput = container.querySelector(`#cart-quantity-${productId}`) || container.querySelector('input[data-type="cart-quantity"]');
        if (qtyInput) {
            qtyInput.value = quantity;
        }

        // Update total price display for this item
        const totalEl = container.querySelector('.cart-item-total');
        if (totalEl) {
            const n = Number(newTotal) || 0;
            totalEl.textContent = n.toFixed(2);
        }
    }

    showConfirmationToast() {
        const toastElement = document.getElementById('confirmation-toast');
        if (toastElement) {
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
        }
    }

    showEmptyCartToast() {
        const toastElement = document.getElementById('empty-cart-toast');
        if (toastElement) {
            const toast = new window.bootstrap.Toast(toastElement);
            toast.show();
        }
    }

    clearCartDisplay() {
        if (this.shoppingContainer) {
            this.shoppingContainer.innerHTML = '';
        }
    }

    removeProductElement(id) {
        const element = document.getElementById(`${id}`);
        if (element) {
            element.remove();
        }
    }
}