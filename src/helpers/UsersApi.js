import * as Routes from "./Routes"
import * as api from './Api'

export const userLogin = params =>
    api.post(Routes.serverUrlLogin(), params);

export const userRegister = params =>
    api.post(Routes.serverUrlRegister(), params);

export const getUser = id =>
    api.get(Routes.serverUrlUsers(id));
