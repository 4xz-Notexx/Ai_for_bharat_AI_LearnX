Frontend (React + Tailwind)
│
▼
FastAPI Backend (EC2)
│
▼
Context Manager + Prompt Engine
│
▼
AWS Bedrock (amazon.nova-micro-v1:0)
│
▼
AI Response → Frontend


---

### 🔹 Frontend Layer

- Built with React
- Tailwind CSS for modern UI
- Framer Motion for animations
- Axios for API communication
- Maintains tab-based interaction (Ask / Summarize / Quiz)

---

### 🔹 Backend Layer (FastAPI)

Handles:

- Session context management
- Difficulty adaptation engine
- PDF parsing
- Prompt construction
- Secure Bedrock invocation

Stateless REST architecture ensures scalability.

---

### 🔹 AI Layer (AWS Bedrock)

Model Used:
amazon.nova-micro-v1:0

Why Nova Micro?

- Cost-efficient
- Fast inference
- Optimized for scalable workloads
- Suitable for large student base

---

### 🔹 Context Management Engine

Each user session stores:

- Previous questions
- AI responses
- Difficulty level
- PDF content reference

This enables contextual, continuous learning.

---

### 🔹 Difficulty Adapter

Dynamic prompt shaping:

- Beginner → Simple explanations
- Intermediate → Structured reasoning
- Advanced → Technical depth

Ensures personalized learning experience.

---

### 🔹 PDF Processing Flow

1. User uploads PDF
2. Backend extracts text using parser
3. Text stored in session context
4. AI answers based on document + history

---

## ☁️ AWS Deployment Architecture


User Browser
│
▼
AWS EC2 (FastAPI Backend)
│
▼
AWS Bedrock (Nova Micro Model)


Security:

- IAM Role-based access
- Secure API invocation
- No hardcoded credentials

---

## 📊 Scalability Considerations

- Stateless backend design
- Horizontal scaling with multiple EC2 instances
- Future-ready for AWS Load Balancer
- Serverless migration path using AWS Lambda