# 🛡️ Autonomous Self-Healing Infrastructure

A lightweight **Site Reliability Engineering (SRE)** project demonstrating automated service recovery. This system monitors a containerized Node.js application and automatically restores service if the application becomes unresponsive or crashes.

## 🚀 The Problem & Solution
- **The Problem:** Manual intervention to restart crashed or "hung" services increases Mean Time to Recovery (MTTR) and affects system availability.
- **The Solution:** A "Control Loop" that observes the system state via Prometheus and takes corrective action (restarting the Docker container) via Python automation.

## 🛠️ Tech Stack
- **Infrastructure:** Docker, Docker Compose
- **Monitoring:** Prometheus (Time-series Database), Grafana (Visualization)
- **Automation:** Python 3 (Requests library)
- **Application:** Node.js (Express.js) with `prom-client` instrumentation

## 🏗️ Architecture
1. **Node.js App:** Exposes real-time metrics (CPU, Memory, Uptime) at `/metrics`.
2. **Prometheus:** Scrapes the app every 5 seconds to track health status (`up` metric).
3. **Python Watchdog:** A background service that queries the Prometheus API.
4. **Self-Healing:** If Prometheus reports `up=0`, the Python script triggers a `docker restart` command immediately.

## 🧪 Chaos Engineering (How to Test)
To verify the self-healing capabilities, this project includes a **Chaos Route**:

1. **Trigger a Hang:** Visit `http://localhost:8080/stress`. This triggers an infinite loop that blocks the Node.js event loop.
2. **Observation:** Prometheus will fail to scrape the blocked app and mark it as down.
3. **Recovery:** The Python Watchdog will detect the failure in <10 seconds and restart the container.
4. **Result:** The service returns to a healthy state automatically without human intervention.

## 📸 Proof of Concept
*(Note: You should insert your screenshot here by naming it 'demo.png' in your folder)*
![Self-Healing Demo](./demo.png)

## 🔧 Setup & Installation
```bash
# 1. Clone the repository
git clone <your-repo-link>

# 2. Spin up the infrastructure
docker-compose up -d

# 3. Setup Python environment
python -m venv venv
source venv/bin/activate  # Or .\venv\Scripts\activate on Windows
pip install requests

# 4. Start the Watchdog
python watchdog.py