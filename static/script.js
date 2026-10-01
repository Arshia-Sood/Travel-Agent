const form = document.getElementById("travel-form");
const requestInput = document.getElementById("travel-request");
const submitButton = document.getElementById("submit-button");
const buttonLabel = submitButton.querySelector(".button-label");
const errorMessage = document.getElementById("error-message");
const resultsSection = document.getElementById("results");

let threadId = null;

function formatContent(value) {
	if (value === null || value === undefined || value === "") return "";
	if (Array.isArray(value)) {
		return value.map((item) => formatContent(item)).filter(Boolean).join("\n\n");
	}
	if (typeof value === "object") {
		return Object.entries(value)
			.map(([key, item]) => {
				const label = key.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
				const detail = formatContent(item);
				return detail ? `${label}: ${detail}` : "";
			})
			.filter(Boolean)
			.join("\n");
	}
	return String(value);
}

function renderCard(cardId, contentId, value) {
	const card = document.getElementById(cardId);
	const content = document.getElementById(contentId);
	const formatted = formatContent(value);
	if (window.marked && window.DOMPurify) {
		content.innerHTML = window.DOMPurify.sanitize(window.marked.parse(formatted));
		content.classList.add("markdown-content");
	} else {
		content.classList.remove("markdown-content");
		content.textContent = formatted;
	}
	card.hidden = !formatted;
}

function setLoading(isLoading) {
	submitButton.disabled = isLoading;
	submitButton.classList.toggle("is-loading", isLoading);
	submitButton.setAttribute("aria-busy", String(isLoading));
	buttonLabel.textContent = isLoading ? "Planning your trip" : "Plan My Trip";
}

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const message = requestInput.value.trim();

	if (!message) {
		requestInput.focus();
		errorMessage.textContent = "Tell us a little about the trip you have in mind.";
		errorMessage.hidden = false;
		return;
	}

	errorMessage.hidden = true;
	errorMessage.textContent = "";
	resultsSection.hidden = true;
	setLoading(true);

	try {
		const response = await fetch("/api/travel", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message, thread_id: threadId }),
		});

		let data;
		try {
			data = await response.json();
		} catch {
			throw new Error("TravelMate returned an unreadable response. Please try again.");
		}

		if (!response.ok || data.success === false) {
			throw new Error(data.error || `We couldn't plan that trip right now (error ${response.status}).`);
		}

		threadId = data.thread_id ?? threadId;
		renderCard("answer-card", "answer-content", data.answer);
		renderCard("flights-card", "flights-content", data.flight_results);
		renderCard("hotels-card", "hotels-content", data.hotel_results);
		renderCard("itinerary-card", "itinerary-content", data.itinerary);
		renderCard("budget-card", "budget-content", data.estimated_budget ?? data.budget);
		renderCard("recommendations-card", "recommendations-content", data.recommendations);

		if (!formatContent(data.answer) && !formatContent(data.flight_results) && !formatContent(data.hotel_results) && !formatContent(data.itinerary)) {
			throw new Error("TravelMate didn't return trip details. Please try submitting your request again.");
		}

		resultsSection.hidden = false;
		requestAnimationFrame(() => resultsSection.scrollIntoView({ behavior: "smooth", block: "start" }));
	} catch (error) {
		errorMessage.textContent = error instanceof Error ? error.message : "Something went wrong. Please try again.";
		errorMessage.hidden = false;
	} finally {
		setLoading(false);
	}
});
