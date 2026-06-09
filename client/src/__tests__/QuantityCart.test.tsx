import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QuantityCart from "../pages/ProductDetail/Components/QuantityCart/QuantityCart";
import "@testing-library/jest-dom/vitest";

describe("QuantityCart", () => {
  it("disables add and buy buttons when disabled prop is true", () => {
    const noop = () => {};
    render(
      <QuantityCart
        quantity={1}
        added={false}
        outOfStock={false}
        disabled={true}
        disabledReason={"You own this listing"}
        onDecrease={noop}
        onIncrease={noop}
        onAddToCart={noop}
        onBuyNow={noop}
      />,
    );

    const addBtn = screen.getByRole("button", { name: /add to cart/i });
    const buyBtn = screen.getByRole("button", { name: /buy now/i });

    expect(addBtn).toBeDisabled();
    expect(buyBtn).toBeDisabled();
    expect(addBtn).toHaveAttribute("title", "You own this listing");
  });
});
