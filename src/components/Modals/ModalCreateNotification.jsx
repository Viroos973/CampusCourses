import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import PropTypes from "prop-types";

const ModalCreateNotification = ({show, handleClose, addNotification}) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false){
            event.stopPropagation()
            setValidated(true)
        } else {
            await addNotification(event, handleClose)
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Создание уведомления</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Текст уведомления</Form.Label>
                        <Form.Control as="textarea" rows={3} required name="text"/>
                        <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Check type="checkbox"
                                label="Важное уведомление"
                                name="isImportant"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={handleClose}>Отмена</Button>
                    <Button variant="primary" type="submit">Сохранить</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

ModalCreateNotification.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired
}

export default ModalCreateNotification