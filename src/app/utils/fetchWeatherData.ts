import {DayWeather} from "@/app/types/dataTypes";
import {fetchWeatherApi} from "openmeteo";

export async function fetchWeatherData(startDate: Date, endDate: Date) {
    let data: DayWeather[] = [];
    const params = {
        "latitude": 50.2667,
        "longitude": 24.4333,
        "start_date": startDate.toISOString().split('T')[0],
        "end_date": endDate.toISOString().split('T')[0],
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

    return data;
}

export function ValidateDateInput(startDate: Date, endDate: Date, lastStartDate: Date, lastEndDate: Date): boolean {
    // const todayDate = (new Date).getDate()
    // const parsedEndDate = endDate.getDate()
    // const parsedStartDate = startDate.getDate()
    // const parsedLastEndDate = lastEndDate.getDate()
    // const parsedLastStartDate = lastStartDate.getDate()
    //
    // if (parsedEndDate == parsedLastEndDate) {
    //     return false
    // }
    //
    // if (parsedEndDate > todayDate) {
    //     return false
    // }
    //
    // if (parsedStartDate > parsedEndDate) {
    //     return false
    // }

    return true
}