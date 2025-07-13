/*  import { createServer } from 'node:http'

const server = createServer((request, response) => {
    response.write('Hello Word')

    return response.end()
})

server.listen(3333)   */

//GET,POST, PUT, DELETE, PATCH, HEAD

import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
//import { DatabaseMemomry } from './database-memory.js'

const server = fastify()

//const dataBase = new DatabaseMemomry()

const database = new DatabasePostgres()

//POST http://localhost:3333/videos
//PUT http://localhost:3333/videos/id
// Request Body

server.post('/videos', async  (request, reply) => {
    const { title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list()

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration} = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
    //Resposta vazia de sucesso
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})

