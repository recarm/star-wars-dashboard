import React, { useEffect, useState, useRef, useCallback } from "react";
import { Chart } from "react-chartjs-2";
import Loader from "react-loader-spinner";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        maxTicksLimit: 60,
        color: "black",
      },
    },
    y: {
      ticks: {
        maxTicksLimit: 20,
        color: "black",
      },
    },
  },
};

const BarChart = (props) => {
  const { items, isLoaded } = props;
  const [labels, setLabels] = useState([]);
  const chartContainer = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setLabels(
      items.map(function (e) {
        return e.name;
      })
    );
  }, [items]);

  useEffect(() => {
    if (labels.length === 0) return;
    if (chartContainer && chartContainer.current) {
      const newChart = new Chart(chartContainer.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "population",
              data: items.map(function (e) {
                return e["population"];
              }),
              backgroundColor: "#3D3337",
            },
          ],
        },
        options: options,
      });
      setChart(newChart);
    }
  }, [chartContainer, items, labels]);

  const updateDataset = useCallback(
    (filter) => {
      chart.data.datasets[0].label = filter;
      chart.data.datasets[0].data = items.map(function (e) {
        return e[filter];
      });
      chart.update();
    },
    [chart, items]
  );

  if (!isLoaded) {
    return (
      <div className="center">
        <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <div>
      <div className="BarChart">
        <canvas ref={chartContainer} width="1000px"></canvas>
      </div>
      <div className="BarChartMenu">
        <button onClick={() => updateDataset("population")}>Population</button>
        <button onClick={() => updateDataset("rotation_period")}>
          Rotation Period
        </button>
        <button onClick={() => updateDataset("orbital_period")}>
          Orbital Period
        </button>
        <button onClick={() => updateDataset("diameter")}>Diameter</button>
        <button onClick={() => updateDataset("surface_water")}>
          Surface Water
        </button>
      </div>
    </div>
  );
};
export default BarChart;
