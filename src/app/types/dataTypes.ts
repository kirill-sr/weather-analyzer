export interface DayWeather {
    time: string,
    minTemp: number,
    maxTemp: number,
}

export interface WeatherData {
    data: DayWeather[]
}

export interface HomeProps {
    props: {
        weatherData: DayWeather[]
    }
}

export interface CustomDatePickerProps {
    label: string
    defaultDate: Date
    changeValue: (value: Date) => void
}