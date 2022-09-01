import { Home } from "../pages/index.page";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../src/store";

jest.mock("react-use-websocket", () => jest.fn(() => ({ sendMessage: jest.fn() })));

describe("Page - Home", () => {
  it("should render heading", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const heading = screen.getByRole("heading", { name: /welcome to next\.js!/i });

    expect(heading).toBeInTheDocument();
  });
});
