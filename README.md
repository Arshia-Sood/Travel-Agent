# ✈️ TravelMate AI — Multi-Agent Travel Planner with LangGraph

TravelMate AI is an open-source **AI-powered multi-agent travel planner** that converts a natural-language travel request into a practical travel plan with **flight suggestions, hotel recommendations, and a day-by-day itinerary**.

The project uses **LangGraph** to orchestrate multiple specialized agents, **LangChain** for LLM integration, and **FastAPI** to provide the backend API and web interface.

---

## 🚀 Overview

Planning a trip usually requires switching between multiple websites to search for flights, hotels, destinations, and activities.

TravelMate AI brings these tasks together into a single AI-powered workflow.

A user can simply enter a request such as:

> Plan a 7-day trip to Japan with flights, hotels, sightseeing, and a budget of $2000.

The system then coordinates multiple agents to research the required information and generate a structured travel plan.

--- 

## ✨ Features

- ✈️ **Flight Research Agent**
  - Searches for flight information using AviationStack.
  - Uses IATA airport codes for flight-related queries.

- 🏨 **Hotel Research Agent**
  - Uses Tavily to search the web for relevant hotel and accommodation options.

- 🗺️ **Itinerary Planning Agent**
  - Generates a practical day-by-day travel itinerary.
  - Considers the destination, trip duration, activities, and budget provided by the user.

- 🧠 **Multi-Agent Architecture**
  - Multiple specialized agents work together through a LangGraph workflow.
  - Each agent focuses on a specific part of the travel-planning process.

- 📝 **Final Response Agent**
  - Combines the information gathered by the different agents.
  - Produces a structured and user-friendly travel plan.

- 💾 **Conversation State Persistence**
  - PostgreSQL is used to persist LangGraph conversation state.

- 🌐 **Web Interface**
  - Simple frontend built with HTML, CSS, and JavaScript.
  - FastAPI serves the application and API endpoints.

- ⚡ **LLM-Powered**
  - Uses Google's Gemini models for natural-language understanding and generation.

---

## Tech Stack

- Python 3.10+
- FastAPI
- Jinja2 + HTML/CSS/JavaScript frontend
- LangGraph
- LangChain
- Google Gemini LLMs
- PostgreSQL
- Tavily API
- AviationStack API

## Project Structure

```text
.
├── app.py                # FastAPI app entry point
├── backend.py            # LangGraph travel workflow
├── requirements.txt      # Python dependencies
├── static/               # Static frontend assets
├── templates/            # HTML templates
└── tools/                # Flight and web search integrations
```

## Prerequisites

Before running the project locally, make sure you have:

- Python 3.10 or newer installed
- PostgreSQL running and accessible
- API keys for:
  - Google Gemini
  - Tavily
  - AviationStack

## Environment Variables

Create a .env file in the project root with the following variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/travel_db
GOOGLE_API_KEY=your_google_api_key
AVIATIONSTACK_API_KEY=your_aviationstack_api_key
TAVILY_API_KEY=your_tavily_api_key
DEFAULT_ORIGIN_IATA=DAC
```

## Installation

```bash
python -m venv .venv
source .venv\Scripts\activate
pip install -r requirements.txt
```

## Running the App

Start the FastAPI server:

```bash
python app.py
```

Then open your browser at:

```text
http://127.0.0.1:8000/
```

## API Endpoints

- GET /health - Health check
- POST /api/travel - Submit a travel request


## How the Workflow Works

1. The user submits a travel request.
2. The flight agent gathers flight-related information.
3. The hotel agent searches for accommodation suggestions.
4. The itinerary agent creates a practical travel plan.
5. The final agent formats the result into a polished response.


## Live Demo

The project is deployed and available online:

👉 https://travel-agent-t4ma.onrender.com/

You can directly enter a travel request and test the TravelMate AI application.

## 👩‍💻 Author

Arshia Sood 
Aspiring Data Scientist | Machine Learning Enthusiast

⭐ If you like this project, give it a star!