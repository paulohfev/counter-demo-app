import { render, fireEvent, act } from "@testing-library/react";
import Counter from ".";

describe('Counter Actions', () => {
  it("should display the correct initial count", () => {
    const { getByTestId } = render(<Counter initialCount={0} />);
    const countValue = Number(getByTestId("count").textContent);
    expect(countValue).toEqual(0);
  });

  it("should increment count by 1 if the increment button is clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={0} />);
    const incrementButton = getByRole("button", { name: "Increment" });

    fireEvent.click(incrementButton);
    const incrementedCountValue = Number(getByTestId("count").textContent);
    expect(incrementedCountValue).toEqual(1);
  });

  it("should decrement count by 1 if the decrement button is clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={0} />);
    const decrementButton = getByRole("button", { name: "Decrement" });

    fireEvent.click(decrementButton);
    const decrementedCountValue = Number(getByTestId("count").textContent);
    expect(decrementedCountValue).toEqual(-1);
  });

  it("should reset count to 0 if the restart button is clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={50} />);
    const restartButton = getByRole("button", { name: "Restart" });

    fireEvent.click(restartButton);
    const newCountValue = Number(getByTestId("count").textContent);
    expect(newCountValue).toEqual(0);
  });

  it("should invert the sign of the value if the switch signs button is clicked", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={10} />);
    const switchButton = getByRole("button", { name: "Switch Signs" });

    fireEvent.click(switchButton);
    const newCountValue = Number(getByTestId("count").textContent);
    expect(newCountValue).toEqual(-10);
  });
});

describe('Counter error handling', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should not invert the sign of the value if the current count is 0", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={0} />);
    const switchButton = getByRole("button", { name: "Switch Signs" });

    fireEvent.click(switchButton);
    const currentValue = Number(getByTestId("count").textContent);
    expect(currentValue).toEqual(0);
  });

  it("should display an error message if the user tries to invert 0", () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={0} />);
    const switchButton = getByRole("button", { name: "Switch Signs" });

    fireEvent.click(switchButton);

    const errorMessage = getByTestId("error");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should remove the error message after 1.2 seconds", async () => {
    const { getByRole, getByTestId } = render(<Counter initialCount={0} />);
    const switchButton = getByRole("button", { name: "Switch Signs" });

    fireEvent.click(switchButton);

    const errorMessage = getByTestId("error");
    expect(errorMessage).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1200));
    expect(errorMessage).not.toBeInTheDocument();
  });
});
