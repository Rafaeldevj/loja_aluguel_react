import React, { useState, useEffect } from "react";
import {Button, Modal, ModalBody, ModalFooter, ListGroup, ListGroupItem} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import api from "../../../services/api";

function ClienteView(props) {

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

    }, [ props.show ]);

    return (
        <>
            <Modal
                {...props}
                size="md"
                centered
                backdrop={"static"}
            >
                <Modal.Header closeButton>
                    <div className="text-center">
                        <Modal.Title>Dados do Cliente</Modal.Title>
                    </div>
                </Modal.Header>

                <ModalBody>
                    <ListGroup>
                        <ListGroupItem><strong>Nome:</strong> { cliente.nome }</ListGroupItem>
                        <ListGroupItem><strong>E-mail:</strong> { cliente.email }</ListGroupItem>
                        <ListGroupItem><strong>Celular:</strong> { cliente.celular }</ListGroupItem>
                        <ListGroupItem><strong>CPF:</strong> { cliente.cpf }</ListGroupItem>
                    </ListGroup>
                </ModalBody>
                <ModalFooter>
                    <Button variant={"dark"} onClick={props.onHide} >
                        <FontAwesomeIcon icon={faTimes} /> Fechar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ClienteView;
