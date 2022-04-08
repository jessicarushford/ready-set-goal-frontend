import { useEffect, useState } from "react";
import { getDailyQuote } from "../services/ZenQuotesService";
import ZenQuoteResponse from "../ZenQuoteResponse";
import "./Dashboard.css";

// PUT IN HOME ROUTE
const Dashboard = () => {
  const [quote, setQuote] = useState<ZenQuoteResponse>();

  useEffect(() => {
    getDailyQuote().then((response) => {
      setQuote(response);
    });
  }, []);

  return (
    <div className="Dashboard">
      <p>{quote!.q}</p>
      <p>{quote!.a}</p>
    </div>
  );
};

export default Dashboard;
