import {Button, Card, Col, ListGroup, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import ModalEditStatusCourse from "./Modals/ModalEditStatusCourse.jsx";
import {useState} from "react";

const CourseDetailCard = ({startYear, maximumStudentsCount, studentsEnrolledCount, studentsInQueueCount, status,
                              signUpCourse, semester, isAdmin, isTeacher, isStudent, editStatus}) => {
    const [show, setShow] = useState(false)
    const [student, setStudent] = useState(isStudent)

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)

    return (
        <>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                        <div>
                            <h6>Статус курса</h6>
                            {status === 'Created' ? (
                                <span className="text-secondary">Создан</span>
                            ) : status === 'OpenForAssigning' ? (
                                <span className="text-success">Открыт для записи</span>
                            ) : status === 'Started' ? (
                                <span className="text-primary">В процессе обучения</span>
                            ) : (
                                <span className="text-danger">Закрыт</span>
                            )}
                        </div>
                        {(isAdmin || isTeacher) && status !== "Finished" ? (
                            <Button type="button" variant="warning" onClick={handleShow}>Изменить</Button>
                        ) : !student && status === 'OpenForAssigning'? (
                            <Button type="button" variant="success" onClick={() => {signUpCourse()
                            setStudent(true)}}>Записаться на курс</Button>
                        ) : null}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h6>Учебный год</h6>
                                <p className='m-0'>{startYear}-{startYear + 1}</p>
                            </Col>
                            <Col>
                                <h6>Семестр</h6>
                                <p className='m-0'>{semester === 'Autumn' ? "Осенний" : "Весенний"}</p>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                <h6>Всего мест</h6>
                                <p className='m-0'>{maximumStudentsCount}</p>
                            </Col>
                            <Col>
                                <h6>Студентов зачислено</h6>
                                <p className='m-0'>{studentsEnrolledCount}</p>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div>
                            <h6>Заявок на рассмотрении</h6>
                            <p className='m-0'>{studentsInQueueCount}</p>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card>

            <ModalEditStatusCourse handleClose={handleClose} show={show} editStatus={editStatus} status={status} />
        </>
    )
}

CourseDetailCard.propTypes = {
    startYear: PropTypes.number.isRequired,
    maximumStudentsCount: PropTypes.number.isRequired,
    studentsEnrolledCount: PropTypes.number.isRequired,
    studentsInQueueCount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isTeacher: PropTypes.bool.isRequired,
    isStudent: PropTypes.bool.isRequired,
    signUpCourse: PropTypes.func.isRequired,
    editStatus: PropTypes.func.isRequired
}

export default CourseDetailCard