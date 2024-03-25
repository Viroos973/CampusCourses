import {useCourse} from "../api/hook/useCourse.js";
import {Button, ListGroup} from "react-bootstrap";
import ListItemCourses from "../components/listItemCourses.jsx";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useGroup} from "../api/hook/index.js";
import {useState} from "react";
import ModalCreateAndEditCourse from "../components/ModalCreateAndEditCourse.jsx";

const ListCourses = ({url}) => {
    const [show, setShow] = useState(false)
    const [dataCourse, groupId, loading, error, addCourse] = useCourse(null, url)
    const [data] = useGroup(null)
    const roles = useSelector(state => state.roles)

    const handleGetName = () => {
        if (data !== null){
            const findGroup = data.find(item => item.id === groupId)
            return findGroup.name
        } else {
            return null
        }
    }

    const handleClose = () => setShow(false)

    const handleShow = () => setShow(true)

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

            <ModalCreateAndEditCourse handleClose={handleClose} show={show} addOrEditCourse={addCourse} isCreate={true}/>
        </>
    )
}

ListCourses.propTypes = {
    url: PropTypes.string.isRequired
}

export default ListCourses