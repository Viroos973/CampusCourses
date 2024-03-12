import {api} from "../instance.js";

export const axiosEdit = async(event, url) => {
    const formData = new FormData(event.target)
    const editData = {}

    formData.forEach((value, key) => {
        editData[key] = value
    })

    try {
        await api.put(url, editData)
    } catch {
        return ('Неверные данные')
    }
}