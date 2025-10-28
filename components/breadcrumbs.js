export class Breadcrumbs {
    constructor() {
        this.container = document.getElementById('breadcrumbs');
    }

    update(paths) {
        this.container.innerHTML = '';
        
        const breadcrumbElements = paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            return this.createBreadcrumb(path, isLast);
        });

        breadcrumbElements.forEach(element => {
            this.container.appendChild(element);
        });
    }

    createBreadcrumb(path, isLast) {
        const breadcrumb = document.createElement('span');
        breadcrumb.className = 'breadcrumb';
        
        if (!isLast) {
            const link = document.createElement('a');
            link.href = `#${path.path}`;
            link.textContent = path.name;
            breadcrumb.appendChild(link);
            
            const separator = document.createElement('span');
            separator.textContent = ' / ';
            separator.className = 'breadcrumb-separator';
            breadcrumb.appendChild(separator);
        } else {
            breadcrumb.textContent = path.name;
            breadcrumb.className += ' breadcrumb-current';
        }
        
        return breadcrumb;
    }
}