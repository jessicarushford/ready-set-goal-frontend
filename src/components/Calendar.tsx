import { getDaysInMonth } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Goal from "../models/Goal";
import QueryStringParams from "../models/QueryStringParams";
import { getGoals } from "../services/GoalsService";
import "./Calendar.css";

interface Props {
  todaysGoal?: Goal | undefined;
}

// Route to details of goal if clicked
const Calendar = ({ todaysGoal }: Props) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const uid: string | undefined = useParams().uid;
  const location = useLocation();
  const path = location.pathname;
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
  const lastYear = year - 1;
  const params: QueryStringParams = {
    uid,
  };
  const lastMonthName = month === 0 ? monthNames[11] : monthNames[month - 1];

  const daysInAMonth = getDaysInMonth(new Date(year, month));

  //Calendar this month
  const goalsThisMonth = goals.filter((goal) => parseInt(goal.month) === month);
  const calendarCells = [];
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

  //calendar last month
  const goalsLastMonth = goals.filter(
    (goal) => parseInt(goal.month) === month - 1
  );
  const lastMonthCalendarCells = [];
  for (let i = 0; i < daysInAMonth; i++) {
    const index: number = goalsLastMonth.findIndex(
      (goal) => parseInt(goal.day) === i + 1
    );
    if (index === -1) {
      lastMonthCalendarCells.push(null);
    } else {
      lastMonthCalendarCells.push(goals[index]);
    }
  }

  useEffect(() => {
    getGoals(params).then((response) => {
      setGoals(response);
    });
  }, [todaysGoal]);

  return (
    <div className="Calendar">
      <p className="monthName">
        {monthName} {year}
      </p>
      <ul>
        {calendarCells &&
          calendarCells.map((cell, index) => {
            return cell ? (
              <Link to={`/goals/details/${cell._id}`}>
                <li className="tooltip" data-tooltip="go to the detail page">
                  <p className="index"> {index + 1}</p>
                  {cell.completed ? (
                    <i className="fa-solid fa-star"></i>
                  ) : (
                    <i className="fa-solid fa-x"></i>
                  )}
                </li>
              </Link>
            ) : (
              <li>
                <p className="index">{index + 1}</p>
              </li>
            );
          })}
      </ul>
      {lastMonthCalendarCells && path === `/users/me/summary/${uid}` ? (
        <>
          <p className="monthName">
            {month === 0
              ? `${lastMonthName} ${lastYear}`
              : `${lastMonthName} ${year}`}
          </p>
          <ul>
            {lastMonthCalendarCells.map((cell, index) => {
              return cell ? (
                <Link to={`/goals/details/${cell._id}`}>
                  <li className="tooltip" data-tooltip="go to the detail page">
                    <p className="index"> {index + 1}</p>
                    {cell.completed ? (
                      <i className="fa-solid fa-star"></i>
                    ) : (
                      <i className="fa-solid fa-x"></i>
                    )}
                  </li>
                </Link>
              ) : (
                <li>
                  <p className="index">{index + 1}</p>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Calendar;

//click left arrow => get and set goals of last months(month)???
{
  /* <div className="calendar-header">
        <i className="fa-solid fa-angles-left" onClick={()=>{}}></i>
        <p>
          {monthName} {year}
        </p>
        <i className="fa-solid fa-angles-right"></i>
      </div> */
}

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
