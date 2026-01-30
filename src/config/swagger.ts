import swaggerJsdoc from 'swagger-jsdoc'
import path from 'path'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HelpDesk API',
      version: '1.0.0',
      description: 'Sistema de gerenciamento de chamados',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Desenvolvimento',
      },
    ],
  },
  apis: [path.join(__dirname, '../../swagger.yaml')], 
}

export const swaggerSpec = swaggerJsdoc(options)