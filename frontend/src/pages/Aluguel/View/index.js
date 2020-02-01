import React, { useState, useEffect } from "react";
import {Button, Modal, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from "@fortawesome/free-solid-svg-icons";

function AluguelView(props) {

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
        reserva: false
    });

    useEffect(() => {

        if (props.show === true) {
            setAluguel({
                ...props.dados
            });
        }

    }, [ props ]);

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
        <>
            <Modal
                {...props}
                size="md"
                centered
                backdrop={"static"}
            >
                <Modal.Header closeButton>
                    <div className="text-center">
                        <Modal.Title>Dados do Aluguel</Modal.Title>
                    </div>
                </Modal.Header>

                <ModalBody>
                    <ListGroup>
                        <ListGroupItem><strong>Cliente:</strong> { aluguel.cliente.nome }</ListGroupItem>
                        <ListGroupItem><strong>Item:</strong> { aluguel.item.nome }</ListGroupItem>
                        <ListGroupItem><strong>Valor:</strong> R${ aluguel.valor }</ListGroupItem>

                        <ListGroupItem>
                            {
                                aluguel.aluguelSituacao.id === 3 ?
                                    <strong>Data da Reserva:</strong>  :
                                    <strong>Data do Aluguel:</strong>
                            }
                            &nbsp;{ refatoraData(aluguel.dataAluguel)}
                        </ListGroupItem>

                        <ListGroupItem><strong>Data de Devolução:</strong> { refatoraData(aluguel.dataDevolucao) }</ListGroupItem>
                        <ListGroupItem><strong>Situação:</strong>&nbsp;
                            {
                                badgeSituacaoAluguel(aluguel.aluguelSituacao)
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

export default AluguelView;
