import {useCourseDetail} from "../api/hook/useCourseDetail.js";
import ModalCreateAndEditCourse from "../components/ModalCreateAndEditCourse.jsx";
import {Button} from "react-bootstrap";
import {useState} from "react";
import {useSelector} from "react-redux";
import CourseDetailCard from "../components/CourseDetailCard.jsx";
import ModalEditTeacherCourse from "../components/ModalEditTeacherCourse.jsx";
import {useCourse} from "../api/hook/useCourse.js";

const CourseDetail = () => {
    const [data, loading, error, signUpCourse, editCourseAdmin, editCourseTeacher, editStatus] = useCourseDetail(null)
    const [dataCourse] = useCourse(null, "my")
    const [show, setShow] = useState(false)
    const roles = useSelector(state => state.roles)

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
                        <h1 className="mt-3">{data.name}</h1>
                        <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 my-2">
                            <h5>Основные данные курса</h5>
                            {roles !== null && roles.isAdmin || data.teachers.some(teach => teach.email === localStorage.getItem("email")) ? (
                                <Button type="button" variant="warning" onClick={handleShow}>Редактировать</Button>
                            ) : null}
                        </div>
                        <CourseDetailCard {...data} signUpCourse={signUpCourse} isAdmin={roles !== null && roles.isAdmin}
                                          isTeacher={data.teachers.some(teach => teach.email === localStorage.getItem("email"))}
                                          isStudent={dataCourse !== null && dataCourse.some(course => course.id === data.id)}
                                          editStatus={editStatus}/>
                    </>
                )}
            </div>

            {roles !== null && roles.isAdmin ? (
                <ModalCreateAndEditCourse addOrEditCourse={editCourseAdmin} handleClose={handleClose} show={show} {...data}
                                          teacher={data !== null && data.teachers.find(item => item.isMain)}/>
            ) : (
                <ModalEditTeacherCourse editCourse={editCourseTeacher} handleClose={handleClose} show={show} {...data}/>
            )}
        </>
    )
}

export default CourseDetail