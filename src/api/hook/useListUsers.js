import {useEffect, useState} from "react";
import {api} from "../instance.js";
import {URL_API} from "../../const/url.js";

export const useListUsers = (defaultValue) => {
    const [users, setUsers] = useState(defaultValue)

    useEffect(() => {
        const axiosUsers = async() => {
            try {
                const response = await api.get(URL_API.LIST_USERS)
                setUsers(response.data)
            } catch {
                setUsers(defaultValue)
            }
        }

        axiosUsers()
    }, [])

    return users
}