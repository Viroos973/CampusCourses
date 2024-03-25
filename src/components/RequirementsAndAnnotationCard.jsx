import {Button, Card, Form, ListGroup, Modal, Tab, Tabs} from "react-bootstrap";
import PropTypes from "prop-types";
import {useState} from "react";

const RequirementsAndAnnotationCard = ({requirements, annotations, notifications, isAdmin, isTeacher, addNotification}) => {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)

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
        <>
            <Tabs className="mt-3" fill>
                <Tab title="Требования к курсу" eventKey="requirement">
                    <Card>
                        <Card.Body dangerouslySetInnerHTML={{ __html: requirements }} className="pb-0"></Card.Body>
                    </Card>
                </Tab>
                <Tab title="Аннотация" eventKey="annotation">
                    <Card>
                        <Card.Body dangerouslySetInnerHTML={{ __html: annotations }} className="pb-0"></Card.Body>
                    </Card>
                </Tab>
                <Tab title="Уведомления" eventKey="notification">
                    <Card>
                        <Card.Body className="pb-0">
                            {isAdmin || isTeacher ? (
                                <Button type="button" variant="primary" className="mb-3" onClick={handleShow}>Создать уведомление</Button>
                            ) : null}
                            {notifications.length > 0 ? (<ListGroup variant="flush mb-3">
                                {notifications.map((item, index) => (
                                    <ListGroup.Item key={index}
                                                    variant={item.isImportant ? "danger" : ""}>{item.text}</ListGroup.Item>
                                ))}
                            </ListGroup>) : null}
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>

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
        </>
    )
}

RequirementsAndAnnotationCard.propTypes = {
    requirements: PropTypes.string.isRequired,
    annotations: PropTypes.string.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            isImportant: PropTypes.bool.isRequired
        })
    ).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isTeacher: PropTypes.bool.isRequired,
    addNotification: PropTypes.func.isRequired
}

export default RequirementsAndAnnotationCard