import { useEffect, useState } from "react";
import { getDailyQuote } from "../services/ZenQuotesService";
import ZenQuoteResponse from "../model/ZenQuoteResponse";
import "./DashboardRoute.css";

// PUT IN HOME ROUTE
const DashboardRoute = () => {
  const [quote, setQuote] = useState<ZenQuoteResponse[]>([]);

  useEffect(() => {
    getDailyQuote().then((response) => {
      console.log(response);
      setQuote(response);
    });
  }, []);

  return (
    <div className="DashboardRoute">
      <p>dashboard</p>
      <p>{quote[0]?.a}</p>
      <p>{quote}</p>
      <p>
        Inspirational quotes provided by
        <a href="https://zenquotes.io/" target="_blank">
          ZenQuotes API
        </a>
      </p>
    </div>
  );
};

export default DashboardRoute;
