import React, { useState, useCallback, useEffect, useRef } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    Row,
    Col
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";

import api from "../../../services/api";

function AluguelFormulario(props) {

    const [itensLista, setItensLista] = useState([]);
    const [clientesLista, setClientesLista] = useState([]);

    const dataAtual = new Date().toISOString().slice(0,10);

    const [valorTotal, setValorTotal] = useState(0);
    const [valorItem, setValorItem] = useState(0);

    const reservaCheckRef = useRef(null);

    const [aluguel, setAluguel] = useState({
        id: 0,
        cliente: {
            id: 0
        },
        item: {
            id: 0
        },
        aluguelSituacao: {
            id: ''
        },
        valor: 0,
        reserva: false,
        dataAluguel: '',
        dataDevolucao: ''
    });

    useEffect(() => {

        if (props.show === true) {
            setAluguel({
                ...props.dados
            });
            console.log(props.reserva)


        }

        async function carregaListas() {

            const responseClientes = await api.get('cliente/listar');

            setClientesLista(responseClientes.data);

            await api.get('/item/listar').then(
                (response) => {
                    const listaItens = response.data;


                    const newItens = listaItens.filter(function (item) {
                        return item.disponivel == "S";
                    });

                    setItensLista(newItens);
                }
            );


        }

        carregaListas();

    }, [ props ]);

    useEffect(() => {

        if (props.reserva === 3) {
            if (reservaCheckRef.current.checked === false) {
                reservaCheckRef.current.click();
            }
        } else if (props.reserva === 2) {
            if (reservaCheckRef.current.checked === true) {
                reservaCheckRef.current.click();
            }
        }
        else {
            setValorItem(0);
            setValorTotal(0);
        }

    }, [props.reserva]);

    function onSubmit(e) {

        e.preventDefault();

        aluguel.cliente.id = parseInt(aluguel.cliente.id);
        aluguel.item.id = parseInt(aluguel.item.id);

        if (aluguel.id === 0) {
            //Novo Aluguel
            api.post('/aluguel/cadastrar', aluguel).then(
                (response) => {

                    if (response.data.id > 0) {
                        props.onHide();
                    }
                }
            );

        } else {
            //Atualizar Aluguel
            api.put('/aluguel/atualizar', aluguel).then(
                (response) => {
                    if (response.data.id > 0) {
                        props.onHide();
                    }
                }
            );

        }

    }

    function atualizarDados(e) {

        if (e.target.name === 'cliente') {
            setAluguel({
                ...aluguel,
                cliente: {
                    id: e.target.value
                }
            })
        } else if (e.target.name === 'item') {
            setAluguel({
                ...aluguel,
                item: {
                    id: e.target.value
                }
            })
        } else {
            setAluguel({
                ...aluguel,
                [e.target.name] : e.target.value
            })
        }

    }

    const setaReserva = useCallback(() => {

        setAluguel({
            ...aluguel,
            reserva : !aluguel.reserva
        });


    }, [aluguel]);

    useEffect(() => {

        if (aluguel.item.id !== 0) {

            async function carregaItem() {
                const response = await api.get(`item/buscar/${aluguel.item.id}`)
                setValorItem(response.data.valor)
            }

            carregaItem();
        }

    }, [aluguel]);

    useEffect(() => {

        if (aluguel.reserva === true) {

            if (aluguel.dataDevolucao !== '') {

                const dtAluguel = new Date(aluguel.dataAluguel);
                const dtDevolucao = new Date(aluguel.dataDevolucao);

                const diferencaDias = dtDevolucao.getTime() - dtAluguel.getTime();

                const dias = diferencaDias/(1000 * 3600 * 24);

                if (dias < 1) {
                    alert('A duração mínima do alugeul é de 1 dia!');

                    setAluguel({
                        ...aluguel,
                        dataDevolucao : ''
                    })
                } else {
                    setValorTotal(dias * valorItem)
                }


            }

        } else {

            if (aluguel.dataDevolucao !== '') {

                if (aluguel.id === 0) {

                    const dtAluguel = new Date(dataAtual);
                    const dtDevolucao = new Date(aluguel.dataDevolucao);

                    const diferencaDias = dtDevolucao.getTime() - dtAluguel.getTime();

                    const dias = diferencaDias / (1000 * 3600 * 24);

                    if (dias < 1) {
                        alert('A duração mínima do alugeul é de 1 dia!');

                        setAluguel({
                            ...aluguel,
                            dataDevolucao: ''
                        })
                    } else {
                        setValorTotal(dias * valorItem);
                    }

                } else {

                    const dtAluguel = new Date(aluguel.dataAluguel);
                    const dtDevolucao = new Date(aluguel.dataDevolucao);

                    const diferencaDias = dtDevolucao.getTime() - dtAluguel.getTime();

                    const dias = diferencaDias/(1000 * 3600 * 24);

                    if (dias < 1) {
                        alert('A duração mínima do alugeul é de 1 dia!');

                        setAluguel({
                            ...aluguel,
                            dataDevolucao : ''
                        })
                    } else {
                        setValorTotal(dias * valorItem);
                    }

                }



            }

        }
    }, [aluguel, valorItem, dataAtual]);

    useEffect(() => {

        if (aluguel.dataAluguel === '') {

            setAluguel({
                ...aluguel,
                dataAluguel : dataAtual
            });
        }
    }, [aluguel, dataAtual]);

    useEffect(() => {

        if (valorTotal > 0) {

            setAluguel({
                ...aluguel,
                valor : valorTotal
            });
        }

    }, [valorTotal]);

    return (
        <>
            <Modal
                {...props}
                size="md"
                centered
                backdrop={"static"}
            >
                <Form onSubmit={onSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <FormLabel column={false}>Cliente</FormLabel>
                            <FormControl
                                as="select"
                                value={aluguel.cliente.id}
                                name={'cliente'}
                                onChange={atualizarDados}
                                required>
                                <option value={0}>Selecione um Cliente</option>
                                {
                                    clientesLista.map(cliente => (
                                        <option value={cliente.id} key={cliente.id}>{ cliente.nome }</option>
                                    ))
                                }
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel column={false}>Item</FormLabel>
                            <FormControl
                                as="select"
                                value={aluguel.item.id}
                                name={'item'}
                                onChange={atualizarDados}
                                required>
                                <option value={0}>Selecione um Item</option>
                                {
                                    itensLista.map(item => (
                                        <option value={item.id} key={item.id}>{ item.nome }</option>
                                    ))
                                }
                            </FormControl>
                        </FormGroup>
                        <FormGroup id="formGridCheckbox">
                            <Form.Check
                                type="checkbox"
                                value={aluguel.reserva}
                                name={'reserva'}
                                defaultChecked={aluguel.reserva}
                                ref={reservaCheckRef}
                                onClick={setaReserva}
                                label="Reserva" />
                        </FormGroup>
                        <Row>
                        </Row>
                        <FormGroup>
                            <Row>
                                {
                                    aluguel.reserva ?
                                        <Col>
                                            <FormLabel column={false}>Data da Reserva</FormLabel>
                                            <FormControl
                                                type="date"
                                                value={aluguel.dataAluguel}
                                                name={'dataAluguel'}
                                                onChange={atualizarDados}
                                                required />
                                        </Col> : ''

                                }

                                <Col>
                                    <FormLabel column={false}>Data da Devolução</FormLabel>
                                    <FormControl
                                        type="date"
                                        placeholder="Data da Devolução..."
                                        value={aluguel.dataDevolucao}
                                        name={'dataDevolucao'}
                                        onChange={atualizarDados}
                                        required />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <h5>Valor do Item: R${valorItem}</h5>
                            <h5>Valor total: R${valorTotal}</h5>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant={"dark"} onClick={props.onHide} >
                            <FontAwesomeIcon icon={faTimes} /> Cancelar
                        </Button>
                        <Button variant={"info"} type={"submit"}>
                            <FontAwesomeIcon icon={faSave} /> Salvar
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
}

export default AluguelFormulario;
