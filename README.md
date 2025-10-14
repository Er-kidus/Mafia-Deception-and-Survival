# 🎮 Mafia: Deception & Survival
A real-time multiplayer **social deduction game** inspired by classic Mafia. Players take on secret roles as **Mafia** or **Civilians**, debate, accuse, and vote to survive. Built for **web and mobile** using modern technologies.

---

## 🧩 Features

### 🕹 Gameplay
- Real-time multiplayer rooms  
- Random role assignment: Mafia / Civilian  
- Mafia sees allies (5 seconds reveal)  
- Discussion, voting, and elimination rounds  
- Public vote display  
- Win/Lose conditions managed automatically  
- Timed phases with countdowns  

### ⚙️ Configurable Room Settings
- Set number of **players**  
- Set number of **Mafia**  
- Enable/Disable **Skip Vote**  
- Configure **Mafia kills per round**  
- Adjustable timers (discussion, voting, elimination)

### 👤 Player Profile
- Avatar and nickname customization  
- Track total games, wins, and win rate  
- Store statistics across sessions  

### 💬 Social Interaction
- Real-time chat during discussion phase  
- Mid-discussion **vote trigger** (once per round)  
- **Pin suspects** (mark and share suspicions)  

### 🔥 Visuals
- Animated **deck cards** for roles (identical backs, unique fronts)  
- **Circular timers**, **vote bars**, and **avatar-based layout**  
- Smooth transitions and animations  

---

## 🧱 Architecture Overview

| Layer | Description |
|-------|--------------|
| **Frontend** | React + Tailwind + Framer Motion |
| **Backend** | Node.js + Socket.io (real-time engine) |
| **Database** | Firebase / MongoDB |
| **Voice/Chat** | WebRTC / Socket.io |
| **Animations** | Lottie / Framer Motion |

---

## ⚙️ System Flow

```text
Room Created → Players Join → Role Assignment
→ Mafia Sees Allies → Discussion Phase
→ Optional Vote Trigger → Voting Phase
→ Elimination Reveal → Check Win Condition
→ Next Round or End Game
```

---

## 🧠 Game Logic Summary

| Phase | Duration | Description |
|--------|-----------|-------------|
| Setup | 30s | Roles assigned; Mafia allies revealed |
| Discussion | Configurable | Players debate and accuse |
| Voting | 30s | Votes are public; one player eliminated |
| Elimination | 10s | Reveal eliminated player’s role |
| End Game | — | Display stats and results |

---


---

## 📜 License
This project is licensed under the **MIT License** — feel free to modify and distribute it with attribution.

---


