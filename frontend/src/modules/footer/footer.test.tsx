import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";
import { useController } from "../../controller/useController";

jest.mock("../../controller/useController", () => ({
  useController: jest.fn(),
}));

describe("Footer Component", () => {
  test("Then it should render", () => {
    (useController as jest.Mock).mockReturnValue({
      charactersList: { attributionText: "test" },
    });
    render(<Footer />);
    const result = screen.getByText("test");
    expect(result).not.toBeUndefined();
  });
});
