import axios from "axios";
import {URL_API} from "../const/url.js";

export const fetchEdit = async(event, url) => {
    const formData = new FormData(event.target)
    const editData = {}

    formData.forEach((value, key) => {
        editData[key] = value
    })

    try {
        await axios.put(URL_API.BASE_URL + url, editData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        window.location.reload()
    } catch (error) {
        return ('Неверные данные')
    }
}