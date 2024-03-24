import {ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const ListItemCourses = ({id, name, startYear, maximumStudentsCount, remainingSlotsCount, status, semester}) => {
    return (
        <ListGroup.Item as={Link} to={`/courses/${id}`}>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <h4>{name}</h4>
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
            <p className='m-0'>Учебный год - {startYear}-{startYear + 1}</p>
            <p className='m-0'>Семестр - {semester === 'Autumn' ? "Осенний" : "Весенний"}</p>
            <p className="text-muted m-0">Мест всего - {maximumStudentsCount}</p>
            <p className="text-muted m-0">Мест свободно - {remainingSlotsCount}</p>
        </ListGroup.Item>
    )
}

ListItemCourses.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startYear: PropTypes.number.isRequired,
    maximumStudentsCount: PropTypes.number.isRequired,
    remainingSlotsCount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    semester: PropTypes.string.isRequired
}

export default ListItemCourses