import Fastify from 'fastify'
import Cache from '../../src/plugins/cache'

describe('cache plugin tests', () => {

    const fastify = Fastify();
    void fastify.register(Cache);

    test('put/get data by key works', async () => {
        const key = 'test';
        const data = {data: 'test'};

        await fastify.ready();

        fastify.putKey(key,data);
        expect(fastify.getKey(key)).toEqual(data);
    })

    test('getKey returns null when key don`t match', async () => {
        //Random Key
        const key = (Math.random() + 1).toString(36).substring(7);
        await fastify.ready();
        fastify.clearCache();

        expect(fastify.getKey(key)).toEqual(null);
    })

    test('put return message match', async () => {
        const key = 'test';
        const data = {data: 'test'};

        await fastify.ready();
        expect(fastify.putKey(key,data)).toEqual('test data cached correctly');
    })

    test('clearCache return message match', async () => {
        await fastify.ready();
        expect(fastify.clearCache()).toEqual('cache cleared');
    })

    test('clearCache works', async () => {
        const key = 'test';
        const data = {data: 'test'};

        await fastify.ready();
        fastify.putKey(key,data);

        //Cache cleared!
        fastify.clearCache();

        expect(fastify.getKey(key)).toEqual(null);
    })

});