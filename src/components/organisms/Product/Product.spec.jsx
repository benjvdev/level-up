import { fireEvent, render, screen } from "@testing-library/react";
import Product from "./Product";
import React from "react";
import { MemoryRouter } from "react-router-dom"; 

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
  Storage.prototype.setItem = jest.fn();
});

describe("Product component", () => {
  const mockProduct = {
    code: "1",
    image: "http://example.com/image1.png",
    name: "Oso patriarcal",
    description: "Oso machista opresor",
    price: "15990",
    category: "peluches"
  };

  it("se renderiza correctamente", () => {
    render(
      <MemoryRouter>
        <Product {...mockProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText("Oso patriarcal")).toBeInTheDocument();
    expect(screen.getByText("15990")).toBeInTheDocument();
    expect(screen.getByText("Añadir al carro")).toBeInTheDocument();
  });

  it("llama correctamente al localStorage al hacer clic en Añadir al carro", () => {
    render(
      <MemoryRouter>
        <Product {...mockProduct} />
      </MemoryRouter>
    );

    const button = screen.getByText("Añadir al carro");
    fireEvent.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "products",
      JSON.stringify([mockProduct])
    );
  });
});