const serverUrl = 'https://localhost:44369/api';

/**
 * Url do logowania
 * @returns {string}
 */
export const serverUrlLogin = () =>
    `${serverUrl}/user/signin`;

/**
 * Url do rejestracji
 * @returns {string}
 */
export const serverUrlRegister = () =>
    `${serverUrl}/user/signup`;

/**
 * ulr do pobierania uzytkownika
 * @param id
 * @returns {string}
 */
export const serverUrlUsers = id =>
    `${serverUrl}/user/GetById/${id}`;

/**Board url api **/

/**
 * Ulr do dodwania tablicy
 * @returns {string}
 */
export const serverUrlBoardInsert = () =>
    `${serverUrl}/Board/add`;

/**
 * Url do pobrania wszystkich tablic uzytkownika
 * @param id
 * @returns {string}
 */
export const serverUrlGetAllByUserId = (id) =>
    `${serverUrl}/Board/GetAllByUserId/${id}`;

/**
 * Ulr do usuwana tablicy
 * @param id
 * @returns {string}
 */
export const serverUrlDeleteBoard = (id) =>
    `${serverUrl}/Board/delete/${id}`;

/**
 * Ulr do aktualizacji tablicy
 * @returns {string}
 */
export const serverUrlUpdateBoard = () =>
    `${serverUrl}/Board/update`;


/**Task url api **/
/**
 * Url do dodwania taskow
 * @returns {string}
 */
export const serverUrlTaskInsert = () =>
    `${serverUrl}/Task/add`;

/**
 * Ulr do pobierania taksow dla wskaznej tablicy
 * @param id
 * @returns {string}
 * @constructor
 */
export const GetAllByBoardId = (id) =>
    `${serverUrl}/Task/GetAllByBoardId/${id}`;

/**
 * Ulr do usuwanie tasków
 * @param id
 * @returns {string}
 */
export const serverUrlDeleteTask = (id) =>
    `${serverUrl}/Task/delete/${id}`;

