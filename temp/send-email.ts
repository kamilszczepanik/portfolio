import { FormData } from "@/components/contact-form";

export function sendEmail(data: FormData) {
  const apiEndpoint = "/api/email";

  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.error || `Error: ${res.status}`);
        });
      }
      return res.json();
    })
    .then((response) => {
      alert(response.message || "Email sent successfully!");
    })
    .catch((err) => {
      console.error("Error sending email:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Failed to send email. Please try again later."
      );
    });
}
