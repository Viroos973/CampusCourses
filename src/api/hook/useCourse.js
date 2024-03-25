import {useEffect, useState} from "react";
import {api} from "../instance.js";
import {URL_API} from "../../const/url.js";
import swal from "sweetalert";
import {useParams} from "react-router-dom";

export const useCourse = (defaultValue, url) => {
    const [dataCourse, setData] = useState(defaultValue)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [update, setUpdate] = useState(false)
    const {groupId} = useParams()

    useEffect(() => {
        const axiosCourse = async () => {
            try {
                const response = await api.get((url === "" ? URL_API.LIST_GROUP_COURSES + '/' + groupId : URL_API.LIST_COURSES + '/' + url))
                setData(response.data)
                setLoading(false)
            } catch {
                setLoading(false)
                setError(true)
            }
        }

        axiosCourse()
    }, [update])

    const addCourse = async (event, requirements, annotations, handleClose) => {
        const formData = new FormData(event.target)
        const newItem = {}

        formData.forEach((value, key) => {
            newItem[key] = value
        })

        newItem['requirements'] = requirements
        newItem['annotations'] = annotations

        try {
            await api.post(URL_API.LIST_GROUP_COURSES + '/' + groupId, newItem)
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

    return [dataCourse, groupId, loading, error, addCourse]
}