// AdminUIRenderer class handles rendering for admin products page
class AdminUIRenderer {
    constructor() {
        this.rowParent = document.getElementById('row-parent');
    }

    // Render all products in admin panel
    // @param {Product[]} products
    renderProducts(products) {
        if (!this.rowParent) return;

        this.rowParent.innerHTML = '';
        products.forEach(product => {
            this.createProductCard(product);
        });
    }

    // Create a product card with edit and remove buttons
    // @param {Product} product
    createProductCard(product) {
        if (!this.rowParent) return;

        const parentContainer = document.createElement('div');
        parentContainer.setAttribute('id', `${product.id}`);
        parentContainer.classList.add('col-sm-12', 'col-md-6', 'col-lg-3', 'mb-4');

        const wrapper = document.createElement('div');
        wrapper.classList.add('d-flex', 'flex-column', 'h-100');

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card', 'admin-product-card', 'shadow-sm', 'h-100');

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = product.img;
        img.alt = product.name;

        const cardBody = this.createCardBody(product);

        const editBtn = this.createButton(product.id, 'Edit', 'fa-pen', 'edit');
        editBtn.setAttribute('data-bs-toggle', 'modal');
        editBtn.setAttribute('data-bs-target', '#productModal');
        editBtn.classList.add('btn-sm', 'buttons');

        const removeBtn = this.createButton(product.id, 'Remove', 'fa-trash', 'remove');
        removeBtn.classList.add('btn-sm', 'buttons');

        const actionDiv = document.createElement('div');
        actionDiv.classList.add('admin-product-actions', 'd-flex', 'gap-2', 'mt-3');
        actionDiv.append(editBtn, removeBtn);

        cardBody.append(actionDiv);
        cardContainer.append(img, cardBody);
        wrapper.appendChild(cardContainer);
        parentContainer.appendChild(wrapper);
        this.rowParent.appendChild(parentContainer);
    }

    // Create card body with product info
    // @param {Product} product
    // @returns {HTMLElement}
    createCardBody(product) {
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = product.name;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerText = `€${product.price}`;

        cardBody.append(cardTitle, cardText);
        return cardBody;
    }

    // Create button element
    // @param {number} id
    // @param {string} btnName
    // @param {string} iconClass
    // @param {string} actionType
    // @returns {HTMLElement}
    createButton(id, btnName, iconClass, actionType) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'fs-6');
        btn.setAttribute('data-id', id);
        btn.setAttribute('data-action', actionType);
        btn.innerText = btnName;

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'ms-2', iconClass);
        btn.appendChild(icon);

        return btn;
    }

    // Remove product element from DOM
    // @param {number} id
    removeProductElement(id) {
        const element = document.getElementById(`${id}`);
        if (element) {
            element.remove();
        }
    }
}
