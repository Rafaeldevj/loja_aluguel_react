import React, { useState, useEffect } from "react";
import {Button, Modal, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from "@fortawesome/free-solid-svg-icons";

import api from "../../../services/api";

function ItemView(props) {

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

        if (props.show === true) {
            setItem({
                ...props.dados
            });
        }

    }, [ props ]);

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
                        <Modal.Title>Dados do Item</Modal.Title>
                    </div>
                </Modal.Header>

                <ModalBody>
                    <ListGroup>
                        <ListGroupItem><strong>Nome:</strong> { item.nome }</ListGroupItem>
                        <ListGroupItem><strong>Valor (diária):</strong> R${ item.valor }</ListGroupItem>
                        <ListGroupItem><strong>Descrição:</strong> { item.descricao }</ListGroupItem>
                        <ListGroupItem><strong>Tipo de Item:</strong> { item.tipoItem.nome }</ListGroupItem>
                        <ListGroupItem><strong>Situação:</strong>&nbsp;
                            {
                                item.disponivel === 'S' ?
                                <Badge variant="success">Disponível</Badge> :
                                <Badge variant="danger">Indisponível</Badge>
                            }
                        </ListGroupItem>
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

export default ItemView;
