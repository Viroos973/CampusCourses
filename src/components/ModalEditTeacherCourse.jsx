import {Button, Form, Modal} from "react-bootstrap";
import ReactQuill from "react-quill";
import {ToolBar} from "../const/ToolBar.js";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const ModalEditTeacherCourse = ({handleClose, show, editCourse, requirements, annotations}) => {
    const [validated, setValidated] = useState(false)
    const [requirement, setRequirements] = useState("");
    const [annotation, setAnnotations] = useState("");

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
            await editCourse(requirement, annotation, handleClose)
        }
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Редактирование курса</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Требования</Form.Label>
                        <ReactQuill modules={{
                            toolbar: ToolBar
                        }} onChange={handleSetRequirements}
                        defaultValue={requirement}/>
                        <span className="text-danger">{requirements === "" && validated ? "Поле должно быть заполнено" : null}</span>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Аннотации</Form.Label>
                        <ReactQuill modules={{
                            toolbar: ToolBar
                        }} onChange={handleSetAnnotations}
                        defaultValue={annotation}/>
                        <span className="text-danger">{annotations === "" && validated ? "Поле должно быть заполнено" : null}</span>
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

ModalEditTeacherCourse.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    editCourse: PropTypes.func.isRequired,
    requirements: PropTypes.string.isRequired,
    annotations: PropTypes.string.isRequired
}

export default ModalEditTeacherCourse