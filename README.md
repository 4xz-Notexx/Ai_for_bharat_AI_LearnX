# 🚀 AI LearnX  
### Intelligent AI Study Companion for Bharat 🇮🇳  

AI LearnX is an adaptive AI-powered learning assistant built using AWS Bedrock.  
It enables students to ask questions, summarize content, generate quizzes, and learn at personalized difficulty levels — all while maintaining contextual understanding across sessions.

Built for **AWS AI for Bharat Hackathon 2026**.

---

## 🎯 Problem Statement

Students in India often struggle with:

- Lack of personalized AI learning tools
- Difficulty adapting content to skill level
- Losing context across multiple queries
- Static quiz systems without intelligent feedback
- Limited AI solutions optimized for Indian learners

AI LearnX addresses these challenges using scalable AWS-native architecture.

---

## ✨ Key Features

### 🧠 Context-Aware AI
Maintains session history to provide meaningful, continuous learning conversations.

### 📚 Adaptive Difficulty
Beginner / Intermediate / Advanced modes dynamically adjust explanation depth.

### 📄 PDF-Based Learning
Upload study material and ask contextual questions instantly.

### 📝 AI-Generated Quiz
Generates MCQs with intelligent feedback and explanation.

### 💻 Code Understanding Mode
Explains code clearly with structured breakdown.

---

## 🏗 Architecture Overview

Frontend:
- React + Tailwind CSS
- Framer Motion (UI animations)
- Axios API Integration

Backend:
- FastAPI
- AWS Bedrock (amazon.nova-micro-v1:0)
- Context Manager
- PDF Parser
- Adaptive Prompt Engine

Cloud:
- AWS EC2 (Deployment)
- AWS Bedrock
- IAM Role-based authentication

---

## ☁️ AWS Integration

AI LearnX leverages:

- **Amazon Bedrock** for foundation model inference  
- **Nova Micro v1** for optimized cost-efficient AI generation  
- **EC2** for scalable backend hosting  
- IAM secure role access  

Designed to scale for millions of learners across Bharat.

---

## 🔄 System Flow

1. User submits question / content
2. Context manager attaches session history
3. Difficulty adapter modifies prompt
4. Backend calls AWS Bedrock
5. AI response returned
6. Context updated for next interaction

---

## 🧪 Demo Flow

1. Ask AI question (Beginner mode)
2. Switch to Advanced mode
3. Upload PDF and ask contextual question
4. Generate adaptive quiz
5. View feedback and explanation

---

## 📈 Scalability & Impact

- Serverless-ready backend
- Stateless API design
- Low-cost model (Nova Micro)
- Suitable for government education initiatives
- Bharat-focused AI learning accessibility

---

## 🛠 Tech Stack

- Python
- FastAPI
- React
- Tailwind CSS
- AWS Bedrock
- AWS EC2
- Axios
- Framer Motion

---

## 👨‍💻 Team

- Backend & AI: Anas Ahmad  
- Presentation & Strategy: Team Member  

---

## 🚀 Future Enhancements

- Multi-language support (Hindi, regional languages)
- Voice-based interaction
- Student progress tracking dashboard
- AWS Lambda serverless deployment
- Mobile-first version

---

## 📜 License

MIT License

---

### Built with ❤️ for AI for Bharat