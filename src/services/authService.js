const API_BASE_URL = 'http://localhost:8000/api'; // i'll update once Django is live

const MOCK_EMAIL = 'seunadeyelu6@gmail.com';
const MOCK_PASSWORD = 'admin123';

export async function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        const fakeToken = 'mock-token-' + Date.now();
        localStorage.setItem('authToken', fakeToken);
        resolve({ token: fakeToken });
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 800);
  });

  // Once Django is deployed, i will replace the code above with:
  // const response = await fetch(`${API_BASE_URL}/auth/login/`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // });
  // if (!response.ok) throw new Error('Invalid email or password.');
  // const data = await response.json();
  // localStorage.setItem('authToken', data.token);
  // return data;
}

export function logout() {
  localStorage.removeItem('authToken');
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('authToken'));
}