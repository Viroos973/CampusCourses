import {useCourse} from "../api/hook/useCourse.js";
import {Button, ListGroup} from "react-bootstrap";
import {useRoles} from "../api/hook/index.js";
import ListItemCourses from "../components/listItemCourses.jsx";
import PropTypes from "prop-types";

const ListCourses = ({url}) => {
    const [data, loading, error] = useCourse(null, url)
    const role = useRoles(null)

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
                            <h2 className="mt-4">Группа - </h2>
                        ) : url === "my" ? (
                            <h2 className="mt-4">Мои курсы</h2>
                        ) : (
                            <h2 className="mt-4">Преподаваемые курсы</h2>
                        )}

                        {role !== null && role.isAdmin && url === "" ? (
                            <Button variant="primary" type="button" className="my-2">СОЗДАТЬ КУРС</Button>
                        ) : null}

                        <ListGroup className="mb-4 mt-3">
                            {data.map((item) => (
                                <ListItemCourses key={item.id} {...item}/>
                            ))}
                        </ListGroup>
                    </>
                )}
            </div>
        </>
    )
}

ListCourses.propTypes = {
    url: PropTypes.string.isRequired
}

export default ListCourses