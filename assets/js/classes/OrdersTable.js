// OrdersTable class handles rendering and managing orders table
class OrdersTable {
    constructor() {
        this.tableHead = document.getElementById('table-header');
        this.tableBody = document.getElementById('table-data');
        this.orders = [];
    }

    // Initialize orders table
    // @param {Object[]} orders
    initialize(orders) {
        this.orders = this.aggregateOrders(orders);
        this.renderTable();
    }

    // Aggregate orders by product ID to combine duplicate items with quantities
    // @param {Object[]} orders
    // @returns {Object[]}
    aggregateOrders(orders) {
        const aggregated = {};

        orders.forEach(order => {
            const key = order.id;

            if (aggregated[key]) {
                // Item already exists, increase quantity
                aggregated[key].quantity = (aggregated[key].quantity || 1) + (order.quantity || 1);
            } else {
                // First instance of this item
                aggregated[key] = {
                    ...order,
                    quantity: order.quantity || 1
                };
            }
        });

        // Convert aggregated object back to array
        return Object.values(aggregated);
    }

    // Render the orders table
    renderTable() {
        const noOrdersElement = document.getElementById('no-orders');

        if (this.orders.length === 0) {
            // Show empty state
            if (noOrdersElement) {
                noOrdersElement.classList.remove('d-none');
            }
            this.clearTable();
            return;
        }

        // Hide empty state
        if (noOrdersElement) {
            noOrdersElement.classList.add('d-none');
        }

        this.clearTable();
        const keys = Object.keys(this.orders[0]);

        // Render table headers
        keys.forEach(key => {
            this.createTableHeader(key);
        });

        // Render table rows
        this.orders.forEach(order => {
            this.createTableRow(order, keys);
        });
    }

    // Create table header cell
    // @param {string} key
    createTableHeader(key) {
        if (!this.tableHead) return;

        const th = document.createElement('th');
        th.classList.add('text-nowrap', 'fw-bold');
        th.setAttribute('scope', 'col');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        this.tableHead.appendChild(th);
    }

    // Create table row
    // @param {Object} order
    // @param {string[]} keys
    createTableRow(order, keys) {
        if (!this.tableBody) return;

        const row = document.createElement('tr');

        keys.forEach(key => {
            const td = document.createElement('td');

            if (key === 'img') {
                // Handle image cells
                const image = document.createElement('img');
                image.src = order[key];
                image.style.width = '50px';
                image.style.height = '50px';
                image.alt = 'product image';
                td.appendChild(image);
            } else if (key === 'date') {
                // Format date cells
                td.textContent = this.formatDate(order[key]);
            } else {
                // Regular text cells
                td.textContent = order[key];
            }

            row.appendChild(td);
        });

        this.tableBody.appendChild(row);
    }

    // Format date to readable format
    // @param {string} dateString
    // @returns {string}
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 19).replace("T", " ");
    }

    // Clear table
    clearTable() {
        if (this.tableHead) this.tableHead.innerHTML = '';
        if (this.tableBody) this.tableBody.innerHTML = '';
    }

    // Get orders
    // @returns {Object[]}
    getOrders() {
        return this.orders;
    }
}