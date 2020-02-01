import React, {useEffect, useState, useCallback} from "react";

import {Button, Container, Table, Row, Col, Spinner, Alert, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faEye, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

import ItemFormulario from "../Formulario";
import ModalRemover from "../../../components/modalRemover";
 import ItemView from "../View";

import api from "../../../services/api";

function ItemListagem(props) {

    const [itens, setItens] = useState([]);

    const [exibeFormulario, setExibeFormulario] = useState(false);
    const [exibeModalRemover, setExibeModalRemover] = useState(false);
    const [exibeModalView, setExibeModalView] = useState(false);

    const [semItens, setSemItens] = useState(false);
    const [carregando, setCarregando] = useState(true);

    const [item, setItem] = useState({
        id: 0,
        nome: '',
        valor: 0,
        descricao: '',
        tipoItem: {
            id: 0,
            nome: ''
        }
    });

    useEffect(() => {
        carregaItens();
    }, []);

    async function carregaItens() {

        const response = await api.get('/item/listar');

        setTimeout(() => {

            if (response.data.length === 0) {
                setSemItens(true);
            }
            setItens(response.data);
            setCarregando(false);
        }, 1000);

    }



    useEffect(() => {
        if (!exibeFormulario || !exibeModalRemover) {
            carregaItens();
        }
    }, [exibeFormulario, exibeModalRemover]);

    const notoItem = useCallback(() => {

        setItem({
            ...{
                id: 0,
                nome: '',
                valor: 0,
                descricao: '',
                disponivel: 'S',
                ...{
                    tipoItem: {
                        id: 0
                    }
                }
            }
        });

        setExibeFormulario(true);

    }, []);

    const editarItem = useCallback((item) => {
        setExibeFormulario(true);
        setItem(item)
    }, []);

    const removerTipoItem = useCallback((item) => {
        setItem(item)
        setExibeModalRemover(true);
    }, []);

    const viewItem = useCallback((item) => {
        setItem(item)
        setExibeModalView(true);
    }, []);

    return (
        <Container>

            <ItemFormulario show={exibeFormulario} dados={item} onHide={() => setExibeFormulario(false)} />

            <ItemView show={exibeModalView} dados={item} onHide={() => setExibeModalView(false)} />

            <ModalRemover
                show={exibeModalRemover}
                dados={item.id}
                model="item"
                mensagem="Deseja remover este item?"
                onHide={() => setExibeModalRemover(false)} />

            <br/>
            <Row>
                <Col md={9}>
                    <h3>Itens Listagem</h3>
                </Col>
                <Col md={3}>
                    <div className={'button_add_space'}>
                        <Button variant="dark" onClick={notoItem}>
                            <FontAwesomeIcon icon={faPlus} /> Novo Item
                        </Button>
                    </div>
                </Col>
            </Row>

            <br/>

            { semItens ?

                <div className={'text-center'}>
                    <Alert variant={"info"}><h4>Nenhum Cliente Cadastrado</h4></Alert>
                </div> :

                <Table bordered>
                    <thead>
                    <tr className={'text-center'}>
                        <th width={'10%'}>Código</th>
                        <th width={'30%'}>Nome</th>
                        <th width={'15%'}>Valor (diária)</th>
                        <th width={'15%'}>Situação</th>
                        <th width={'30%'}>Controle</th>
                    </tr>
                    </thead>
                    <tbody >
                    { itens.map( item => (
                        <tr className={'text-center'} key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>R$ {item.valor}</td>
                            <td>
                                {item.disponivel === 'S' ?
                                    <Badge variant="success">Disponível</Badge> :
                                    <Badge variant="danger">Indisponível</Badge> }
                            </td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => {editarItem(item)}}>
                                    <FontAwesomeIcon icon={faEdit} /> Editar
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="info" size="sm" onClick={() => {viewItem(item)}}>
                                    <FontAwesomeIcon icon={faEye} /> Visualizar
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" size="sm" onClick={() => {removerTipoItem(item)}}>
                                    <FontAwesomeIcon icon={faTrash} /> Remover
                                </Button>
                            </td>
                        </tr>
                    )) }
                    { semItens ?
                        <tr className={'text-center'} key={'sem_tipoItens'}>
                            <td colSpan={5}><h4>Nenhum Item Cadastrado...</h4></td>
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

export default ItemListagem;
