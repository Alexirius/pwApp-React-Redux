// -- API requests constructors -- //

export default class PwApiService {

    _baseUrl = 'http://193.124.114.46:3001/';

    getResponse = async (url, init) => {
        const res = await fetch(`${this._baseUrl}${url}`, init);

        if (!res.ok) {
            const errText = await res.text();
            let error = new Error(`${res.status}: ${errText}`);
            error.status = res.status;
            error.text = errText;
            throw error;
        }
        return res;
    }

    getToken = async (passObj, newAccount = false) => {
        const url = (newAccount) ? 'users' : 'sessions/create';
        const res = await this.getResponse(url, {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(passObj)
        });
        const json = await res.json();
        return json.id_token;
    }

    getUserInfo = async (token) => {
        const res = await this.getResponse('api/protected/user-info',{
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
        });
        const json = await res.json();
        return json.user_info_token;
    }

    getTransList = async (token) => {
        const res = await this.getResponse('api/protected/transactions',{
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`},
        });
        const json = await res.json();
        return json.trans_token.reverse();
    }

    getUsersList = async (token, filter) => {
        const res = await this.getResponse('api/protected/users/list',{
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${token}`},
            body: JSON.stringify({filter: filter})
        });
        const json = await res.json();
        return json;
    }

    createTransaction = async (token, name, amount) => {
        const res = await this.getResponse('api/protected/transactions',{
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${token}`},
            body: JSON.stringify({name: name, amount: amount})
        });
        const json = await res.json();
        return json.trans_token;
    }
}