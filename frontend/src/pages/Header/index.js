import React from "react";
import {Navbar, NavbarBrand, Nav} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCubes, faHome, faShoppingCart, faUsers} from '@fortawesome/free-solid-svg-icons'
import NavLink from "react-bootstrap/NavLink";
import {faClipboardList} from "@fortawesome/free-solid-svg-icons/faClipboardList";

function Header() {

    return (
        <Navbar bg="dark" expand="lg" variant={'dark'}>
            <NavbarBrand href="inicio">Loja de Aluguel Digivox</NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink href="inicio">
                        <FontAwesomeIcon icon={faHome} /> Início
                    </NavLink>
                    <NavLink href="clientes">
                        <FontAwesomeIcon icon={faUsers} /> Clientes
                    </NavLink>
                    <NavLink href="tipoItens">
                        <FontAwesomeIcon icon={faCubes} /> Tipo de Itens
                    </NavLink>
                    <NavLink href="itens">
                        <FontAwesomeIcon icon={faClipboardList} /> Itens
                    </NavLink>
                    <NavLink href="alugueis">
                        <FontAwesomeIcon icon={faShoppingCart} /> Alugueis
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
