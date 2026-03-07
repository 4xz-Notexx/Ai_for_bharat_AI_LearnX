import axios from "axios";

const API = axios.create({
    baseURL: "http://3.85.143.12:8000"
});

export const askAI = ({ user_id, question, difficulty }) =>
    API.post("/ask", { user_id, question, difficulty });

export const summarizeAI = ({ user_id, content, difficulty }) =>
    API.post("/summarize", { user_id, content, difficulty });

export const quizAI = ({ user_id, content, difficulty }) =>
    API.post("/quiz", { user_id, content, difficulty });

export const uploadPDF = (user_id, formData) =>
    API.post(`/upload-pdf?user_id=${user_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const clearSession = (user_id) =>

    API.post("/clear-session", { user_id });
