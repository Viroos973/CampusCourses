import {useCourse} from "../api/hook/useCourse.js";
import {Button, Form, ListGroup, Modal} from "react-bootstrap";
import ListItemCourses from "../components/listItemCourses.jsx";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useGroup, useListUsers} from "../api/hook/index.js";
import {useState} from "react";
import ReactQuill from "react-quill";
import {ToolBar} from "../const/ToolBar.js";

const ListCourses = ({url}) => {
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const [groupId, dataCourse, loading, error, addCourse] = useCourse(null, url)
    const [data] = useGroup(null)
    const roles = useSelector(state => state.roles)
    const users = useListUsers(null)
    const [requirements, setRequirements] = useState("");
    const [annotations, setAnnotations] = useState("");

    const handleGetName = () => {
        if (data !== null){
            const findGroup = data.find(item => item.id === groupId)
            return findGroup.name
        } else {
            return null
        }
    }

    const handleSetAnnotations = (value) => setAnnotations(value)

    const handleSetRequirements = (value) => setRequirements(value)

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false){
            event.stopPropagation()
            setValidated(true)
        } else {
            await addCourse(event, requirements, annotations, handleClose)
        }
    }

    return (
        <>
            <div style={{width: "80%", margin: "0 auto"}}>
                {loading ? (
                    <h2 className="text-center mt-4">Loading...</h2>
                ) : error ? (
                    <h2 className="text-center mt-4">Что-то пошло не так.</h2>
                ) : (
                    <>
                        {url === "" ? (
                            <h2 className="mt-4">Группа - {handleGetName()}</h2>
                        ) : url === "my" ? (
                            <h2 className="mt-4">Мои курсы</h2>
                        ) : (
                            <h2 className="mt-4">Преподаваемые курсы</h2>
                        )}

                        {roles !== null && roles.isAdmin && url === "" ? (
                            <Button variant="primary" type="button" className="my-2" onClick={handleShow}>СОЗДАТЬ КУРС</Button>
                        ) : null}

                        <ListGroup className="mb-4 mt-3">
                            {dataCourse.map((item) => (
                                <ListItemCourses key={item.id} {...item}/>
                            ))}
                        </ListGroup>
                    </>
                )}
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Создание курса</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Название курса</Form.Label>
                            <Form.Control required type="text" name="name"/>
                            <Form.Control.Feedback type="invalid">Поле должно быть заполнено</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Год начала курса</Form.Label>
                            <Form.Control max={2029} min={2000} required type="number" name="startYear"/>
                            <Form.Control.Feedback type="invalid">Поле должно быть заполнено. В промежутке от 2000 до 2029</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Общее количество мест</Form.Label>
                            <Form.Control max={200} min={1} required type="number" name="maximumStudentsCount"/>
                            <Form.Control.Feedback type="invalid">Поле должно быть заполнено. В промежутке от 1 до 200</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Семестр</Form.Label>
                            <Form.Check type="radio" label="Осенний" value="Autumn" name="semester" defaultChecked/>
                            <Form.Check type="radio" label="Весенний" value="Spring" name="semester"/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Требования</Form.Label>
                            <ReactQuill modules={{
                                toolbar: ToolBar
                            }} onChange={handleSetRequirements}/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Аннотации</Form.Label>
                            <ReactQuill modules={{
                                toolbar: ToolBar
                            }} onChange={handleSetAnnotations}/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Основной преподователь курса</Form.Label>
                            <Form.Select name="mainTeacherId">
                                {users !== null ? users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.fullName}</option>
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
        </>
    )
}

ListCourses.propTypes = {
    url: PropTypes.string.isRequired
}

export default ListCourses