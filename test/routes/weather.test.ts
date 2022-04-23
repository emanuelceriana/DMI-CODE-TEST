import { build } from '../helper'

describe('weather tests', () => {

  const app = build();

  test('is temperature hotter than currentTemperature degrees', async () => {

    const res = await app.inject({
      url: '/api/weather/temperature-control?operator=higher'
    });

    const result = JSON.parse(res.payload);

    expect(result.result).toEqual(result.currentTemperature > result.targetTemperature);
  })

  test('is temperature colder than currentTemperature degrees', async () => {

    const res = await app.inject({
      url: '/api/weather/temperature-control?operator=lower'
    });

    const result = JSON.parse(res.payload);

    expect(result.result).toEqual(result.currentTemperature < result.targetTemperature);
  })

  test('url had bad parmeters', async () => {

    const res = await app.inject({
      url: '/api/weather/temperature-control?test=test'
    });

    expect(res.statusCode).toEqual(400);
  })

  test('url had missing required parmeter: operator', async () => {

    const res = await app.inject({ 
      url: '/api/weather/temperature-control?latitude=33&longitude=33'
    });

    expect(JSON.parse(res.payload).message).toEqual("querystring should have required property 'operator'");
  })

  test('get cached currentTemperature', async () => {

    const res = await app.inject({ 
      url: '/api/weather/temperature-control?operator=higher&cached=true'
    });

    const result = JSON.parse(res.payload);

    expect(result.cached).toEqual(true);
  });

});