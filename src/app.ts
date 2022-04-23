import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from 'fastify-autoload';
import { FastifyPluginAsync } from 'fastify';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify: any,
    opts: any,
): Promise<void> => {

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: Object.assign({ prefix: '/api' }, opts)
  })

};

export default app;
export { app }
