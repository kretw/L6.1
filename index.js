import { Router } from './components/router.js';
import { Breadcrumbs } from './components/breadcrumbs.js';
import { Search } from './components/search.js';
import { UserList } from './components/userList.js';

class App {
    constructor() {
        this.root = document.getElementById('root');
        this.router = new Router(this);
        this.breadcrumbs = new Breadcrumbs();
        this.search = new Search(this);
        this.currentView = null;
        
        this.init();
    }

    init() {
        this.renderLayout();
        this.router.init();
    }

    renderLayout() {
        this.root.innerHTML = '';
        
        const header = this.createHeader();
        const main = this.createMain();
        
        this.root.appendChild(header);
        this.root.appendChild(main);
    }

    createHeader() {
        const header = document.createElement('header');
        header.className = 'app-header';
        
        const title = document.createElement('h1');
        title.textContent = 'User Management';
        title.className = 'app-title';
        
        header.appendChild(title);
        return header;
    }

    createMain() {
        const main = document.createElement('main');
        main.className = 'app-main';
        
        const navSection = document.createElement('section');
        navSection.className = 'app-nav';
        
        const breadcrumbsContainer = document.createElement('div');
        breadcrumbsContainer.id = 'breadcrumbs';
        
        const searchContainer = document.createElement('div');
        searchContainer.id = 'search';
        
        const contentContainer = document.createElement('div');
        contentContainer.id = 'content';
        contentContainer.className = 'app-content';
        
        navSection.appendChild(breadcrumbsContainer);
        navSection.appendChild(searchContainer);
        main.appendChild(navSection);
        main.appendChild(contentContainer);
        
        return main;
    }

    navigateTo(path) {
        this.router.navigateTo(path);
    }

    setView(viewComponent) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        if (viewComponent) {
            content.appendChild(viewComponent);
        }
        
        this.currentView = viewComponent;
    }

    updateBreadcrumbs(paths) {
        this.breadcrumbs.update(paths);
    }

    getSearchTerm() {
        return this.search.getCurrentTerm();
    }
}

new App();