import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import "./PieChart.css";
Chart.register(Tooltip, Title, ArcElement, Legend);

interface Props {
  achieved: boolean;
  nutritionAchieved: number;
  nutritionMissed: number;
  exerciseAchieved: number;
  exerciseMissed: number;
  leisureAchieved: number;
  leisureMissed: number;
  financialAchieved: number;
  financialMissed: number;
  personalAchieved: number;
  personalMissed: number;
  otherAchieved: number;
  otherMissed: number;
}

function PieChart({
  achieved,
  nutritionAchieved,
  nutritionMissed,
  exerciseAchieved,
  exerciseMissed,
  leisureAchieved,
  leisureMissed,
  financialAchieved,
  financialMissed,
  personalAchieved,
  personalMissed,
  otherAchieved,
  otherMissed,
}: Props) {
  const achievedData = {
    datasets: [
      {
        data: [
          nutritionAchieved,
          exerciseAchieved,
          leisureAchieved,
          financialAchieved,
          personalAchieved,
          otherAchieved,
        ],
        backgroundColor: [
          "#658B92",
          "#E2A39B",
          "#E8A283",
          "#B5957E",
          "#887CA1",
          "#fff",
        ],
      },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      "Nutrition",
      "Exercise",
      "Leisure",
      "Financial",
      "Personal",
      "Other",
    ],
  };

  const missedData = {
    datasets: [
      {
        data: [
          nutritionMissed,
          exerciseMissed,
          leisureMissed,
          financialMissed,
          personalMissed,
          otherMissed,
        ],
        backgroundColor: [
          "#658B92",
          "#E2A39B",
          "#E8A283",
          "#B5957E",
          "#887CA1",
          "#fff",
        ],
      },
    ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      "Nutrition",
      "Exercise",
      "Leisure",
      "Financial",
      "Personal",
      "Other",
    ],
  };

  return (
    <div className="PieChart">
      {achieved ? <Pie data={achievedData} /> : <Pie data={missedData} />}
    </div>
  );
}

export default PieChart;
