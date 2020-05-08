import * as Routes from "./routes"
import * as api from './api'

export const userLogin = params =>
    api.post(Routes.serverUrlLogin(), params);

export const userRegister = params =>
    api.post(Routes.serverUrlRegister(), params);

export const getUser = id =>
    api.get(Routes.serverUrlUsers(id));
