import React, {useCallback, useEffect, useState} from "react";

import {Button, Container, Table, Row, Col, Spinner, Alert} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faEye, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

import ClienteFormulario from "../Formulario";
import ClienteView from "../View";
import ModalRemover from "../../../components/modalRemover";

import api from "../../../services/api";
import './index.css'

function Listagem(props) {

    const [clientes, setClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const [exibeFormulario, setExibeFormulario] = useState(false);
    const [exibeModalRemover, setExibeModalRemover] = useState(false);
    const [exibeModalView, setExibeModalView] = useState(false);

    const [semClientes, setSemClientes] = useState(false);

    const [cliente, setCliente] = useState({
        id: 0,
        nome: '',
        email: '',
        celular: '',
        cpf: ''
    });

    useEffect(() => {
        carregaClientes();
    }, []);

    useEffect(() => {
        if (!exibeFormulario) {
            carregaClientes();
        }
    }, [exibeFormulario, exibeModalRemover]);

    const carregaClientes = useCallback(async () => {

        const response = await api.get('/cliente/listar');

        setTimeout(() => {

            if (response.data.length === 0) {
                setSemClientes(true);
            }
            setClientes(response.data);
            setCarregando(false);
        }, 1000);
    }, []);

    const editarUsuario = useCallback((cliente) => {
        setExibeFormulario(true);
        setCliente(cliente)
    }, []);

    const novoUsuario = useCallback(() => {

        setCliente({
            ...{
                id: 0,
                nome: '',
                email: '',
                celular: '',
                cpf: ''
            }
        });

        setExibeFormulario(true);

    }, []);

    const removerCliente = useCallback((cliente) => {
        setCliente(cliente);
        setExibeModalRemover(true);
    }, []);

    const viewCliente = useCallback((cliente) => {
        setCliente(cliente);
        setExibeModalView(true);
    }, []);

    return (
        <Container>

            <ClienteFormulario show={exibeFormulario} dados={cliente} onHide={() => setExibeFormulario(false)}/>

            <ClienteView show={exibeModalView} dados={cliente} onHide={() => setExibeModalView(false)}/>

            <ModalRemover
                show={exibeModalRemover}
                dados={cliente.id}
                model="cliente"
                mensagem="Deseja remover este cliente?"
                onHide={() => setExibeModalRemover(false)} />

            <br/>
            <Row>
                <Col md={9}>
                    <h3>Cliente Listagem</h3>
                </Col>
                <Col md={3}>
                    <div className={'button_add_space'}>
                        <Button variant="dark" onClick={novoUsuario}>
                            <FontAwesomeIcon icon={faPlus} /> Novo Cliente
                        </Button>
                    </div>
                </Col>
            </Row>

            <br/>

            { semClientes ?

                <div className={'text-center'}>
                    <Alert variant={"info"}><h4>Nenhum Cliente Cadastrado</h4></Alert>
                </div> :

                <Table bordered>
                    <thead>
                    <tr className={'text-center'}>
                        <th width={'10%'}>Código</th>
                        <th width={'40%'}>Nome</th>
                        <th width={'20%'}>Celular</th>
                        <th width={'30%'}>Controle</th>
                    </tr>
                    </thead>
                    <tbody >
                    { clientes.map( cliente => (
                        <tr className={'text-center'} key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.celular}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => {editarUsuario(cliente)}}>
                                    <FontAwesomeIcon icon={faEdit} /> Editar
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="info" size="sm" onClick={() => {viewCliente(cliente)}}>
                                    <FontAwesomeIcon icon={faEye} /> Visualizar
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" size="sm" onClick={() => { removerCliente(cliente) }}>
                                    <FontAwesomeIcon icon={faTrash} /> Remover
                                </Button>
                            </td>
                        </tr>
                    )) }
                    { semClientes ?
                        <tr className={'text-center'} key={'sem_clientes'}>
                            <td colSpan={4}><h4>Nenhum Cliente Cadastrado...</h4></td>
                        </tr> : '' }
                    </tbody>
                </Table>
            }


            <br/>
            { carregando ? <div className={'text-center'}>
                <Spinner animation="border" variant={'info'}/>
            </div> : '' }
        </Container>
    );
}

export default Listagem;
