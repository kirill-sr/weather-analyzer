'use client'
import styles from "./page.module.css";
import {WeatherChart} from "@/app/components/WeatherChart";
import {fetchWeatherData, ValidateDateInput} from "@/app/utils/fetchWeatherData";
import {CustomDatePicker} from "@/app/components/DatePicker";
import {useEffect, useState} from "react";
import {DayWeather} from "@/app/types/dataTypes";
import {newDate} from "react-datepicker/dist/date_utils";

export default function Home() {
    const [data, setData] = useState<DayWeather[]>([]);
    const [startDate, setStartDate] = useState<Date>(new Date)
    const [endDate, setEndDate] = useState<Date>(new Date)

    useEffect(() => {
        const fetchData = async (startDate: Date, endDate: Date) => {
            const weatherData = await fetchWeatherData(startDate, endDate)
            setData(weatherData)
        }
        const lastStartDateItem = localStorage.getItem('lastStartDate')
        const lastEndDateItem = localStorage.getItem('lastEndDate')

        if (!lastStartDateItem) {
            const oneMonthAgoDate = new Date(new Date().setDate(new Date().getDate() - 30))
            localStorage.setItem('lastStartDate', oneMonthAgoDate.toString())
            setStartDate(oneMonthAgoDate)
        }

        if (!lastEndDateItem) {
            localStorage.setItem('lastEndDate', endDate.toString())
        }

        if (data.length === 0 && lastStartDateItem && lastEndDateItem) {
            const lastStartDate = new Date(lastStartDateItem)
            const lastEndDate = new Date(lastEndDateItem)

            setStartDate(lastStartDate);
            setEndDate(lastEndDate);
            fetchData(lastStartDate, lastEndDate)
        }
    }, [])

    useEffect(() => {
        const lastStartDate = localStorage.getItem('lastStartDate')
        const lastEndDate = localStorage.getItem('lastEndDate')

        const fetchData = async (startDate: Date, endDate: Date) => {
            const weatherData = await fetchWeatherData(startDate, endDate)
            setData(weatherData)
        }

        if (data.length !== 0 && lastStartDate && lastEndDate) {
            if (new Date(lastStartDate).getDate() === startDate.getDate() && new Date(lastEndDate).getDate() === endDate.getDate()) {
                return
            }

            if (ValidateDateInput(startDate, endDate, new Date(lastStartDate), new Date(lastEndDate))) {
                fetchData(startDate, endDate)
                localStorage.setItem('lastStartDate', startDate.toString())
                localStorage.setItem('lastEndDate', endDate.toString())
            }
        }
    }, [startDate, endDate]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <WeatherChart data={data}/>
        <CustomDatePicker label={'From: '} defaultDate={startDate} changeValue={setStartDate} />
        <CustomDatePicker label={'To: '} defaultDate={endDate} changeValue={setEndDate} />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
