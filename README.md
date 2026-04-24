# LeadPulse AI

LeadPulse AI is an automated AI-powered lead management system that captures, classifies, and routes leads in real time using intelligent workflows.

It combines automation, AI classification, and a modern dashboard to help businesses respond to leads faster and improve conversion rates.

---

## 🚀 Features

- AI-powered lead classification (HOT / WARM / COLD)
- Automated email responses based on lead quality
- Real-time lead storage using Supabase
- Interactive CRM dashboard built with Next.js
- Filtering system by lead status
- Scalable workflow automation using n8n

---

## 🧠 System Architecture

LeadPulse AI is built using a modern full-stack automation architecture:

- Webhook → Lead ingestion
- AI Layer → Lead classification
- Workflow Engine (n8n) → Automation logic
- Database (Supabase) → Data storage
- Frontend (Next.js) → CRM dashboard

---

## 🛠️ Tech Stack

- Next.js (Frontend Dashboard)
- Supabase (Database & API)
- n8n (Automation workflows)
- OpenAI / AI Model (Lead classification)

---

## 📊 Lead Flow

1. User submits a lead via webhook
2. AI classifies lead as HOT / WARM / COLD
3. Workflow routes lead based on status:
   - HOT → Immediate email + alert
   - WARM → Follow-up email
   - COLD → Stored for analytics only
4. All leads are stored in the CRM database
5. Dashboard displays real-time lead data

---

## 📁 Project Structure
