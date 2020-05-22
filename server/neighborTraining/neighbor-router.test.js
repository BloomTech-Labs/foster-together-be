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

                expect(res.status).toBe(200)

                
        })
    })

    describe('GET /training', () => {
        test('should return an array of all neighbor training tables', async () => {
            const res = await request(server)
                .get('/training')
                expect(res.body).toBeTruthy()
        } )
    })

    describe('PUT /training', () => {
        test('should respond with updated user training table', async () => {
            let dummyData = Date.now()

            const res = await request(server)
                .put('/training/update')
                .send({
                    member_id: 1,
                    changes: {
                        m1_q1: dummyData
                    }
                })

                expect(Number(res.body.m1_q1)).toEqual(dummyData)
        })
    })

    describe('DELETE /training/:id', () => {
        test('should respond with a status 200 and delete a specific user', async () => {
            const res = await request(server)
                .delete('/training/1')

                expect(res.status).toBe(200)
                expect(JSON.parse(res.text).error).toBe(undefined)
        })
    })

    
})