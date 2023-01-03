import axios from "axios";
//base url  https://api.themoviedb.org/3
//apikey ?api_key=0ec35a7e2d3637bdfd12915490ef85f9

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
});
export default api;