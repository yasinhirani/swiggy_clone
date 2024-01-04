import axios from "axios";

function Interceptor (){
    axios.interceptors.request.use((req) => {
        req.headers["x-cors-api-key"] = process.env.CORS_API_KEY;
        return req;
    })
    return null;
}
export default Interceptor;