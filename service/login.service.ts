import type { Login } from "~/Models/page.model"
import { client } from "./httpClient"

export const login = (payload: Login) => {
    return client ({
        url: 'auth/login',
        method: 'post',
        data: payload
    })
}