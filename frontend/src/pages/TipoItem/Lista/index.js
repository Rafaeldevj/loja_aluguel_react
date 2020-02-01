import React, {useCallback, useEffect, useState} from "react";

import {Button, Container, Table, Row, Col, Spinner, Alert} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faEye, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

import TipoItemFormulario from "../Formulario";
import ModalRemover from "../../../components/modalRemover";
import TipoItemView from "../View";

import api from "../../../services/api";

function Listagem(props) {

    const [tipoItens, setTipoItens] = useState([]);

    const [exibeFormulario, setExibeFormulario] = useState(false);
    const [exibeModalRemover, setExibeModalRemover] = useState(false);
    const [exibeModalView, setExibeModalView] = useState(false);

    const [semTipoItens, setSemTipoItens] = useState(false);
    const [carregando, setCarregando] = useState(true);

    const [tipoItem, setTipoItem] = useState({
        id: 0,
        nome: ''
    });

    useEffect(() => {
        carregaTipoItens();
    }, []);

    const carregaTipoItens = useCallback(async () => {

        const response = await api.get('/tipo_item/listar');

        setTimeout(() => {

            if (response.data.length === 0) {
                setSemTipoItens(true);
            }
            setTipoItens(response.data);
            setCarregando(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (!exibeFormulario) {
            carregaTipoItens();
        }
    }, [exibeFormulario, exibeModalRemover]);

    const novoTipoItem = useCallback(() => {

        setTipoItem({
            ...{
                id: 0,
                nome: ''
            }
        });

        setExibeFormulario(true);

    }, []);

    const editarTipoItem = useCallback((tipoItem) => {
        setExibeFormulario(true);
        setTipoItem(tipoItem)
    }, []);

    const removerTipoItem = useCallback((tipoItem) => {
        setTipoItem(tipoItem)
        setExibeModalRemover(true);
    }, []);

    const viewTipoItem = useCallback((tipoItem) => {
        setTipoItem(tipoItem)
        setExibeModalView(true);
    }, []);

    return (
        <Container>

            <TipoItemFormulario show={exibeFormulario} dados={tipoItem} onHide={() => setExibeFormulario(false)}/>

            <TipoItemView show={exibeModalView} dados={tipoItem} onHide={() => setExibeModalView(false)} />

            <ModalRemover
                show={exibeModalRemover}
                dados={tipoItem.id}
                model="tipo_item"
                mensagem="Deseja remover este tipo de item?"
                onHide={() => setExibeModalRemover(false)} />

            <br/>
            <Row>
                <Col md={9}>
                    <h3>Tipo de Item Listagem</h3>
                </Col>
                <Col md={3}>
                    <div className={'button_add_space'}>
                        <Button variant="dark" onClick={novoTipoItem}>
                            <FontAwesomeIcon icon={faPlus} /> Novo Tipo de Item
                        </Button>
                    </div>
                </Col>
            </Row>

            <br/>

            { semTipoItens ?

                <div className={'text-center'}>
                    <Alert variant={"info"}><h4>Nenhum Cliente Cadastrado</h4></Alert>
                </div> :

                <Table bordered>
                    <thead>
                    <tr className={'text-center'}>
                        <th width={'10%'}>Código</th>
                        <th width={'60%'}>Nome</th>
                        <th width={'30%'}>Controle</th>
                    </tr>
                    </thead>
                    <tbody >
                    { tipoItens.map( tipoItem => (
                        <tr className={'text-center'} key={tipoItem.id}>
                            <td>{tipoItem.id}</td>
                            <td>{tipoItem.nome}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => {editarTipoItem(tipoItem)}}>
                                    <FontAwesomeIcon icon={faEdit} /> Editar
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="info" size="sm" onClick={() => {viewTipoItem(tipoItem)}}>
                                    <FontAwesomeIcon icon={faEye} /> Visualizar
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" size="sm" onClick={() => {removerTipoItem(tipoItem)}}>
                                    <FontAwesomeIcon icon={faTrash} /> Remover
                                </Button>
                            </td>
                        </tr>
                    )) }
                    { semTipoItens ?
                        <tr className={'text-center'} key={'sem_tipoItens'}>
                            <td colSpan={3}><h4>Nenhum Tipo de Item Cadastrado...</h4></td>
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
