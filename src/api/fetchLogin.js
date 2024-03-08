import axios from "axios";
import {URL_API} from "../const/url.js";

export const fetchLogin = async(event, url) => {
    const formData = new FormData(event.target)
    const loginData = {}

    formData.forEach((value, key) => {
        loginData[key] = value
    })

    try {
        const token = await axios.post(URL_API.BASE_URL + url, loginData)
        localStorage.setItem("email", loginData.email)
        localStorage.setItem("token", token.data.token)
        window.location.href = "/"
    } catch (error) {
        return ('Неверные данные')
    }
}