import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

test("Renders Header", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const headingElement = screen.getByRole("heading", {
    name: "Ready-Set-Goal",
  });
  expect(headingElement).toBeInTheDocument();
});
