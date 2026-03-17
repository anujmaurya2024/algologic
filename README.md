# Anti-Gravity: Full-Stack AI Algorithm Visualizer

An intelligent, full-stack MERN application that uses Google Gemini AI to dynamically generate and visualize complex algorithms and system concepts.

## 🚀 How to Run

### Prerequisites
- **Node.js**: v18+ recommended.
- **MongoDB**: A local instance running at `mongodb://localhost:27017` or a MongoDB Atlas connection string.
- **Gemini API Key**: Obtain one from [Google AI Studio](https://aistudio.google.com/).

### Backend Setup
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `server/` folder.
   - Add your Gemini API Key and MongoDB URI:
     ```env
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/anti-gravity
     GEMINI_API_KEY=your_actual_api_key_here
     ```
4. Start the server (Development Mode):
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `algo-visualizer/` directory:
   ```bash
   cd algo-visualizer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## ✨ Features
- **Dynamic AI Generation**: Enter any computer science topic, and Google Gemini will synthesize a step-by-step visualization on-the-fly.
- **Persistence**: AI-generated visualizations are saved to MongoDB, ensuring they are available instantly for future users.
- **Interactive Visualizer**: Smooth animations, narrative explanations, and code-level synchronization.
- **Curated Library**: Built-in visualizations for AVL Trees, Dijkstra's Algorithm, TCP Handshakes, and Round Robin Scheduling.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: MongoDB, Mongoose.
- **AI**: Google Gemini Pro via `@google/generative-ai`.
