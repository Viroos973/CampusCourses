import axios from "axios";
import {URL_API} from "../const/url.js";

export const fetchLogin = async(event) => {
    const formData = new FormData(event.target)
    const loginData = {}

    formData.forEach((value, key) => {
        loginData[key] = value
    })

    try {
        await axios.post(URL_API.BASE_URL + URL_API.LOGIN_URL, loginData)
        localStorage.setItem("email", loginData.email)
        window.location.href = "/"
    } catch (error) {
        return ('Неверные данные')
    }
}