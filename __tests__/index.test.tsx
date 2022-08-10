import { Home } from "../pages";
import { render, screen } from "@testing-library/react";

describe("Page - Home", () => {
  it("should render heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { name: /welcome to next\.js!/i });

    expect(heading).toBeInTheDocument();
  });
});
