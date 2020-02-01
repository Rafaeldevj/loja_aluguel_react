import React, {useEffect, useState} from "react";

import api from "../../services/api";
import {Col, Row, Table} from "react-bootstrap";

function Inicio() {

    const [alugueis, setAlugueis] = useState([]);
    const [reservas, setReservas] = useState([]);
    const data = new Date();
    const [dataFinal, setDataFinal] = useState(null);


    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        const responseAlugueis = await api.get('/aluguel/dashboard_aluguel');
        setAlugueis(responseAlugueis.data);

        const responseReservas = await api.get('/aluguel/dashboard_reserva');
        setReservas(responseReservas.data);

        data.setDate(data.getDate() + 7);

        setDataFinal(data.toISOString().slice(0,10));

        console.log(data);

    }

    function refatoraData(data) {
        if (data !== null) {
            const ano = data.slice(0, 4);
            const mes = data.slice(5, 7);
            const dia = data.slice(8, 10);

            return `${dia}/${mes}/${ano}`
        }

        return null;
    }

    return (
        <div>
            <br/>

            <Row>
                <Col>
                    <div className="text-center">
                        <h4>Exibindo dados do período de { refatoraData(new Date().toISOString().slice(0,10)) } à { refatoraData(dataFinal) }</h4>
                    </div>
                </Col>
            </Row>
            <br/>
            <Row>

                <Col xs={6}>
                    <div className={'text-center'}>
                        <h3>Itens Alugados</h3>
                        <br/>
                        <div style={{marginLeft: 10, marginRight: 10}}>
                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Item</th>
                                        <th>Data de Devolução</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        alugueis.length > 0 ?
                                            alugueis.map(aluguel => (
                                                <tr key={aluguel.id}>
                                                    <td>{aluguel.cliente.nome}</td>
                                                    <td>{aluguel.item.nome}</td>
                                                    <td>{refatoraData(aluguel.dataDevolucao)}</td>
                                                    <td>R${aluguel.valor}</td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td colSpan="4"><h5>Nenhum aluguel registrado neste período</h5></td>
                                            </tr>
                                    }

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>

                <Col xs={6}>
                    <div className={'text-center'}>
                        <h3>Itens Reservados</h3>
                        <br/>
                        <div style={{marginLeft: 10, marginRight: 10}}>
                            <Table bordered hover>
                                <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Item</th>
                                    <th>Data de Devolução</th>
                                    <th>Valor</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    reservas.length > 0 ?
                                        reservas.map(reserva => (
                                            <tr key={reserva.id}>
                                                <td>{reserva.cliente.nome}</td>
                                                <td>{reserva.item.nome}</td>
                                                <td>{refatoraData(reserva.dataDevolucao)}</td>
                                                <td>R${reserva.valor}</td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td colSpan="4"><h4>Nenhuma reserva registrado neste período</h4></td>
                                        </tr>
                                }

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Col>


            </Row>



        </div>
    );
}

export default Inicio;
