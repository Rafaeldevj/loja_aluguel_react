import React, { useState, useEffect } from "react";
import {Button, Modal, ModalBody, ModalFooter, ListGroup, ListGroupItem} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from "@fortawesome/free-solid-svg-icons";

function TipoItemView(props) {

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
                        <Modal.Title>Dados do Tipo de Item</Modal.Title>
                    </div>
                </Modal.Header>

                <ModalBody>
                    <ListGroup>
                        <ListGroupItem><strong>Nome:</strong> { tipoItem.nome }</ListGroupItem>
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

export default TipoItemView;
