import {useEffect, useState} from "react";
import {URL_API} from "../../const/url.js";
import {api} from "../instance.js";

export const useProfile = (defaultValue) => {
    const [profile, setProfile] = useState(defaultValue)

    useEffect(() => {
        const axiosProfile = async () => {
            try {
                const response = await api.get(URL_API.PROFILE_URL)
                setProfile(response.data)
            } catch {
                localStorage.setItem("email", "")
                localStorage.setItem("token", "")
            }
        };

        axiosProfile()
    }, [])

    return [profile, setProfile]
}