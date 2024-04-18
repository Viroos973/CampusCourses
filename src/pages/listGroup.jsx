import {Button, ListGroup} from "react-bootstrap";
import ListItemGroup from "../components/ListItemGroup.jsx";
import {useGroup} from "../api/hook/index.js";
import {useState} from "react";
import {useSelector} from "react-redux";
import ModalCreateAndEditGroupCourse from "../components/Modals/ModalCreateAndEditGroupCourse.jsx";

const ListGroups = () => {
    const [show, setShow] = useState(false)
    const [data, loading, error, addItem, deleteItem, editItem] = useGroup(null)
    const roles = useSelector(state => state.roles.roles)

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
                        <h2 className="mt-4">Группы кампусных курсов</h2>

                        {roles !== null && roles.isAdmin ? (
                            <Button variant="primary" type="button" onClick={handleShow} className="mb-2">Создать</Button>
                        ) : null}

                        <ListGroup className="mb-4 mt-3">
                            {data.map((item) => (
                                <ListItemGroup key={item.id} {...item} isAdmin={roles === null ? false : roles.isAdmin} editItem={editItem} deleteItem={deleteItem} />
                            ))}
                        </ListGroup>
                    </>
                )}
            </div>

            <ModalCreateAndEditGroupCourse editOrCreateGroup={addItem} handleClose={handleClose} show={show}/>
        </>
    )
}

export default ListGroups