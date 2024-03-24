import {Button, Form, ListGroup, Modal} from "react-bootstrap";
import ListItemGroup from "../components/listItemGroup.jsx";
import {useGroup} from "../api/hook/index.js";
import {useState} from "react";
import {useSelector} from "react-redux";

const ListGroups = () => {
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const [data, loading, error, addItem, deleteItem, editItem] = useGroup(null)
    const roles = useSelector(state => state.roles)

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)

    const handleSubmit = async(event) => {
        event.preventDefault()

        const form = event.currentTarget

        if (form.checkValidity() === false){
            event.stopPropagation()
            setValidated(true)
        } else {
            await addItem(event, handleClose)
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
                        <h2 className="mt-4">Группы кампусных курсов</h2>

                        {roles !== null && roles.isAdmin ? (
                            <Button variant="primary" type="button" onClick={handleShow} className="mb-2">Создать</Button>
                        ) : null}

                        <ListGroup className="mb-4 mt-3">
                            {data.map((item) => (
                                <ListItemGroup key={item.id} {...item} isAdmin={roles === null ? false : roles.isAdmin} editItem={editItem} deleteItem={deleteItem} />
                            ))}
                        </ListGroup>
                    </>
                )}
            </div>

            <Modal show={show} backdrop="static" keyboard={false} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание группы</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Label>Название группы</Form.Label>
                        <Form.Control type="text" name="name" required/>
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

export default ListGroups