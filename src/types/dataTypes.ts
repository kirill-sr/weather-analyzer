import {Range} from 'react-date-range'

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
  range: Range
  changeRange: (value: Range) => void
}