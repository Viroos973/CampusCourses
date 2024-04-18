import {Button, Col, ListGroup, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {useState} from "react";
import ModalCreateAndEditGroupCourse from "./Modals/ModalCreateAndEditGroupCourse.jsx";

const ListItemGroup = ({id, name, isAdmin, editItem, deleteItem}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <ListGroup.Item className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <a href={`/groups/${id}`}>{name}</a>
                {isAdmin ? (
                    <Row className="gap-2">
                        <Col>
                            <Button variant="warning" type="button" onClick={handleShow}>Редактировать</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" type="button" onClick={() => deleteItem(id)}>Удалить</Button>
                        </Col>
                    </Row>
                ) : null}
            </ListGroup.Item>

            <ModalCreateAndEditGroupCourse editOrCreateGroup={editItem} handleClose={handleClose} show={show} name={name} id={id}/>
        </>
    )
}

ListItemGroup.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    editItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
}

export default ListItemGroup