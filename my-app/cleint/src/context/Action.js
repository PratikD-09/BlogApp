export const LoginStart= (userCridentials)=>({
    type:"LOGIN_START",
})

export const LoginSuccess = (user)=>({
    type:"LOGIN_SUCCESS",
    paylode:user
})

export const LoginFail = ()=>({
    type:"LOGIN_FAIL"
})

export const Logout = ()=>({
    type:"LOGOUT"
})