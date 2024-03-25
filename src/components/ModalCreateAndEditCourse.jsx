import {Button, Form, Modal} from "react-bootstrap";
import ReactQuill from "react-quill";
import {ToolBar} from "../const/ToolBar.js";
import {useEffect, useState} from "react";
import {useListUsers} from "../api/hook/index.js";
import PropTypes from "prop-types";

const ModalCreateAndEditCourse = ({handleClose, show, addOrEditCourse, name = null, startYear = null, maximumStudentsCount = null,
                                      semester = null, requirements = "", annotations = "", teacher = null}) => {
    const [validated, setValidated] = useState(false)
    const [requirement, setRequirements] = useState("");
    const [annotation, setAnnotations] = useState("");
    const users = useListUsers(null)

    const handleSetAnnotations = (value) => setAnnotations(value)

    const handleSetRequirements = (value) => setRequirements(value)

    useEffect(() => {
        setRequirements(requirements);
    }, [requirements]);

    useEffect(() => {
        setAnnotations(annotations);
    }, [annotations]);

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false || requirement === "" || annotation === ""){
            event.stopPropagation()
            setValidated(true)
        } else {
            await addOrEditCourse(event, requirement, annotation, handleClose)
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{name === null ? "Создание" : "Редактирование"} курса</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Название курса</Form.Label>
                        <Form.Control required type="text" name="name" defaultValue={name}/>
                        <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Год начала курса</Form.Label>
                        <Form.Control max={2029} min={2000} required type="number" name="startYear" defaultValue={startYear}/>
                        <Form.Control.Feedback type="invalid">Поле должно быть заполнено. В промежутке от 2000 до 2029</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Общее количество мест</Form.Label>
                        <Form.Control max={200} min={1} required type="number" name="maximumStudentsCount" defaultValue={maximumStudentsCount}/>
                        <Form.Control.Feedback type="invalid">Поле должно быть заполнено. В промежутке от 1 до 200</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Семестр</Form.Label>
                        <Form.Check type="radio" label="Осенний" value="Autumn" name="semester" defaultChecked={semester !== "Spring"}/>
                        <Form.Check type="radio" label="Весенний" value="Spring" name="semester" defaultChecked={semester === "Spring"}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Требования</Form.Label>
                        <ReactQuill modules={{
                            toolbar: ToolBar
                        }} onChange={handleSetRequirements}
                        defaultValue={requirement}/>
                        <span className="text-danger">{requirement === "" && validated ? "Поле должно быть заполнено" : null}</span>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Аннотации</Form.Label>
                        <ReactQuill modules={{
                            toolbar: ToolBar
                        }} onChange={handleSetAnnotations}
                        defaultValue={annotation}/>
                        <span className="text-danger">{annotation === "" && validated ? "Поле должно быть заполнено" : null}</span>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Основной преподователь курса</Form.Label>
                        <Form.Select name="mainTeacherId">
                            {users !== null ? users.map((user) => (
                                <option key={user.id} value={user.id} selected={teacher !== null && teacher.name === user.fullName}>{user.fullName}</option>
                            )) : null}
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

ModalCreateAndEditCourse.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    addOrEditCourse: PropTypes.func.isRequired
}

export default ModalCreateAndEditCourse