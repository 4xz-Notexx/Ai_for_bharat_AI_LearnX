import { useState } from "react";
import { motion } from "framer-motion";
import { askAI } from "../services/api";

function AskPanel() {
    const [mode, setMode] = useState("question");
    const [input, setInput] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setResponse("");

        try {
            const res = await askAI({
                user_id: "anas123",
                question: mode === "code"
                    ? `Explain this code clearly:\n\n${input}`
                    : input,
                difficulty
            });

            setResponse(res.data.response);
        } catch {
            setResponse("Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white/75 backdrop-blur-xl p-10 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-white/60 transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]">

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setMode("question")}
                    className={`px-4 py-2 rounded-xl transition ${mode === "question"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    Question
                </button>

                <button
                    onClick={() => setMode("code")}
                    className={`px-4 py-2 rounded-xl transition ${mode === "code"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    Code
                </button>
            </div>

            <textarea
                className="w-full border p-4 rounded-xl mb-6 font-mono focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
                rows="6"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your AI question..."
            />

            <div className="flex justify-between items-center mb-6">
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="border p-2 rounded-xl"
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>

                <button
                    onClick={handleAsk}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                >
                    Ask AI
                </button>
            </div>

            {loading && (
                <div className="flex justify-center mb-6">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {response && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 whitespace-pre-wrap"
                >
                    {response}
                </motion.div>
            )}
        </div>
    );
}

export default AskPanel;