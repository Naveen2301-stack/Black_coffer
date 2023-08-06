import React, { useEffect, useState } from 'react';
import { Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const MyChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Likelihood',
      data: [],
      backgroundColor: [],
      hoverOffset: 4
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/getAllData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataFromAPI = await response.json();

        console.log('API Response:', dataFromAPI); 

        if (Array.isArray(dataFromAPI)) {
          const topics = dataFromAPI.map((entry) => entry.topic);
          const likelihood = dataFromAPI.map((entry) => entry.likelihood);
          const relevance = dataFromAPI.map((entry) => entry.relevance);
          const intensity = dataFromAPI.map((entry) => entry.intensity);
          const year = dataFromAPI.map((entry) => entry.year);
          const country = dataFromAPI.map((entry) => entry.country);
          const region = dataFromAPI.map((entry) => entry.region);
          const city = dataFromAPI.map((entry) => entry.c);
          

          const updatedChartData = {
            labels: topics,
            datasets: [{
              label: 'Likelihood',
              data: likelihood,
              backgroundColor: [
                'rgb(255, 99, 132)',
                 'rgb(54, 162, 235)',
                 'rgb(255, 205, 86)',
              ],
              hoverOffset: 4
            }]
          };

          setChartData(updatedChartData);
        } else {
          console.error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const config = {
  //   type: 'doughnut',
  //   data: chartData,
  // };

  return (
    <div>
     <Doughnut key={Math.random()} data={chartData} />
    </div>
  );
};

export default MyChart;
 
 




