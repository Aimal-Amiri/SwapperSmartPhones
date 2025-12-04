// FilterManager class handles all filtering logic
// Manages which filters are selected and applies them to products
class FilterManager {
    constructor() {
        this.selectedFilters = {
            model: [],
            storage: [],
            color: [],
        };
    }

    updateSelectedFilters() {
        this.selectedFilters.model = [];
        this.selectedFilters.storage = [];
        this.selectedFilters.color = [];

        document.querySelectorAll('.model input:checked, .storage input:checked, .color input:checked').forEach(
            checkbox => {
                const filter = checkbox.id.split('-')[1].toLowerCase();
                const filterType = checkbox.closest("div").classList[1];

                if (filterType === "model") this.selectedFilters.model.push(filter);
                if (filterType === "storage") this.selectedFilters.storage.push(filter);
                if (filterType === "color") this.selectedFilters.color.push(filter);
            });
    }

    matchesFilters(product) {
        return (
            (this.selectedFilters.model.length === 0 || this.selectedFilters.model.includes(product.model.toLowerCase())) &&
            (this.selectedFilters.storage.length === 0 || this.selectedFilters.storage.includes(product.storage.toString())) &&
            (this.selectedFilters.color.length === 0 || this.selectedFilters.color.includes(product.color.toLowerCase()))
        );
    }

    resetFilters() {
        this.selectedFilters.model = [];
        this.selectedFilters.storage = [];
        this.selectedFilters.color = [];

        document.querySelectorAll('.form-check-input').forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    getSelectedFilters() {
        return this.selectedFilters;
    }
}
