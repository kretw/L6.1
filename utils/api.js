// Локальные данные для демонстрации
const localUsers = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv"
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net"
    }
];

const localTodos = [
    { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false },
    { "userId": 1, "id": 2, "title": "quis ut nam facilis et officia qui", "completed": false },
    { "userId": 2, "id": 3, "title": "fugiat veniam minus", "completed": false },
    { "userId": 2, "id": 4, "title": "et porro tempora", "completed": true },
    { "userId": 3, "id": 5, "title": "laboriosam mollitia et enim quasi adipisci quia provident illum", "completed": false }
];

const localPosts = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 2,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    }
];

const localComments = [
    {
        "postId": 1,
        "id": 1,
        "name": "id labore ex et quam laborum",
        "email": "Eliseo@gardner.biz",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    {
        "postId": 1,
        "id": 2,
        "name": "quo vero reiciendis velit similique earum",
        "email": "Jayne_Kuhic@sydney.com",
        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
    }
];

export class API {
    static async getUsers() {
        try {
            console.log('Trying to fetch users from API...');
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('API not available');
            return await response.json();
        } catch (error) {
            console.log('Using local users data');
            return localUsers;
        }
    }

    static async getUserTodos(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
            if (!response.ok) throw new Error('API not available');
            return await response.json();
        } catch (error) {
            console.log('Using local todos data for user:', userId);
            return localTodos.filter(todo => todo.userId === userId);
        }
    }

    static async getUserPosts(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
            if (!response.ok) throw new Error('API not available');
            return await response.json();
        } catch (error) {
            console.log('Using local posts data for user:', userId);
            return localPosts.filter(post => post.userId === userId);
        }
    }

    static async getPostComments(postId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            if (!response.ok) throw new Error('API not available');
            return await response.json();
        } catch (error) {
            console.log('Using local comments data for post:', postId);
            return localComments.filter(comment => comment.postId === postId);
        }
    }
}