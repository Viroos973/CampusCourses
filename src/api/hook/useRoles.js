import {useEffect} from "react";
import {URL_API} from "../../const/url.js";
import {api} from "../instance.js";
import roleActions from "../../store/actionCreators/roleActions.js";

export const useRoles = (dispatch) => {
    useEffect(() => {
        const axiosRoles = async () => {
            try {
                const response = await api.get(URL_API.ROLES_URL)
                dispatch(roleActions(response.data))
            } catch {
                localStorage.setItem("email", "")
                localStorage.setItem("token", "")
                dispatch(roleActions(null))
            }
        };

        axiosRoles()
    }, [])
}