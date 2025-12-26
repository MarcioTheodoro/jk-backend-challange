import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerConfig = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for user management'
    }
  },
  apis: ['src/controllers/*.ts']
});
