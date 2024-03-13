import {api} from "../instance.js";

export const axiosLogin = async(event, url) => {
    const formData = new FormData(event.target)
    const loginData = {}

    formData.forEach((value, key) => {
        loginData[key] = value
    })

    try {
        const token = await api.post(url, loginData)
        localStorage.setItem("email", loginData.email)
        localStorage.setItem("token", token.data.token)
        window.location.href = "/"
    } catch {
        return ('Неверные данные')
    }
}