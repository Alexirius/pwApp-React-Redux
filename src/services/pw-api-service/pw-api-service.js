// -- API requests constructors -- //

import getResponse from "./getResponse";

export default class PwApiService {

    getToken = async (passObj, newAccount = false) => {
        const url = (newAccount) ? 'users' : 'sessions/create';
        const res = await getResponse(url, {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(passObj)
        });
        const json = await res.json();
        return json.id_token;
    }

    getUserInfo = async (token) => {
        const res = await getResponse('api/protected/user-info',{
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
        });
        const json = await res.json();
        const userInfo = json.user_info_token;
        const username = userInfo.name;
        return {...userInfo, username};
    }

    getTransList = async (token) => {
        const res = await getResponse('api/protected/transactions',{
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
        });
        const json = await res.json();
        return json.trans_token.reverse();
    }

    createTransaction = async (token, name, amount) => {
        const res = await getResponse('api/protected/transactions',{
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${token}`},
            body: JSON.stringify({name: name, amount: amount})
        });
        const json = await res.json();
        return json.trans_token;
    }
}