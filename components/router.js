import { UserList } from './userList.js';
import { TodoList } from './todoList.js';
import { PostList } from './postList.js';
import { CommentList } from './commentList.js';

export class Router {
    constructor(app) {
        this.app = app;
        this.routes = {
            'users': this.showUsers.bind(this),
            'users#todos': this.showUserTodos.bind(this),
            'users#posts': this.showUserPosts.bind(this),
            'users#posts#comments': this.showPostComments.bind(this)
        };
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
        this.handleRouteChange();
    }

    handleRouteChange() {
        const hash = window.location.hash.substring(1) || 'users';
        this.navigateTo(hash);
    }

    navigateTo(path) {
        const handler = this.routes[path];
        if (handler) {
            handler();
            this.updateBrowserHistory(path);
        } else {
            this.showUsers();
        }
    }

    updateBrowserHistory(path) {
        window.history.replaceState(null, null, `#${path}`);
        this.updateBreadcrumbs(path);
    }

    updateBreadcrumbs(path) {
        const paths = path.split('#');
        const breadcrumbPaths = paths.map((p, index) => ({
            name: this.getBreadcrumbName(p, index),
            path: paths.slice(0, index + 1).join('#')
        }));
        this.app.updateBreadcrumbs(breadcrumbPaths);
    }

    getBreadcrumbName(path, index) {
        const names = {
            'users': 'Users',
            'todos': 'Todos',
            'posts': 'Posts',
            'comments': 'Comments'
        };
        return names[path] || path;
    }

    showUsers() {
        const userList = new UserList(this.app);
        this.app.setView(userList.render());
    }

    showUserTodos() {
        const userId = this.getUserIdFromHash();
        const todoList = new TodoList(this.app, userId);
        this.app.setView(todoList.render());
    }

    showUserPosts() {
        const userId = this.getUserIdFromHash();
        const postList = new PostList(this.app, userId);
        this.app.setView(postList.render());
    }

    showPostComments() {
        const postId = this.getPostIdFromHash();
        const commentList = new CommentList(this.app, postId);
        this.app.setView(commentList.render());
    }

    getUserIdFromHash() {
        const hash = window.location.hash.substring(1);
        const match = hash.match(/users#(todos|posts)#(\d+)/);
        return match ? parseInt(match[2]) : null;
    }

    getPostIdFromHash() {
        const hash = window.location.hash.substring(1);
        const match = hash.match(/users#posts#comments#(\d+)/);
        return match ? parseInt(match[1]) : null;
    }
}