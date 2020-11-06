import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import{ Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();

    }, []);

    const lineChart = (
        dailyData.length 
        ? (
        <Line
        data={{
            labels: dailyData.map(({ date }) => date),
            datasets:[{
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#00DDFA',
                fill: true,
            }, {
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: '#e01e37',
                backgroundColor: 'rgba(217, 4, 41, 0.5)',
                fill: true,
            }],
        }}
        
        />) : null


    );

    const barChart = (
        confirmed
        ? (
            <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 221, 250, 0.8)',
                        'rgba(0, 250, 154, 0.8)',
                        'rgba(224, 30, 55, 0.8)',
                    ],
                    data:[confirmed.value, recovered.value, deaths.value]
                }]

            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}`},
            }}
            />
        ) : null
    );


    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}

        </div>
    )
}

export default Chart;