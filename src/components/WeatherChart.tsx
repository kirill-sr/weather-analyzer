'use client'
import dynamic from "next/dynamic";
import {CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis} from "recharts";
import {WeatherData} from "@/types/dataTypes";
import React from "react";

const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export const WeatherChart: React.FC<WeatherData> = ({data}) => {
  return (
    <div>
      <LineChart width={1400} height={500} data={data}>
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="time" />
        <YAxis/>
        <Tooltip payload={[{unit: 'kg'}]} />
        <Legend />
        <Line type="monotone" dataKey="maxTemp" stroke="#ff4500" />
        <Line type="monotone" dataKey="minTemp" stroke="#63b8ff" />
      </LineChart>
    </div>
  )
}