export type WeatherQueryParams = {
    latitude?: Number,
    longitude?: Number,
    targetTemperature?: Number, 
    operator: Operator,
    cached: boolean
}

enum Operator {
    Higher = 'higher',
    Lower = 'lower'
}