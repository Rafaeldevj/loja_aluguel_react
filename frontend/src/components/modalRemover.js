import React, {useCallback} from "react";
import {Button, Modal, ModalBody, ModalFooter} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";

function ModalRemover(props) {

    const remover = useCallback( async () => {

        await api.delete(`/${props.model}/remover/${props.dados}`)
            .catch((erro) => {
                alert('Falha ao remover registro!');
            })
            .finally(
            () => {
                props.onHide();
            }
        )


    }, [props]);

    return (
        <>
            <Modal
                {...props}
                size="md"
                centered
                backdrop={"static"}
            >
                <ModalBody>
                    <div className="text-center">
                        <h3>{ props.mensagem }</h3>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant={"success"} onClick={props.onHide} >
                        <FontAwesomeIcon icon={faTimes} /> Fechar
                    </Button>
                    <Button variant={"danger"} onClick={remover}>
                        <FontAwesomeIcon icon={faTrash} /> Remover
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalRemover;
