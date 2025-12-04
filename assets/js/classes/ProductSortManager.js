// ProductSortManager class handles sorting of products
class ProductSortManager {

    // Sort products by price
    // @param {Product[]} products
    // @param {string} direction - 'asc' for ascending, 'desc' for descending
    // @returns {Product[]}
    static sortByPrice(products, direction) {
        const sorted = [...products];
        if (direction === 'asc') {
            return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (direction === 'desc') {
            return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        return sorted;
    }
}
