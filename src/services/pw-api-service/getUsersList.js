import getResponse from "./getResponse";

const getUsersList = async (token, filter) => {
    const res = await getResponse('api/protected/users/list',{
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`},
        body: JSON.stringify({filter: filter})
    });
    const json = await res.json();
    return json;
}
export default getUsersList;