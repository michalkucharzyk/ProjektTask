import * as Routes from "./routes"
import * as api from './api'

export const insertTask = params =>
    api.post(Routes.serverUrlTaskInsert(), params);

export const getAllByBoardId = id =>
    api.get(Routes.GetAllByBoardId(id));


// export const deleteBoard = id =>
//     api.destroy(Routes.serverUrlDeleteBoard(id));
//
// export const updateBoard = (params) =>
//     api.put(Routes.serverUrlUpdateBoard(),params);


