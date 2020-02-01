import React, { useState, useCallback, useEffect } from "react";
import {Button, Modal, ModalBody, ModalFooter, Form, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";

import api from "../../../services/api";

function ItemFormulario(props) {

    const [tipoItensLista, setTipoItensLista] = useState([]);

    const [item, setItem] = useState({
        id: 0,
        nome: '',
        valor: 0,
        descricao: '',
        disponivel: 'S',
        tipoItem: {
            id: 0
        }
    });

    useEffect(() => {

        if (props.show === true) {
            setItem({
                ...props.dados
            });
        }

        async function carregaTipoItens() {

            const response = await api.get('/tipo_item/listar');

            setTipoItensLista(response.data);
        }

        carregaTipoItens();

    }, [ props ]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        item.tipoItem.id = parseInt(item.tipoItem.id)
        item.valor = parseFloat(item.valor)

        if (item.id !== 0) {
            //Novo Cliente
            api.post('/item/cadastrar', item).then(
                (response) => {
                    if (response.data.id > 0) {
                        props.onHide();
                    }
                }
            );

        } else {
            //Atualizar Cliente
            api.put('/item/atualizar', item).then(
                (response) => {
                    if (response.data.id > 0) {
                        props.onHide();
                    }
                }
            );

        }



    }, [item]);

    function atualizarDados(e) {

        if (e.target.name === 'tipoItem') {
            setItem({
                ...item,
                tipoItem: {
                    id: e.target.value
                }
            })
        } else {
            setItem({
                ...item,
                [e.target.name] : e.target.value
            })

        }



    }

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
                            <FormLabel column={false}>Nome</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nome..."
                                value={item.nome}
                                name={'nome'}
                                onChange={atualizarDados}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel column={false}>Valor (diária)</FormLabel>
                            <FormControl
                                type="number"
                                placeholder="Valor da diária..."
                                value={item.valor}
                                name={'valor'}
                                onChange={atualizarDados}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel column={false}>Descrição</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Descrição..."
                                value={item.descricao}
                                name={'descricao'}
                                onChange={atualizarDados}
                                required />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel column={false}>Tipo de Item</FormLabel>
                            <FormControl
                                as="select"
                                value={item.tipoItem.id}
                                name={'tipoItem'}
                                onChange={atualizarDados}
                                required>
                                <option value={0}>Selecione um Tipo de Item</option>
                                {
                                    tipoItensLista.map(tipoItem => (
                                        <option value={tipoItem.id} key={tipoItem.id}>{ tipoItem.nome }</option>
                                    ))
                                }
                            </FormControl>
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

export default ItemFormulario;
