import { useEffect, useState } from "react";
import { getTodaysQuote } from "../services/ZenQuotesService";
import ZenQuoteResponse from "../models/ZenQuoteResponse";
import "./DashboardRoute.css";

// PUT IN HOME ROUTE
const DashboardRoute = () => {
  const [quote, setQuote] = useState<ZenQuoteResponse>();

  useEffect(() => {
    getTodaysQuote().then((response) => {
      console.log(response);
      setQuote(response);
    });
  }, []);

  return (
    <div className="DashboardRoute">
      {quote ? <p>{quote.q}</p> : <p>Loading</p>}
      {quote ? <p>{quote.a}</p> : <p> Loading</p>}
    </div>
  );
};

//{quote.a} / {quote ? <p>{quote.q}</p> : <p>Loading</p>} why different?

export default DashboardRoute;
