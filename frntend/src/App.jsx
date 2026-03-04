import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { clearSession } from "./services/api";

import AskPanel from "./components/AskPanel";
import SummaryPanel from "./components/SummaryPanel";
import QuizPanel from "./components/QuizPanel";

function App() {
  const [activeTab, setActiveTab] = useState("ask");

  const handleClearSession = async () => {
    try {
      await clearSession("anas123");
      toast.success("Session Cleared Successfully");
    } catch {
      toast.error("Failed to clear session");
    }
  };

  const tabStyle = (tab) =>
    `px-6 py-2 rounded-xl font-medium transition-all duration-200 ${activeTab === tab
      ? "bg-indigo-600 text-white shadow-md scale-105"
      : "bg-white/70 hover:bg-white hover:scale-105"
    }`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 p-8 md:p-12">

      {/* Floating Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI LearnX
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Intelligent AI Study Companion
            </p>
          </div>

          <button
            onClick={handleClearSession}
            className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Clear Session
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button className={tabStyle("ask")} onClick={() => setActiveTab("ask")}>
            Ask
          </button>
          <button className={tabStyle("summary")} onClick={() => setActiveTab("summary")}>
            Summarize
          </button>
          <button className={tabStyle("quiz")} onClick={() => setActiveTab("quiz")}>
            Quiz
          </button>
        </div>

        {/* Animated Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "ask" && <AskPanel />}
          {activeTab === "summary" && <SummaryPanel />}
          {activeTab === "quiz" && <QuizPanel />}
        </motion.div>
      </div>
    </div>
  );
}

export default App;