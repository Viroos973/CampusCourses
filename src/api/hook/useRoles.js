import {useEffect, useState} from "react";
import {URL_API} from "../../const/url.js";
import {api} from "../instance.js";

export const useRoles = (defaultValue) => {
    const [roles, setRoles] = useState(defaultValue)

    useEffect(() => {
        const axiosRoles = async () => {
            try {
                const response = await api.get(URL_API.ROLES_URL)
                setRoles(response.data)
            } catch {
                localStorage.setItem("email", "")
                localStorage.setItem("token", "")
            }
        };

        axiosRoles()
    }, [])

    return roles
}