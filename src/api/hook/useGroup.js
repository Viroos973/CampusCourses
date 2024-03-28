import {useEffect, useState} from "react";
import {api} from "../instance.js";
import {URL_API} from "../../const/url.js";
import swal from "sweetalert";

export const useGroup = (defaultValue) => {
    const [data, setData] = useState(defaultValue)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const axiosGroup = async() => {
            try {
                const response = await api.get(URL_API.LIST_GROUP_COURSES)
                setData(response.data)
                setLoading(false)
            } catch {
                setLoading(false)
                setError(true)
            }
        }

        axiosGroup()
    }, [update])

    const addItem = async(event, handleClose) => {
        const formData = new FormData(event.target)
        const newItem = {}

        formData.forEach((value, key) => {
            newItem[key] = value
        })

        try {
            await api.post(URL_API.LIST_GROUP_COURSES, newItem)
            setUpdate(prev => !prev)
            await swal({
                title: "Успех!",
                text: `Вы успешно создали группу ${newItem.name}`,
                icon: "success"
            })
            handleClose()
        } catch {
            await swal({
                title: "Что-то пошло не так",
                text: "Произошла ошибка при создании группы",
                icon: "error"
            })
        }
    }

    const deleteItem = async(itemId) => {
        const willDelete = await swal({
            title: "Вы уверены, что хотите удалить эту группу",
            text: "После удаления вы уже не сможете востановить эту группу",
            icon: "warning",
            dangerMode: true,
            buttons: ["Отмена", "Удалить"]
        })

        if (willDelete) {
            try {
                await api.delete(URL_API.LIST_GROUP_COURSES + '/' + itemId)
                await swal({
                    text: "Группа успешно удалена",
                    icon: "success"
                })
                setUpdate(prev => !prev)
            } catch {
                await swal({
                    title: "Что-то пошло не так",
                    text: "Произошла ошибка при удалении группы",
                    icon: "error"
                })
            }
        } else {
            await swal({
                text: "Удаление группы отменено"
            })
        }
    }

    const editItem = async(event, handleClose, itemId) => {
        const willDelete = await swal({
            title: "Вы уверены, что хотите изменить название этой группы",
            text: "После изменения названия вы уже не сможете востановить прежнее",
            icon: "warning",
            dangerMode: true,
            buttons: ["Отмена", "Изменить"]
        })

        if (willDelete){
            const formData = new FormData(event.target)
            const editItem = {}

            formData.forEach((value, key) => {
                editItem[key] = value
            })

            try {
                await api.put(URL_API.LIST_GROUP_COURSES + '/' + itemId, editItem)
                await swal({
                    text: "Группа успешно изменена",
                    icon: "success"
                })
                handleClose()
                setUpdate(prev => !prev)
            } catch {
                await swal({
                    title: "Что-то пошло не так",
                    text: "Произошла ошибка при изменении названия группы",
                    icon: "error"
                })
            }
        } else {
            await swal({
                text: "Изменение группы отменено"
            })
        }
    }

    return [data, loading, error, addItem, deleteItem, editItem]
}