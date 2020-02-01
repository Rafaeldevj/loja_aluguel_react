import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from "./pages/Inicio/index"
import ClienteListagem from "./pages/Cliente/Lista/index"
import TipoItemListagem from "./pages/TipoItem/Lista/index";
import ItemListagem from "./pages/Item/Lista";
import AluguelListagem from "./pages/Aluguel/Lista";

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Inicio}/>
                <Route path="/inicio" exact component={Inicio}/>
                <Route path="/clientes" exact component={ClienteListagem}/>
                <Route path="/tipoItens" exact component={TipoItemListagem}/>
                <Route path="/itens" exact component={ItemListagem}/>
                <Route path="/alugueis" exact component={AluguelListagem}/>
            </Switch>
        </BrowserRouter>
    )
}
