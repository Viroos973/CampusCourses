import {Button, Card, ListGroup, Tab, Tabs} from "react-bootstrap";
import ListItemTeacher from "./ListItemTeacher.jsx";
import PropTypes from "prop-types";
import ListItemStudent from "./ListItemStudent.jsx";
import ModalAddTeacher from "./Modals/ModalAddTeacher.jsx";
import {useState} from "react";

const UsersInCourseCard = ({students, teachers, isAdmin, isMainTeacher, isTeacher, editStatusStudent, addMark, addTeacher}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Tabs className="mt-4" fill>
                <Tab title="Преподаватели" eventKey="teacher">
                    <Card className="rounded-0 mb-4">
                        <Card.Body>
                            {isAdmin || isMainTeacher ? (
                                <Button
                                    type="button"
                                    variant="primary"
                                    className={teachers.length > 0 ? "mb-3" : null}
                                    onClick={handleShow}>Добавить преподавателя</Button>
                            ) : null}
                            <ListGroup variant="flush">
                                {teachers.map((item, index) => (
                                    <ListItemTeacher key={index} teacher={item}/>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab title="Студенты" eventKey="student">
                    <Card className="rounded-0 mb-4">
                        <Card.Body>
                            <ListGroup variant="flush">
                                {students.map((item, index) => (
                                    <ListItemStudent key={index} student={item} isAdmin={isAdmin}
                                                     isTeacher={isTeacher} editStatusStudent={editStatusStudent} addMark={addMark}/>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>

            <ModalAddTeacher handleClose={handleClose} show={show} addTeacher={addTeacher} students={students} teachers={teachers}/>
        </>
    )
}

UsersInCourseCard.propTypes = {
    students: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            midtermResult: PropTypes.string.isRequired,
            finalResult: PropTypes.string.isRequired
        })
    ),
    teachers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            isMain: PropTypes.bool.isRequired
        })
    ),
    isAdmin: PropTypes.bool.isRequired,
    isMainTeacher: PropTypes.bool.isRequired,
    isTeacher: PropTypes.bool.isRequired,
    editStatusStudent: PropTypes.func.isRequired,
    addMark: PropTypes.func.isRequired,
    addTeacher: PropTypes.func.isRequired
}

export default UsersInCourseCard