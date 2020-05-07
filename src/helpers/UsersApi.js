import * as Routes from "./routes"
import * as api from './api'

export const userLogin = params =>
    api.post(Routes.serverUrlLogin(), params);

export const getUser = id =>
    api.get(Routes.serverUrlUsers(id));
