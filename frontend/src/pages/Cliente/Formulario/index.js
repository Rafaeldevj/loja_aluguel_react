import React, { useState, useCallback, useEffect } from "react";
import {Button, Modal, ModalBody, ModalFooter, Form, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import MaskedFormControl from "react-bootstrap-maskedinput/src";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";

import api from "../../../services/api";

function ClienteFormulario(props) {

    const [cliente, setCliente] = useState({
        id: 0,
        nome: '',
        email: '',
        celular: '',
        cpf: ''
    });

    useEffect(() => {

        if (props.show === true) {
            setCliente({
                ...props.dados
            });
        }

    }, [ props ]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (cliente.id !== 0) {
            //Novo Cliente
            api.post('/cliente/cadastrar', cliente).then(
                (response) => {
                    if (response.data.id > 0) {
                        props.onHide();
                    }
                }
            );

        } else {
            //Atualizar Cliente
            api.put('/cliente/atualizar', cliente).then(
                (response) => {
                    if (response.data.id > 0) {
                        props.onHide();
                    }
                }
            );

        }



    }, [cliente]);

    function atualizarDados(e) {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
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
                                    value={cliente.nome}
                                    name={'nome'}
                                    onChange={atualizarDados}
                                    required />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel column={false}>E-mail</FormLabel>
                                <FormControl
                                    type="email"
                                    value={cliente.email}
                                    name={'email'}
                                    onChange={atualizarDados}
                                    required
                                    placeholder="E-mail..." />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel column={false}>Celular</FormLabel>
                                <MaskedFormControl
                                    type={'text'}
                                    mask={'(11) 11111-1111'}
                                    value={cliente.celular}
                                    name={'celular'}
                                    onChange={atualizarDados}
                                    placeholder="Celular..." />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel column={false}>CPF</FormLabel>
                                <MaskedFormControl
                                    type={'text'}
                                    mask={'111.111.111-11'}
                                    value={cliente.cpf}
                                    name={'cpf'}
                                    onChange={atualizarDados}
                                    required
                                    placeholder="CPF..." />
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

export default ClienteFormulario;
