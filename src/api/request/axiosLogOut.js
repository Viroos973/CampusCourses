import { URL_API } from "../../const/url.js";
import {api} from "../instance.js";

export const axiosLogOut = async () => {
    try {
        await api.post(URL_API.LOGOUT_URL)
        localStorage.setItem("email", "")
        localStorage.setItem("token", "")
        window.location.href = "/"
    } catch (e) {
        console.log(e)
    }
};