import { render, screen } from "@testing-library/react";
import Cart from "./Cart";
import React from "react";
import { MemoryRouter } from "react-router-dom"; // 👈 Importante

describe('Cart component', () => {
  const mockProducts = [
    {
      code: "1",
      image: "http://example.com/image1.png",
      name: "Oso patriarcal",
      description: "Oso machista opresor",
      price: "15990"
    },
    {
      code: "2",
      image: "http://example.com/image2.png",
      name: "Oso africano",
      description: "Oso tamaño promedio",
      price: "22990"
    }
  ];

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockProducts));
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  it('Renderiza productos del storage', () => {
    render(
      <MemoryRouter>       
        <Cart />
      </MemoryRouter>
    );
    expect(screen.getByText("Oso patriarcal")).toBeInTheDocument();
    expect(screen.getByText("Oso africano")).toBeInTheDocument();
  });

  it('Muestra mensaje de carrito vacío cuando no hay productos', () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();
  });
});