import { FastifyPluginAsync } from "fastify";
import weatherSchema from "./schema";
import { WeatherQueryParams } from "./types";
import defVal from "./defaultValues";

const weather: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.get("/temperature-control", weatherSchema, async function (request, reply) {

      //If latitude, longitude or tempValue are null, set defaultValue (Rio Cuarto)
      //Operator could be higher or lower this affect the result value
      //Cached is always false per default
      const {
        latitude = defVal.latitude,
        longitude = defVal.longitude,
        targetTemperature = defVal.targetTemperature,
        cached = false,
        operator,
      } = request.query as WeatherQueryParams;

      //If there's error with the API then null
      //If cached true, return last temperature cached
      const currentTemperature = await fastify.getCurrentWeather(
        latitude,
        longitude,
        cached,
      );

      //If currentWeather exist, return {currentTemperature, operator, targetTemperature, result: true/false, cached}, statusCode 200
      if(currentTemperature){
        return {
            currentTemperature,
            operator,
            targetTemperature,
            result:
              operator === "higher"
                ? currentTemperature > targetTemperature
                : currentTemperature < targetTemperature,
            cached
          };
      } else {
          //If currentWeather is null, return {message: Error}, statusCode 500
          reply.statusCode = 500;
          return {error: "Internal Error", message: 'An internal error ocurred', statusCode: 500}
      }
    }
  );
};

export default weather;
