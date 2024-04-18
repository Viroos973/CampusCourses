import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import PropTypes from "prop-types";

const ModalAddMark = ({id, name, show, type, handleClose, addMark}) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false){
            event.stopPropagation()
            setValidated(true)
        } else {
            await addMark(event, type, id, handleClose)
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение отметки для {type === "Midterm" ? '"Промежуточная аттестация"' : '"Финальная аттестация"'}</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Студент - {name}</Form.Label>
                        <Form.Check type="radio"
                                    label="Пройдено"
                                    value="Passed"
                                    name="mark"
                                    defaultChecked/>
                        <Form.Check type="radio"
                                    label="Зафейлено"
                                    value="Failed"
                                    name="mark"/>
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

ModalAddMark.propTypes = {
    show: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    addMark: PropTypes.func.isRequired,
    id: PropTypes.string,
    name: PropTypes.string
}

export default ModalAddMark