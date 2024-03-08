import {useEffect, useState} from "react";
import axios from "axios";
import {URL_API} from "../const/url.js";

export const useRoles = (defaultValue) => {
    const [roles, setRoles] = useState(defaultValue)

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await axios.get(URL_API.BASE_URL + URL_API.ROLES_URL)
            setRoles(response.data)
        };

        fetchRoles()
    }, [])

    return roles
}