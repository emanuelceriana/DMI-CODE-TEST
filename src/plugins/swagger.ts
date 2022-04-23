import fp from "fastify-plugin";

export interface SwaggerPluginOptions {
    // Specify Cache plugin options here
}

export default fp<SwaggerPluginOptions>(async (fastify, opts) => {
    const swaggerOptions = {
        routePrefix: '/',
        swagger: {
          info: {
            title: 'DMI Code Test',
            description: 'Testing the control temperature API',
            version: '1.0.0'
          },
        },
        uiConfig: {
          docExpansion: 'full',
          deepLinking: false
        },
        staticCSP: true,
        exposeRoute: true
      }

  fastify.register(require('fastify-swagger'), swaggerOptions);
})

declare module 'fastify' {
    export interface FastifyInstance {
        swagger: any;
    }
}

