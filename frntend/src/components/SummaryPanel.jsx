import { useState } from "react";
import { summarizeAI, uploadPDF } from "../services/api";

function SummaryPanel() {
    const [content, setContent] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await uploadPDF(formData);
            alert("PDF uploaded successfully!");
        } catch (err) {
            alert("PDF upload failed.");
        }
    };

    const handleSummarize = async () => {
        if (!content.trim()) return;

        setLoading(true);
        setResponse("");

        try {
            const res = await summarizeAI({
                content,
                difficulty
            });

            setResponse(res.data.summary);
        } catch (err) {
            setResponse("⚠️ Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50">
            {/* PDF Upload */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">
                    Upload PDF (optional)
                </label>

                <input type="file" accept=".pdf" onChange={handleFileUpload} />

                {fileName && (
                    <p className="text-sm text-green-600 mt-2">
                        Uploaded: {fileName}
                    </p>
                )}
            </div>

            {/* Text Input */}
            <textarea
                className="w-full border p-4 rounded-lg mb-6"
                rows="6"
                placeholder="Or paste content to summarize..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
                <select
                    className="border p-2 rounded-lg"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>

                <button
                    onClick={handleSummarize}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Generate Summary
                </button>
            </div>

            {loading && (
                <div className="flex justify-center mb-6">
                    <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            {response && (
                <div className="bg-gray-50 p-6 rounded-xl border whitespace-pre-wrap">
                    {response}
                </div>
            )}
        </div>
    );
}

export default SummaryPanel;