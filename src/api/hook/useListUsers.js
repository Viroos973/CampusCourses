import {useEffect} from "react";
import {api} from "../instance.js";
import {URL_API} from "../../const/url.js";
import usersActions from "../../store/actionCreators/usersActions.js";

export const useListUsers = (dispatch) => {
    useEffect(() => {
        const axiosUsers = async() => {
            try {
                const response = await api.get(URL_API.LIST_USERS)
                dispatch(usersActions(response.data))
            } catch {
                dispatch(usersActions(null))
            }
        }

        axiosUsers()
    }, [])
}