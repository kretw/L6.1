export class API {
    static async getUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return await response.json();
    }

    static async getUserTodos(userId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
        return await response.json();
    }

    static async getUserPosts(userId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        return await response.json();
    }

    static async getPostComments(postId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        return await response.json();
    }

    static async addTodo(todoData) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        });
        return await response.json();
    }
}
