import dV from "./defaultValues";

const weatherSchema = {
  schema: {
    description: 'Get if a temperature is higher or lower than a targetValue in a specific coordinates',
    tags: ['Temperature'],
    querystring: {
      type: "object",
      properties: {
        latitude: { type: "number", default: dV.latitude },
        longiture: { type: "number", default: dV.longitude},
        operator: { type: "string", enum: ['higher','lower'] },
        targetTemperature: { type: "number", default: dV.targetTemperature },
        cached: { type: "boolean", default: false }
      },
      required: ["operator"],
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          currentTemperature: { type: 'number' },
          operator: { type: 'string'},
          targetTemperature: { type: 'number'},
          result: { type: 'boolean'},
          cached: { type: 'boolean'}
        }
      },
      400: {
        description: 'Bad Request',
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Bad Request' },
          message: { type: 'string', default: 'A parameter is missing or wrong' },
          statusCode: { type: 'number', default: 400}
        }
      },
      500: {
        description: 'Internal Error',
        type: 'object',
        properties: {
          error: { type: 'string', default: 'Internal Error' },
          message: { type: 'string', default: 'An internal error ocurred' },
          statusCode: { type: 'number', default: 500}
        }
      },
    }
  },
};

export default weatherSchema;