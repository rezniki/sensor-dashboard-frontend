import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import type { Reading } from "../types/Reading";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

interface Props {
    readings: Reading[];
}

export const TemperatureChart: React.FC<Props> = ({ readings }) => {
    const data = {
        labels: readings.map(r =>
        new Date(r.ts).toLocaleTimeString("ru-RU", { hour12: false })
        ),
        datasets: [
        {
            label: "Температура (°C)",
            data: readings.map(r => r.value),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: true,
            tension: 0.3,
            pointRadius: 3
        }
        ]
    };

    const options = {
        responsive: true,
        scales: {
        y: {
            min: 0,
            max: 100
        }
        },
        plugins: {
        legend: { position: "top" as const },
        title: {
            display: true,
            text: "График температуры в реальном времени"
        }
        }
    };

    return <Line data={data} options={options} />;
};
