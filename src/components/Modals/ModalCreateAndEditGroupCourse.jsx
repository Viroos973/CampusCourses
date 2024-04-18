import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import PropTypes from "prop-types";

const ModalCreateAndEditGroupCourse = ({show, handleClose, name = null, editOrCreateGroup, id = null}) => {
    const [validated, setValidated] = useState(false)
    const [nameData, setNameData] = useState(name || '')

    const handleSubmit = async(event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false){
            event.stopPropagation()
            setValidated(true)
        } else {
            await editOrCreateGroup(event, handleClose, id)
        }
    }

    return (
        <Modal show={show} backdrop="static" keyboard={false} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{name !== null ? "Редактирование" : "Создание"} группы</Modal.Title>
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
    )
}

ModalCreateAndEditGroupCourse.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    name: PropTypes.string,
    editOrCreateGroup: PropTypes.func.isRequired,
    id: PropTypes.string
}

export default ModalCreateAndEditGroupCourse