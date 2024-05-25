const request = require("supertest");
const Post = require('./models/post')

describe('get posts', () => {
    test('should get all posts', () => {
        const post = 
        afterAll(() => {
            return Post.deleteMany();
        });

    })
    
})

test('should add a product', () => {
    const product = addProduct('camiseta', '12$')
    expect(getProducts()).toContainEqual(product)
})