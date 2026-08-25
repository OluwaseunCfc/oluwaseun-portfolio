const API_BASE_URL = 'http://localhost:8000/api'; // updated once Django is live

export async function submitContactForm(formData) {
  // Simulates network delay so the loading state actually shows for now.
  return new Promise((resolve) => {
    console.log('Contact form submitted:', formData);
    setTimeout(() => resolve({ success: true }), 800);
  });

  // Once Django is deployed, i'll replace the code above with:
  // const response = await fetch(`${API_BASE_URL}/contact/`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData),
  // });
  // if (!response.ok) throw new Error('Failed to send message');
  // return response.json();
}