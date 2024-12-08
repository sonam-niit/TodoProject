const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');
const TodoModel = require('./todoModel')

beforeAll(async () => {   
    const MONGO_URI = 'mongodb://localhost:27017/pwskillstesting'
    mongoose.connect(MONGO_URI);
})

describe('ToDO API',()=>{
    it('Create New Todo',async()=>{
        const response= await request(app).post('/api/todo').send({task:'Learn Jest'});
        expect(response.statusCode).toBe(201);
        expect(response.body.task).toBe('Learn Jest');
    })
})