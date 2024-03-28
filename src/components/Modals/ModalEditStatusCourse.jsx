import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import {useState} from "react";

const ModalEditStatusCourse = ({handleClose, show, editStatus, status}) => {
    const [validated, setValidated] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false){
            event.stopPropagation()
            setValidated(true)
        } else {
            await editStatus(event, handleClose)
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение статуса курса</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Семестр</Form.Label>
                        <Form.Check type="radio"
                                    label="Открыт для записи"
                                    value="OpenForAssigning"
                                    name="status"
                                    defaultChecked={status === "OpenForAssigning"}/>
                        <Form.Check type="radio"
                                    label="В процессе обучения"
                                    value="Started"
                                    name="status"
                                    defaultChecked={status === "Started"}/>
                        <Form.Check type="radio"
                                    label="Закрыт"
                                    value="Finished"
                                    name="status"
                                    defaultChecked={status === "Finished"}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={handleClose}>Отмена</Button>
                    <Button variant="primary" type="submit">Сохранить</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

ModalEditStatusCourse.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    editStatus: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired
}

export default ModalEditStatusCourse