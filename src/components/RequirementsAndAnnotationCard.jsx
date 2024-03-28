import {Button, Card, ListGroup, Tab, Tabs} from "react-bootstrap";
import PropTypes from "prop-types";
import {useState} from "react";
import ModalCreateNotification from "./Modals/ModalCreateNotification.jsx";

const RequirementsAndAnnotationCard = ({requirements, annotations, notifications, isAdmin, isTeacher, addNotification}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)

    return (
        <>
            <Tabs className="mt-4" fill>
                <Tab title="Требования к курсу" eventKey="requirement">
                    <Card className="rounded-0">
                        <Card.Body dangerouslySetInnerHTML={{ __html: requirements }} className="pb-0"></Card.Body>
                    </Card>
                </Tab>
                <Tab title="Аннотация" eventKey="annotation">
                    <Card className="rounded-0">
                        <Card.Body dangerouslySetInnerHTML={{ __html: annotations }} className="pb-0"></Card.Body>
                    </Card>
                </Tab>
                <Tab title="Уведомления" eventKey="notification">
                    <Card className="rounded-0">
                        <Card.Body>
                            {isAdmin || isTeacher ? (
                                <Button
                                    type="button"
                                    variant="primary"
                                    className={notifications.length > 0 ? "mb-3" : null}
                                    onClick={handleShow}>Создать уведомление</Button>
                            ) : null}
                            <ListGroup variant="flush">
                                {notifications.map((item, index) => (
                                    <ListGroup.Item key={index}
                                                    variant={item.isImportant ? "danger" : ""}>{item.text}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>

            <ModalCreateNotification addNotification={addNotification} handleClose={handleClose} show={show}/>
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