export class Search {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('search');
        this.currentTerm = '';
        this.debounceTimer = null;
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Search...';
        input.className = 'search-input';
        input.value = this.currentTerm;
        
        input.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        searchContainer.appendChild(input);
        this.container.appendChild(searchContainer);
    }

    handleSearch(term) {
        clearTimeout(this.debounceTimer);
        
        this.debounceTimer = setTimeout(() => {
            this.currentTerm = term.trim().toLowerCase();
            this.app.router.handleRouteChange();
        }, 300);
    }

    getCurrentTerm() {
        return this.currentTerm;
    }
}