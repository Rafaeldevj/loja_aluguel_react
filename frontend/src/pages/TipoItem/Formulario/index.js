import React, { useState, useCallback, useEffect } from "react";
import {Button, Modal, ModalBody, ModalFooter, Form, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";

import api from "../../../services/api";

function TipoItemFormulario(props) {

    const [tipoItem, setTipoItem] = useState({
        id: 0,
        nome: ''
    });

    useEffect(() => {

        if (props.show === true) {
            setTipoItem({
                ...props.dados
            });
        }

    }, [ props ]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (tipoItem.id !== 0) {
            //Novo Cliente
            api.post('/tipo_item/cadastrar', tipoItem).then(
                (response) => {
                    if (response.data.id > 0) {
                        props.onHide();
                    }
                }
            );

        } else {
            //Atualizar Cliente
            api.put('/tipo_item/atualizar', tipoItem).then(
                (response) => {
                    if (response.data.id > 0) {
                        props.onHide();
                    }
                }
            );

        }



    }, [tipoItem]);

    function atualizarDados(e) {
        setTipoItem({
            ...tipoItem,
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
                                value={tipoItem.nome}
                                name={'nome'}
                                onChange={atualizarDados}
                                required />
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

export default TipoItemFormulario;
