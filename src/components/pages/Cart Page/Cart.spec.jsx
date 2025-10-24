import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe('Cart component', () => {
  const mockProducts = [
    {
      code: "1",
      image: "http://example.com/image1.png",
      name: "Catan",
      description: "En familia o con amigos, Catan es el juego de mesa imprescindible.",
      price: "29990"
    },
    {
      code: "2",
      image: "http://example.com/image2.png",
      name: "Carcassonne",
      description: "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne.",
      price: "24990"
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
    expect(screen.getByText("Catan")).toBeInTheDocument();
    expect(screen.getByText("Carcassonne")).toBeInTheDocument();
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

  it('Llama a localStorage.setItem al aumentar cantidad', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const increaseButton = screen.getAllByText("+")[0];
    fireEvent.click(increaseButton);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Llama a localStorage.setItem al disminuir cantidad', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    const decreaseButton = screen.getAllByText("-")[0];
    fireEvent.click(decreaseButton);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Llama a localStorage.setItem al eliminar un producto', () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    const removeButton = screen.getAllByText("Eliminar")[0];
    fireEvent.click(removeButton);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'products',
      expect.any(String)
    );
  });
});