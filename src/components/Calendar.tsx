import { getDaysInMonth } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";
import { getGoals } from "../services/GoalsService";
import "./Calendar.css";

interface Props {
  todaysGoal: Goal | undefined;
}

// Route to details of goal if clicked
const Calendar = ({ todaysGoal }: Props) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const uid: string | undefined = useParams().uid;
  const newDate: Date = new Date();
  const date = newDate.getDate();
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const fullDate = `${month + 1}.${date}.${year}`;
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const monthName = monthNames[month];
  const params: QueryStringParams = {
    uid,
  };

  const goalsThisMonth = goals.filter((goal) => parseInt(goal.month) === month);
  const calendarCells = [];
  const daysInAMonth = getDaysInMonth(new Date(year, month));
  for (let i = 0; i < daysInAMonth; i++) {
    const index: number = goalsThisMonth.findIndex(
      (goal) => parseInt(goal.day) === i + 1
    );
    if (index === -1) {
      calendarCells.push(null);
    } else {
      calendarCells.push(goals[index]);
    }
  }
  console.log(calendarCells);
  //click left arrow => get and set goals of last months(month)???

  useEffect(() => {
    getGoals(params).then((response) => {
      setGoals(response);
    });
  }, [todaysGoal]);

  return (
    <div className="Calendar">
      {/* <div className="calendar-header">
        <i className="fa-solid fa-angles-left" onClick={()=>{}}></i>
        <p>
          {monthName} {year}
        </p>
        <i className="fa-solid fa-angles-right"></i>
      </div> */}
      <p>
        {monthName} {year}
      </p>
      <ul>
        {calendarCells &&
          calendarCells.map((cell, index) => {
            return cell ? (
              <Link to={`/goals/details/${cell._id}`}>
                <li className="tooltip" data-tooltip="go to the detail page">
                  <p> {index + 1}</p>
                  {cell.completed ? (
                    <i className="fa-solid fa-star"></i>
                  ) : (
                    <i className="fa-solid fa-x"></i>
                  )}
                </li>
              </Link>
            ) : (
              <li>
                <p>{index + 1}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Calendar;

// {goals &&
//   goals.map(
//     (goal) =>
//       goal !== todaysGoal && (
//         <Link to={`/goals/details/${goal._id}`}>
//           <li className="tooltip" data-tooltip={goal.date}>
//             {/* <p className="hide">{goal.date}</p> */}
//             {goal.completed ? (
//               <>
//                 <i className="fa-solid fa-star"></i>
//               </>
//             ) : (
//               <>
//                 <i className="fa-solid fa-x"></i>
//               </>
//             )}
//           </li>
//         </Link>
//       )
//   )}

// //
// {goals &&
//   goals.map(
//     (goal) =>
//       goal !== todaysGoal && (
//         <Link to={`/goals/details/${goal._id}`}>
//           <li className="tooltip" data-tooltip={goal.date}>
//             {/* <p className="hide">{goal.date}</p> */}
//             {goal.completed ? (
//               <>
//                 <i className="fa-solid fa-star"></i>
//               </>
//             ) : (
//               <>
//                 <i className="fa-solid fa-x"></i>
//               </>
//             )}
//           </li>
//         </Link>
//       )
//   )}
