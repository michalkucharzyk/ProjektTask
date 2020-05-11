import * as Routes from "./routes"
import * as api from './api'

/**
 * Obsluga dodawani taksow przez api
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const insertTask = params =>
    api.post(Routes.serverUrlTaskInsert(), params);

/**
 * Obsluga obierani wszystkich taskow
 * @param id
 * @returns {Promise | Promise<unknown>}
 */
export const getAllByBoardId = id =>
    api.get(Routes.GetAllByBoardId(id));

/**
 * Usuwanie taska
 * @param id
 * @returns {Promise | Promise<unknown>}
 */
export const deleteTask = id =>
    api.destroy(Routes.serverUrlDeleteBoard(id));

// export const updateBoard = (params) =>
//     api.put(Routes.serverUrlUpdateBoard(),params);


