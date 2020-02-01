import React, {useCallback, useEffect, useState} from "react";

import {Button, Table, Row, Col, Spinner, Alert, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faEye, faHandPointLeft, faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

// import ModalRemover from "../../../components/modalRemover";
import AluguelView from "../View";
import AluguelFormulario from "../Formulario";

import api from "../../../services/api";

function AluguelListagem(props) {

    const [alugueis, setAlugueis] = useState([]);

    const [exibeFormulario, setExibeFormulario] = useState(false);
    // const [exibeModalRemover, setExibeModalRemover] = useState(false);
    const [exibeModalView, setExibeModalView] = useState(false);

    const [semTipoItens, setSemTipoItens] = useState(false);
    const [carregando, setCarregando] = useState(true);

    const [aluguel, setAluguel] = useState({
        id: 0,
        cliente: {
            nome: ''
        },
        item: {
            nome: ''
        },
        aluguelSituacao: {
            id: '',
            name: ''
        },
        valor: 0,
        dataAluguel: '',
        dataDevolucao: '',
        reserva: true
    });

    useEffect(() => {

        if (exibeFormulario === false) {
            carregaAlugueis();
        }

    }, [ exibeFormulario ]);

    async function carregaAlugueis() {
        const response = await api.get('/aluguel/listar');

        setTimeout(() => {

            if (response.data.length === 0) {
                setSemTipoItens(true);
            }
            setAlugueis(response.data);
            setCarregando(false);
        }, 1000);
    }

    const novoAlugeul = useCallback(() => {

        setAluguel({
            ...{
                id: 0,
                ...{
                    cliente: {
                        id: 0
                    }
                },
                ...{
                    item: {
                        id: 0
                    }
                },
                ...{
                    aluguelSituacao: {
                        id: 0
                    }
                },
                valor: 0,
                reserva: false,
                dataAluguel: '',
                dataDevolucao: ''
            }
        });

        setExibeFormulario(true);

    }, []);

    const editarAluguel = useCallback((aluguel) => {
        setExibeFormulario(true);
        setAluguel(aluguel)
    }, []);

    const cancelarReceber = useCallback(async (id) => {
        await api.get(`aluguel/cancelar/${id}`);

        carregaAlugueis();

    }, []);

    //
    // const removerTipoItem = useCallback((tipoItem) => {
    //     setTipoItem(tipoItem)
    //     setExibeModalRemover(true);
    // }, []);
    //
    const viewAluguel = useCallback((aluguel) => {
        setAluguel(aluguel)
        setExibeModalView(true);
    }, []);

    function refatoraData(data) {
        if (data !== null) {
            const ano = data.slice(0, 4);
            const mes = data.slice(5, 7);
            const dia = data.slice(8, 10);

            return `${dia}/${mes}/${ano}`
        }

        return null;
    }

    function badgeSituacaoAluguel(situacao) {

        switch (situacao.id) {
            case 1:
                return <Badge variant="success">{situacao.nome}</Badge>;
            case 2:
                return <Badge variant="warning">{situacao.nome}</Badge>;
            case 3:
                return <Badge variant="info">{situacao.nome}</Badge>;
            default:
                break;
        }

    }

    return (
        <div>

            <Row>

                <Col xs={1}></Col>

                <Col xs={10}>
                    <AluguelFormulario show={exibeFormulario} dados={aluguel} reserva={aluguel.aluguelSituacao.id} onHide={() => setExibeFormulario(false)}/>

                    <AluguelView show={exibeModalView} dados={aluguel} onHide={() => {
                        setExibeModalView(false);
                    }} />

                    {/*<ModalRemover*/}
                    {/*    show={exibeModalRemover}*/}
                    {/*    dados={tipoItem.id}*/}
                    {/*    model="tipo_item"*/}
                    {/*    mensagem="Deseja remover este tipo de item?"*/}
                    {/*    onHide={() => setExibeModalRemover(false)} />*/}

                    <br/>
                    <Row>
                        <Col md={9}>
                            <h3>Aluguel Listagem</h3>
                        </Col>
                        <Col md={3}>
                            <div className={'button_add_space'}>
                                <Button variant="dark" onClick={novoAlugeul}>
                                    <FontAwesomeIcon icon={faPlus} /> Novo Aluguel
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <br/>

                    { semTipoItens ?

                        <div className={'text-center'}>
                            <Alert variant={"info"}><h4>Nenhum Aluguel Cadastrado</h4></Alert>
                        </div> :

                        <Table bordered>
                            <thead>
                            <tr className={'text-center'}>
                                <th width={'20%'}>Cliente</th>
                                <th width={'20%'}>Item</th>
                                <th width={'15%'}>Valor total</th>
                                <th width={'10%'}>Data do Aluguel</th>
                                <th width={'10%'}>Situação</th>
                                <th width={'40%'}>Controle</th>
                            </tr>
                            </thead>
                            <tbody >
                            { alugueis.map( aluguel => (
                                <tr className={'text-center'} key={aluguel.id}>
                                    <td>{aluguel.cliente.nome}</td>
                                    <td>{aluguel.item.nome}</td>
                                    <td>R${aluguel.valor}</td>
                                    <td>
                                        {refatoraData(aluguel.dataAluguel)}
                                    </td>
                                    <td>
                                        {
                                            badgeSituacaoAluguel(aluguel.aluguelSituacao)
                                        }
                                    </td>
                                    <td>
                                        {
                                            aluguel.aluguelSituacao.id !== 1 ?

                                                <Button variant="warning" size="sm" onClick={() => {editarAluguel(aluguel)}}>
                                                    <FontAwesomeIcon icon={faEdit} /> Editar
                                                </Button> :
                                                ''
                                        }

                                        &nbsp;&nbsp;
                                        <Button variant="info" size="sm" onClick={() => {viewAluguel(aluguel)}}>
                                            <FontAwesomeIcon icon={faEye} /> Visualizar
                                        </Button>
                                        &nbsp;&nbsp;
                                        {
                                            aluguel.aluguelSituacao.id === 3 ?

                                                <Button variant="danger" size="sm" onClick={() => {cancelarReceber(aluguel.id)}}>
                                                    <FontAwesomeIcon icon={faTimes} /> Cancelar
                                                </Button> :
                                                ''
                                        }
                                        {
                                            aluguel.aluguelSituacao.id === 2 ?

                                                <Button variant="success" size="sm" onClick={() => {cancelarReceber(aluguel.id)}}>
                                                    <FontAwesomeIcon icon={faHandPointLeft} /> Devolver
                                                </Button> :
                                                ''
                                        }

                                    </td>
                                </tr>
                            )) }
                            { semTipoItens ?
                                <tr className={'text-center'} key={'sem_tipoItens'}>
                                    <td colSpan={6}><h4>Nenhum Aluguel Cadastrado...</h4></td>
                                </tr> : '' }
                            </tbody>
                        </Table>
                    }


                    <br/>
                    { carregando ? <div className={'text-center'}>
                        <Spinner animation="border" variant={'info'}/>
                    </div> : '' }

                </Col>

            </Row>



        </div>
    );
}

export default AluguelListagem;
