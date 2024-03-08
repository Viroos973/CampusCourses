import {useEffect, useState} from "react";
import axios from "axios";
import {URL_API} from "../const/url.js";

export const useProfile = (defaultValue) => {
    const [profile, setProfile] = useState(defaultValue)

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await axios.get(URL_API.BASE_URL + URL_API.PROFILE_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setProfile(response.data)
        };

        fetchProfile()
    }, [])

    return [profile, setProfile]
}