import request from "./request";


export default async function () {
    const result = await request.get('/api/banner')
    return result;

}
