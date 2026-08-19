import portfolioImg from '../assets/portfolio snapshot.png';
import gorideImg from '../assets/Goride snapshot.png';

// const API_BASE_URL = 'http://localhost:8000/api'; // update once Django is live

const mockProjects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description:
      'A personal portfolio built to showcase my work and skills as a full-stack developer, and give clients an easy way to reach out for projects.',
    image: portfolioImg,
    live_demo_url: 'https://oluwaseun-portfolio-two.vercel.app/',
    github_url: 'https://github.com/OluwaseunCfc/oluwaseun-portfolio',
  },
  {
    id: 2,
    title: 'GoRide',
    description:
      'A ride-booking platform built for Lagos residents, offering fixed fares and reliable, experienced drivers for easy navigation across the city.',
    image: gorideImg,
    live_demo_url: 'https://goride-phi.vercel.app/',
    github_url: 'https://github.com/OluwaseunCfc/Goride',
  },
];

export async function getProjects() {
  // Simulates network delay so the loading state actually shows for now.
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects), 500);
  });

  // Once Django is deployed, i will replace the code above with:
  // const response = await fetch(`${API_BASE_URL}/projects/`);
  // if (!response.ok) throw new Error('Failed to fetch projects');
  // return response.json();
}