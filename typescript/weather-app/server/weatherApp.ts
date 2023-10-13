import { GenezioDeploy } from "@genezio/types";
import got from 'got';

type WeatherInfo = {
    temperature: number 
}

@GenezioDeploy()
export class WeatherService {
    async getWeatherInfo(locationLat: number, locationLong: number): Promise<WeatherInfo> {
        const { current } = await got.get(`https://api.open-meteo.com/v1/forecast?latitude=${locationLat}&longitude=${locationLong}&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`).json();

        return {
            temperature: current.temperature_2m,
        }
    }
}
