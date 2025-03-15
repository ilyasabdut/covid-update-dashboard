import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ covid, index }) {
  const data = {
    labels: ["Infected", "Recovered", "Fatal"], // Categories for the numbers
    datasets: [
      {
        label: covid.name, // Province name as the dataset label
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Color for "Infected"
          "rgba(54, 162, 235, 0.6)", // Color for "Recovered"
          "rgba(255, 99, 132, 0.6)"  // Color for "Fatal"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)"
        ],
        borderWidth: 1,
        data: [
          covid.numbers.infected, // Infected cases
          covid.numbers.recovered, // Recovered cases
          covid.numbers.fatal // Fatal cases
        ]
      }
    ]
  };

  return (
    <div className="chart">
      <Bar key={index} data={data} />
    </div>
  );
}
