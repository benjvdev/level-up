import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TopBar from "./TopBar";

jest.mock("../../atoms/Logo/Logo", () => () => <div>Logo</div>);
jest.mock("../../atoms/Search Bar/SearchBar", () => () => <div>SearchBar</div>);
jest.mock("../../atoms/Boton Carrito/BotonCarrito", () => () => <div>BotonCarrito</div>);
jest.mock("../Login Modal/LoginModal", () => () => <div>LoginModal</div>);

describe("TopBar component", () => {

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("modal oculto por defecto", () => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );
    expect(screen.queryByText("LoginModal")).not.toBeInTheDocument();
  });

  it("muestra el modal al hacer clic en 'aquí'", () => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    const link = screen.getByText("aquí");
    fireEvent.click(link);

    expect(screen.getByText("LoginModal")).toBeInTheDocument();
  });

  it("cierra el modal al hacer clic fuera de él", () => {
    render(
      <MemoryRouter>
        <TopBar />
      </MemoryRouter>
    );

    const link = screen.getByText("aquí");
    fireEvent.click(link); // abrir modal
    expect(screen.getByText("LoginModal")).toBeInTheDocument();

    //clic fuera del modal
    fireEvent.mouseDown(document.body);

    //el modal ya no debería estar
    expect(screen.queryByText("LoginModal")).not.toBeInTheDocument();
  });
});