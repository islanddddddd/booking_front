import http from '../utils/http'


export const baseImgPath = 'http://127.0.0.1:8010/api'
export const baseUrl = 'http://127.0.0.1:8010'

export const userRegister = data => http.post('/user/register/', data);

export const userLogin = data => http.post("/user/login/", data);

export const getPlan= () => http.get("/manage/get_plan/");

