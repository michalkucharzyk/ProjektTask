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
    api.destroy(Routes.serverUrlDeleteTask(id));

/**
 * Aktualizacja taska
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const updateTask = (params) =>
    api.put(Routes.serverUrlUpdateTask(),params);


