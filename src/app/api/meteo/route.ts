import {DayWeather} from "@/types/dataTypes";
import {fetchWeatherApi} from "openmeteo";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const data: DayWeather[] = [];
    const params = {
        "latitude": 50.2667,
        "longitude": 24.4333,
        "start_date": searchParams.get('start_date'),
        "end_date": searchParams.get('end_date'),
        "daily": ["temperature_2m_max", "temperature_2m_min"]
    };
    const url = "https://historical-forecast-api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();

    const daily = response.daily()!;

    const weatherData = {

        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2mMax: daily.variables(0)!.valuesArray()!,
            temperature2mMin: daily.variables(1)!.valuesArray()!,
        },

    };

    for (let i = 0; i < weatherData.daily.time.length; i++) {
        data.push({
            time: weatherData.daily.time[i].toString().slice(4, 10),
            minTemp: Math.round(weatherData.daily.temperature2mMin[i]),
            maxTemp: Math.round(weatherData.daily.temperature2mMax[i])
        })
    }

    return NextResponse.json(data)
}