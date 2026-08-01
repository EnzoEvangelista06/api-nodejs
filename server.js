const fastify = require('fastify')
const crypto = require('crypto')

const server = fastify()

const courses = [
  { id: '1', title: 'Curso de Node.js'},
  { id: '2', title: 'Curso de React'},
  { id: '3', title: 'Curso de React Native'},
]

server.get('/courses', (request, reply) => {
  return reply.send({ courses })
})

server.get('/courses/:id', (request, reply) => {
  const courseId = request.params.id
  const course = courses.find(course => course.id === courseId)

  console.log(course)
  
  if (course) {    
    return { course }
  }
  
  // 404 => Não encontrado
  return reply.status(404).send()

})

server.post('/courses', (request, reply) => {
  const courseTitle = request.body.title
  const courseId = crypto.randomUUID()

  if (!courseTitle) {
    return reply.status(400).send({ message: courseTitle })
  }

  courses.push({ id: courseId, title: 'Novo curso' })

  return reply.status(201).send({ courseId  })
})

server.listen({ port: 3333 }).then(() => { 
  console.log('HTTP server running!')
})