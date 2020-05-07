const server = require('../server'),
    request = require('supertest'),
    db = require('../../data/db-config')

describe('/training', () => {

    beforeAll(async done => {
        await db.seed.run();
        done();
    })

    describe('POST /training/start', () => {
        test('should respond with a status 201 and a json message for success', async () => {
            const res = await request(server)
                .post('/training/start')
                .send({
                    member_id: 1
                })
            
            expect(JSON.parse(res.text).error).toBe(undefined)

            expect(res.status).toBe(201)            
        })
    })

    describe('GET /training/:id', () => {
        test('should respond with a status 200 and a json object containing the training table for a user', async () => {
            const res = await request(server)
                .get('/training/1')

                expect(res.body).toBeTruthy()

                console.log(res)

                expect(res.status).toBe(200)

                
        })
    })    
})