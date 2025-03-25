import { FormData } from "@/components/contact-form";

export async function sendEmail(data: FormData): Promise<void> {
  const apiEndpoint = "/api/email";

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.message || `Failed to send email: ${response.status}`
    );
  }

  await response.json();
}
