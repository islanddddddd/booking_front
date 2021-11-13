import http from '../utils/http'


export const baseImgPath = 'http://127.0.0.1:8010/api'
export const baseUrl = 'http://127.0.0.1:8010'

export const userRegister = data => http.post('/user/register/', data);

export const userLogin = data => http.post("/user/login/", data);

export const getPlan = () => http.post("/manage/get_plan/");

export const getOffice = () => http.post("/manage/get_office/");

export const getFacility = data => http.get("/manage/get_facility/", data);

export const addReserve = data => http.post("/manage/add_reserve/", data);

export const buyPlan = data => http.post("/manage/buy_plan/");

export const updateUser = data => http.post("/manage/update_user_info/", data);

export const getFacilityType = () => http.get("/manage/get_facility_type/")

export const addPlan = data => http.post("/manage/add_plan/", data);

export const addFacility = data => http.post("/manage/add_facility/", data);

export const addOffice = data => http.post("/manage/add_office_location/", data);

export const get_hour_ava = data => http.get("/manage/get_hour_ava/", data);
export const get_day_ava = data => http.get("/manage/get_day_ava/", data);

export const get_all_user = () => http.get("manage/get_all_users/");

export const get_all_user_reserve = () => http.get("manage/get_all_user_reserve/")

export const get_user_reserve = data => http.get("manage/get_user_reserve/", data);

export const buy_plan = data => http.post("manage/buy_plan/", data);

export const cancel_reserve = data => http.get("manage/cancel_reserve/", data);

export const get_user_by_id = data => http.get("manage/get_user_by_Id/", data);
