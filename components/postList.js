import { API } from '../utils/api.js';
import { DOM } from '../utils/dom.js';

export class PostList {
    constructor(app, userId) {
        this.app = app;
        this.userId = userId;
        this.posts = [];
        this.filteredPosts = [];
        this.user = null;
    }

    async render() {
        await this.loadData();
        
        const container = DOM.createElement('div', { className: 'post-list' });
        
        const header = this.createHeader();
        const postsContainer = this.createPostsContainer();
        
        container.appendChild(header);
        container.appendChild(postsContainer);
        
        return container;
    }

    createHeader() {
        const header = DOM.createElement('div', { className: 'section-header' });
        
        const userInfo = this.user ? 
            `Posts by ${this.user.name}` : 
            `Posts by User #${this.userId}`;
            
        const title = DOM.createElement('h2', { 
            textContent: userInfo,
            className: 'section-title'
        });
        
        const stats = DOM.createElement('div', { className: 'post-stats' });
        stats.textContent = `${this.filteredPosts.length} posts`;
        
        header.appendChild(title);
        header.appendChild(stats);
        
        return header;
    }

    createPostsContainer() {
        const container = DOM.createElement('div', { className: 'posts-container' });
        
        if (this.filteredPosts.length === 0) {
            const emptyMessage = DOM.createElement('div', { 
                className: 'empty-state',
                textContent: 'No posts found'
            });
            container.appendChild(emptyMessage);
            return container;
        }
        
        const postList = DOM.createElement('div', { className: 'post-items' });
        
        this.filteredPosts.forEach(post => {
            const postItem = this.createPostItem(post);
            postList.appendChild(postItem);
        });
        
        container.appendChild(postList);
        return container;
    }

    createPostItem(post) {
        const postItem = DOM.createElement('div', { className: 'post-item' });
        
        const title = DOM.createElement('h3', {
            textContent: post.title,
            className: 'post-title'
        });
        
        const body = DOM.createElement('p', {
            textContent: post.body,
            className: 'post-body'
        });
        
        const actions = DOM.createElement('div', { className: 'post-actions' });
        
        const commentsBtn = DOM.createElement('button', {
            textContent: `View Comments`,
            className: 'btn btn-primary btn-sm',
            onclick: () => this.app.navigateTo(`users#posts#comments#${post.id}`)
        });
        
        actions.appendChild(commentsBtn);
        
        postItem.appendChild(title);
        postItem.appendChild(body);
        postItem.appendChild(actions);
        
        return postItem;
    }

    async loadData() {
        try {
            const users = await API.getUsers();
            this.user = users.find(user => user.id === this.userId);

            this.posts = await API.getUserPosts(this.userId);
            this.filterPosts();
        } catch (error) {
            console.error('Error loading posts:', error);
        }
    }

    filterPosts() {
        const searchTerm = this.app.getSearchTerm();
        
        if (!searchTerm) {
            this.filteredPosts = this.posts;
            return;
        }
        
        this.filteredPosts = this.posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.body.toLowerCase().includes(searchTerm)
        );
    }
}