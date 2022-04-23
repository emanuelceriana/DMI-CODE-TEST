import fp from "fastify-plugin";

export interface AxiosPluginOptions {
    // Specify Cache plugin options here
}

export default fp<AxiosPluginOptions>(async (fastify, opts) => {
    const axiosOpts = {
        clients: {
            weatherAPI: {
                baseURL: process.env.WEATHER_BASE_URL,
            },
        }
    }

  fastify.register(require('fastify-axios'), axiosOpts);
})

declare module 'fastify' {
    export interface FastifyInstance {
        axios: any;
    }
}

