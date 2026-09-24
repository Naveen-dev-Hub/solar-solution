const form = document.getElementById("solarForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  result.textContent = "Submitting your request...";
  result.style.color = "#374151";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.bill = data.bill ? Number(data.bill) : null;
  data.consent = form.querySelector('input[name="consent"]').checked;

  try {
    const response = await fetch("http://localhost:5000/api/solar-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Unable to submit request.");
    }

    result.textContent = "Request submitted successfully. We will contact you soon.";
    result.style.color = "green";
    form.reset();
  } catch (error) {
    console.error(error);
    result.textContent = "Submission failed. Make sure the backend server is running on port 5000.";
    result.style.color = "crimson";
  }
});
