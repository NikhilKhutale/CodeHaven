import axios from "axios";

const baseURL =
    process.env.NODE_ENV === "production"
        ? "/"
        : "http://localhost:7070/";

export const axiosInstance = axios.create({
    baseURL,
})