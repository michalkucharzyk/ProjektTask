const serverUrl = 'https://localhost:44369/api';

export const serverUrlLogin = () =>
    `${serverUrl}/user/signin`;

export const serverUrlRegister = () =>
    `${serverUrl}/user/signup`;

export const serverUrlUsers = id =>
    `${serverUrl}/user/GetById/${id}`;
