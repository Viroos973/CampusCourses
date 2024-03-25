import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {api} from "../instance.js";
import {URL_API} from "../../const/url.js";
import swal from "sweetalert";

export const useCourseDetail = (defaultValue) => {
    const [data, setData] = useState(defaultValue)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [update, setUpdate] = useState(false)
    const {courseId} = useParams()

    useEffect(() => {
        const axiosCourse = async () => {
            try {
                const response = await api.get(URL_API.LIST_COURSES + '/' + courseId + "/details")
                setData(response.data)
                setLoading(false)
            } catch {
                setLoading(false)
                setError(true)
            }
        }

        axiosCourse()
    }, [update])

    const signUpCourse = async () => {
        try {
            await api.post(URL_API.LIST_COURSES + '/' + courseId + "/sign-up")
            setUpdate(prev => !prev)
        } catch {
            await swal({
                title: "Что-то пошло не так",
                text: "Произошла ошибка при создании группы",
                icon: "error"
            })
        }
    }

    const editCourseAdmin = async (event, requirements, annotations, handleClose) => {
        const formData = new FormData(event.target)
        const newItem = {}

        formData.forEach((value, key) => {
            newItem[key] = value
        })

        newItem['requirements'] = requirements
        newItem['annotations'] = annotations

        try {
            await api.put(URL_API.LIST_COURSES + '/' + courseId, newItem)
            setUpdate(prev => !prev)
            handleClose()
        } catch {
            await swal({
                title: "Что-то пошло не так",
                text: "Произошла ошибка при создании группы",
                icon: "error"
            })
        }
    }

    const editCourseTeacher = async (requirements, annotations, handleClose) => {
        const newItem = {}

        newItem['requirements'] = requirements
        newItem['annotations'] = annotations

        try {
            await api.put(URL_API.LIST_COURSES + '/' + courseId + "/requirements-and-annotations", newItem)
            setUpdate(prev => !prev)
            handleClose()
        } catch {
            await swal({
                title: "Что-то пошло не так",
                text: "Произошла ошибка при создании группы",
                icon: "error"
            })
        }
    }

    const editStatus = async(event, handleClose) => {
        const formData = new FormData(event.target)
        const newItem = {}

        formData.forEach((value, key) => {
            newItem[key] = value
        })

        try {
            await api.post(URL_API.LIST_COURSES + '/' + courseId + "/status", newItem)
            setUpdate(prev => !prev)
            handleClose()
        } catch {
            await swal({
                title: "Что-то пошло не так",
                text: "Произошла ошибка при создании группы",
                icon: "error"
            })
        }
    }

    return [data, loading, error, signUpCourse, editCourseAdmin, editCourseTeacher, editStatus]
}