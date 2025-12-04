// Initialize class instances
const dataManager = new DataManager();
const ordersTable = new OrdersTable();

// Initialize the application
initializeApp();

/**
 * Initialize the admin orders page
 */
function initializeApp() {
    dataManager.loadOrders();
    const orders = dataManager.getOrders();
    ordersTable.initialize(orders);
}