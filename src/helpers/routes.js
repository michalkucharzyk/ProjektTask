const serverUrl = 'https://localhost:44369/api';

export const serverUrlLogin = () =>
    `${serverUrl}/user/signin`;

export const serverUrlRegister = () =>
    `${serverUrl}/user/signup`;

export const serverUrlUsers = id =>
    `${serverUrl}/user/GetById/${id}`;

export const serverUrlBoardInsert = () =>
    `${serverUrl}/Board/add`;

export const serverUrlGetAllByUserId = (id) =>
    `${serverUrl}/Board/GetAllByUserId/${id}`;

export const serverUrlDeleteBoard = (id) =>
    `${serverUrl}/Board/delete/${id}`;

export const serverUrlUpdateBoard = () =>
    `${serverUrl}/Board/update`;
