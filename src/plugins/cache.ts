import fp from 'fastify-plugin'
import { Cache } from 'memory-cache'

export interface CachePluginOptions {
  // Specify Cache plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<CachePluginOptions>(async (fastify, opts) => {

  const cache = new Cache();

  fastify.decorate('clearCache', () => {
    cache.clear();
    return 'cache cleared';
  })

  fastify.decorate('getKey', (key: string) => {
    const cacheData = cache.get(key);
    return cacheData ? cacheData : null;
  })

  fastify.decorate('putKey', (key: string ,data: any) => {
    cache.put(key,data);
    return `${key} data cached correctly`
  })

})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    getKey(key: string): any;
    putKey(key: string, data: any): string;
    clearCache(): string;
  }
}
