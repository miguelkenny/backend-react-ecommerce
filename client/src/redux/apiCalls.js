import { loginSuccess, loginFailure, loginStart, registerSucces } from "./userRedux"
import { userRequest } from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await userRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const register = async (dispatch, data) => {
    try {
        
        const res = await userRequest.post("/auth/register", data)
        
        dispatch(registerSucces(res.data))

    } catch (error) {
        console.log(error);
    }
}