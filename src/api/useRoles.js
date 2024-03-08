import {useEffect, useState} from "react";
import axios from "axios";
import {URL_API} from "../const/url.js";

export const useRoles = (defaultValue) => {
    const [roles, setRoles] = useState(defaultValue)
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(URL_API.BASE_URL + URL_API.ROLES_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setRoles(response.data)
            } catch (error) {
                setRoles({})
                localStorage.setItem("email", "")
            }
        };

        fetchRoles()
    }, [])

    return roles
}