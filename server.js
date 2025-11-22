import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// ---- CREATE PLAN ----
app.post("/v1/plan/create", (req, res) => {
  const { study_goals, availability } = req.body;

  const plan = {
    weeks: 6,
    sessions_per_week: 5,
    goals: study_goals,
    recommended_slots: availability,
    generated_at: Date.now()
  };

  return res.json(plan);
});

// ---- START SESSION ----
app.post("/v1/session/start", (req, res) => {
  const { session_id } = req.body;

  return res.json({
    message: "Session started",
    session_id,
    started_at: Date.now(),
    timer_minutes: 25
  });
});

// ---- CONTENT GENERATION ----
app.post("/v1/content/generate", (req, res) => {
  const { topic, format, difficulty, count } = req.body;

  return res.json({
    topic,
    format,
    items: Array.from({ length: count || 5 }).map((_, i) => ({
      id: i + 1,
      question: `Sample question about ${topic} (${difficulty})`,
      answer: "Sample answer"
    }))
  });
});

// ---- PROGRESS ----
app.get("/v1/progress/:user_id", (req, res) => {
  const { user_id } = req.params;

  return res.json({
    user_id,
    completion_rate: "72%",
    mastery: {
      algebra: 0.8,
      geometry: 0.6
    }
  });
});

app.listen(3000, () => console.log("API running on port 3000"));
