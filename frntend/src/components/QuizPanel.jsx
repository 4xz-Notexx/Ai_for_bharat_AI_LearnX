import { useState } from "react";
import { quizAI } from "../services/api";

function QuizPanel() {
    const [content, setContent] = useState("");
    const [difficulty, setDifficulty] = useState("beginner");
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleQuiz = async () => {
        if (!content.trim()) return;

        setLoading(true);
        setQuiz([]);
        setAnswers({});
        setShowFeedback(false);

        try {
            const res = await quizAI({ content, difficulty });
            setQuiz(res.data.quiz);
        } catch {
            alert("Quiz generation failed.");
        }

        setLoading(false);
    };

    const handleSelect = (questionId, option) => {
        setAnswers({ ...answers, [questionId]: option });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50">

            <textarea
                className="w-full border p-4 rounded-lg mb-6"
                rows="5"
                placeholder="Paste content for quiz..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

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
                    onClick={handleQuiz}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Generate Quiz
                </button>
            </div>

            {loading && <p>Generating quiz...</p>}

            {quiz.map((q) => (
                <div key={q.id} className="mb-6 p-4 border rounded-lg">
                    <p className="font-semibold mb-3">{q.question}</p>

                    {q.options?.map((option, index) => {
                        const isCorrect = option === q.correctAnswer;
                        const isSelected = answers[q.id] === option;

                        return (
                            <div key={index} className="mb-2">
                                <button
                                    onClick={() => handleSelect(q.id, option)}
                                    className={`px-4 py-2 rounded-lg border w-full text-left
                  ${showFeedback
                                            ? isCorrect
                                                ? "bg-green-200"
                                                : isSelected
                                                    ? "bg-red-200"
                                                    : ""
                                            : "hover:bg-gray-100"
                                        }`}
                                >
                                    {option}
                                </button>
                            </div>
                        );
                    })}

                    {showFeedback && (
                        <p className="mt-3 text-sm text-gray-700">
                            Explanation: {q.explanation}
                        </p>
                    )}
                </div>
            ))}

            {quiz.length > 0 && !showFeedback && (
                <button
                    onClick={() => setShowFeedback(true)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                    Submit Answers
                </button>
            )}
        </div>
    );
}

export default QuizPanel;