import {useState} from "react";
import {useSelector} from "react-redux";
import {Button, Form, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

const ModalAddTeacher = ({show, students, teachers, addTeacher, handleClose}) => {
    const [validated, setValidated] = useState(false)
    const users = useSelector(state => state.users.users)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false){
            event.stopPropagation()
            setValidated(true)
        } else {
            await addTeacher(event, handleClose)
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Добавление преподавателя на курс</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Выберите преподавателя</Form.Label>
                        <Form.Select name="userId">
                            {users !== null ?
                                users
                                    .filter(user => !students.some(stud => stud.id === user.id) && !teachers.some(teach => teach.name === user.fullName))
                                    .map((user) => (
                                        <option key={user.id} value={user.id}>{user.fullName}</option>
                                    ))
                                : null}
                        </Form.Select>
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

ModalAddTeacher.propTypes = {
    show: PropTypes.bool.isRequired,
    addTeacher: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    ).isRequired,
    teachers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    ).isRequired
}

export default ModalAddTeacher