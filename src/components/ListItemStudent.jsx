import {Button, Col, ListGroup, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {CertificationResult} from "./CertificationResult.jsx";
import ModalAddMark from "./Modals/ModalAddMark.jsx";
import {useState} from "react";

const ListItemStudent = ({student, isAdmin, isTeacher, key, editStatusStudent, addMark}) => {
    const [showMidterm, setShowMidterm] = useState(false)
    const [showFinal, setShowFinal] = useState(false)

    const handleCloseMidterm = () => setShowMidterm(false)
    const handleShowMidterm = () => setShowMidterm(true)
    const handleCloseFinal = () => setShowFinal(false)
    const handleShowFinal = () => setShowFinal(true)

    return (
        <>
            <ListGroup.Item key={key}
                            className={(isAdmin || isTeacher) && student.status === "InQueue"
                                ? "d-flex justify-content-between align-items-center flex-wrap gap-2" : null}>
                <Row className="gap-2">
                    <Col>
                        <p className="m-0">{student.name}</p>
                        <p className="text-muted m-0">Статус - {student.status === "Accepted" ? (
                            <span className="text-success">принят в группу</span>
                        ) : student.status === "InQueue" ? (
                            <span className="text-primary">в очереди</span>
                        ) : (
                            <span className="text-danger">отклонен</span>
                        )}</p>
                        <p className="text-muted m-0">{student.email}</p>
                    </Col>
                    {student.status === "Accepted" && student.midtermResult !== null ? (
                        <>
                            {isAdmin || isTeacher ? (
                                <>
                                    <Col>
                                        <Button variant="link" onClick={handleShowMidterm}>{CertificationResult(student.midtermResult, "Промежуточная")}</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="link" onClick={handleShowFinal}>{CertificationResult(student.finalResult, "Финальная")}</Button>
                                    </Col>
                                </>
                            ) : (
                                <>
                                    <Col>
                                        <p>{CertificationResult(student.midtermResult, "Промежуточная")}</p>
                                    </Col>
                                    <Col>
                                        <p>{CertificationResult(student.finalResult, "Финальная")}</p>
                                    </Col>
                                </>
                            )}
                        </>
                    ) : null}
                </Row>
                {(isAdmin || isTeacher) && student.status === "InQueue" ? (
                    <Row className="gap-2">
                        <Col>
                            <Button variant="primary" type="button" onClick={() => editStatusStudent("Accepted", student.id)}>Принять</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" type="button" onClick={() => editStatusStudent("Declined", student.id)}>Отклонить</Button>
                        </Col>
                    </Row>
                ) : null}
            </ListGroup.Item>

            <ModalAddMark handleClose={handleCloseMidterm} show={showMidterm} addMark={addMark} type={"Midterm"} {...student}/>
            <ModalAddMark handleClose={handleCloseFinal} show={showFinal} addMark={addMark} type={"Final"} {...student}/>
        </>
    )
}

ListItemStudent.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        midtermResult: PropTypes.string.isRequired,
        finalResult: PropTypes.string.isRequired
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isTeacher: PropTypes.bool.isRequired,
    key: PropTypes.number.isRequired,
    editStatusStudent: PropTypes.func.isRequired,
    addMark: PropTypes.func.isRequired
}

export default ListItemStudent