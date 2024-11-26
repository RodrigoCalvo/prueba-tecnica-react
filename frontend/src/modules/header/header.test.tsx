import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "./header";
import { useController } from "../../controller/useController";

jest.mock("../../controller/useController", () => ({
  useController: jest.fn(),
}));
jest.mock("react-router-dom");

describe("Header Component", () => {
  test("Then it should render", () => {
    const logoutMock = jest.fn();
    (useController as jest.Mock).mockReturnValue({
      loginState: { user: { name: "testName" } },
      logout: logoutMock,
    });
    render(<Header />);
    const result = screen.getByText(/testName/i);
    expect(result).not.toBeUndefined();
    const button = screen.getByRole("button");
    expect(button).not.toBeUndefined();
    // fireEvent(button, new MouseEvent("click"));
    // expect(logoutMock).toHaveBeenCalled();
  });
});
