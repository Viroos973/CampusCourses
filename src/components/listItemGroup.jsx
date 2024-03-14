import {Button, Col, Form, ListGroup, Modal, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {useState} from "react";

const ListItemGroup = ({id, name, isAdmin, editItem, deleteItem}) => {
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const [nameData, setNameData] = useState(name || '')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleSubmit = async(event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false){
            event.stopPropagation()
            setValidated(true)
        } else {
            await editItem(event, id)
            setShow(false)
        }
    }

    return (
        <>
            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <a href={`/groups/${id}`}>{name}</a>
                <Row className="gap-2">
                    {isAdmin ? (
                        <>
                            <Col>
                                <Button variant="warning" type="button" onClick={handleShow}>Редактировать</Button>
                            </Col>
                            <Col>
                                <Button variant="danger" type="button" onClick={() => deleteItem(id)}>Удалить</Button>
                            </Col>
                        </>
                    ) : null}
                </Row>
            </ListGroup.Item>

            <Modal show={show} backdrop="static" keyboard={false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование группы</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Label>Название группы</Form.Label>
                        <Form.Control type="text" name="name" required value={nameData} onChange={(e) => setNameData(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="button" onClick={handleClose}>Отмена</Button>
                        <Button variant="primary" type="submit">Сохранить</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

ListItemGroup.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    editItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
}

export default ListItemGroup