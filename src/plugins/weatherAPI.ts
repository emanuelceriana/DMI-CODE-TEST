import fp from "fastify-plugin";

export interface WeatherAPIPluginOptions {
  // Specify WeatherAPI plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<WeatherAPIPluginOptions>(async (fastify, opts) => {
  fastify.decorate(
    "getCurrentWeather",
    async (lat: Number, lon: Number, cached: boolean) => {

      const cachedData = fastify.getKey(`${lat},${lon}`);

      let currentTemperature,
          status = 200;

      try {
        //If cached is true and the last temperature is cached, set as currentTemperature
        if(cached && cachedData) {
          currentTemperature = cachedData;
        } else {

          ({data:{current:{temp:currentTemperature}}, status} = await fastify.axios.weatherAPI.get(process.env.WEATHER_PATH,{
            params: {
              lat: lat,
              lon: lon,
              appid: process.env.WEATHER_API_KEY,
              exclude: process.env.WEATHER_EXCLUDE_OPT,
              units: process.env.WEATHER_UNITS_OPT,
            },
          }));

          //Cache fetched temperature and set currentTemperature
          fastify.putKey(`${lat},${lon}`,currentTemperature);

        }
      } catch (error) {
        //If error set statusCode 500
        status = 500;
      }
      
      return status === 200 ? currentTemperature : null;
    }
  );
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    getCurrentWeather(lat: Number, lon: Number, cached: boolean, status?: Number): any;
  }
}
