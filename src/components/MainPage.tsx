'use client'
import styles from "../styles/main.module.css";
import {WeatherChart} from "@/components/WeatherChart";
import {fetchWeatherData} from "@/utils/fetchWeatherData";
import {useEffect, useState} from "react";
import {DayWeather} from "@/types/dataTypes";
import {CustomDateRangePicker} from "@/components/DateRangePicker";
import {getLastEndDate, getLastStartDate} from "@/utils/dateHelper";
import {Range} from "react-date-range"

export default function MainPage() {
  const [data, setData] = useState<DayWeather[]>([]);
  const [range, setRange] = useState<Range>({
    startDate: getLastStartDate(),
    endDate: getLastEndDate(),
    key: 'selection'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async (startDate: Date, endDate: Date) => {
      const weatherData = await fetchWeatherData(startDate, endDate)
      setData(weatherData)
      setIsLoading(false)
    }

    if (range.startDate && range.endDate) {
      fetchData(range.startDate, range.endDate)
    }
  }, [])

  useEffect(() => {
    const fetchData = async (startDate: Date, endDate: Date) => {
      const weatherData = await fetchWeatherData(startDate, endDate)
      setData(weatherData)
    }

    if (range.startDate && range.endDate) {
      localStorage.setItem('lastStartDate', range.startDate.toString())
      localStorage.setItem('lastEndDate', range.endDate.toString())
      fetchData(range.startDate, range.endDate)
    }
  }, [range]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {
          !isLoading &&
            <CustomDateRangePicker range={range} changeRange={setRange} />
        }
        <WeatherChart data={data} />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
