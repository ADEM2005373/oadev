type InquiryPayload = {
  name: string;
  email: string;
  project: string;
  budget: string;
};

export async function sendInquiry(payload: InquiryPayload) {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;
  if (!formId) throw new Error("Missing VITE_FORMSPREE_FORM_ID");

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      source: "oa-dev-site",
      ts: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const data = (await response.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}

