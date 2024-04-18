import {ListGroup, Badge} from "react-bootstrap";
import PropTypes from "prop-types";

const ListItemTeacher = ({teacher, key}) => {
    return (
        <ListGroup.Item key={key}>
            <h6>{teacher.name} {teacher.isMain ? (<Badge bg="success">основной</Badge>) : null}</h6>
            <span className="text-muted">{teacher.email}</span>
        </ListGroup.Item>
    )
}

ListItemTeacher.propTypes = {
    teacher: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        isMain: PropTypes.bool.isRequired
    }).isRequired,
    key: PropTypes.number.isRequired
}

export default ListItemTeacher