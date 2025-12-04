// MainUIRenderer class handles all DOM creation and manipulation
// Responsible for rendering products, cart items, and UI components
class MainUIRenderer {
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
        console.log(product);

        const parentContainer = document.createElement('div');
        parentContainer.setAttribute('id', `${product.id}`);
        parentContainer.classList.add('col-sm-12', 'col-md-3', 'py-md-2', 'div-size');

        const wrapper = document.createElement('div');
        wrapper.classList.add('d-flex', 'flex-column', 'mt-2', 'mt-md-0');
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
        cardContainer.classList.add('card', 'mb-3');

        const row = document.createElement('div');
        row.classList.add('row', 'g-0');

        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('col-md-4');

        const img = document.createElement('img');
        img.classList.add('img-fluid', 'rounded-start');
        img.src = item.img;

        const cardBodyWrapper = document.createElement('div');
        cardBodyWrapper.classList.add('col-md-8');

        const { cardBody, cardTitle, cardText } = this.createCardBody(item);

        // Create quantity control
        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('mb-2', 'd-flex', 'align-items-center', 'gap-2');

        const quantityLabel = document.createElement('label');
        quantityLabel.classList.add('form-label', 'mb-0');
        quantityLabel.innerText = 'Qty:';

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.max = '50';
        quantityInput.value = item.quantity || 1;
        quantityInput.classList.add('form-control', 'form-control-sm');
        quantityInput.style.width = '70px';
        quantityInput.setAttribute('data-type', 'cart-quantity');
        quantityInput.setAttribute('data-product-id', item.id);

        quantityDiv.append(quantityLabel, quantityInput);

        // Remove button
        const removeBtn = this.createButton(item.id, 'fa-trash', 'removeFromCart');

        cardBody.append(cardTitle, cardText, quantityDiv, removeBtn);
        imgWrapper.appendChild(img);
        cardBodyWrapper.appendChild(cardBody);
        row.append(imgWrapper, cardBodyWrapper);
        cardContainer.appendChild(row);
        this.shoppingContainer.appendChild(cardContainer);
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

    showConfirmationToast() {
        const toastElement = document.getElementById('confirmation-toast');
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