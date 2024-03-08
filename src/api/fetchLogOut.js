import axios from "axios";
import { URL_API } from "../const/url.js";

export const fetchLogOut = async () => {
    try {
        await axios.post(URL_API.BASE_URL + URL_API.LOGOUT_URL, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        localStorage.setItem("email", "")
        localStorage.setItem("token", "")
        window.location.href = "/"
    } catch (e) {
        console.log(e)
    }
};