import * as Routes from "./routes"
import * as api from './api'

export const insertBoard = params =>
    api.post(Routes.serverUrlBoardInsert(), params);

export const getAllByUserId = id =>
    api.get(Routes.serverUrlGetAllByUserId(id));

export const deleteBoard = id =>
    api.destroy(Routes.serverUrlDeleteBoard(id));

export const updateBoard = (params) =>
    api.put(Routes.serverUrlUpdateBoard(),params);


