function createStarRating(rating) {
  const maxStars = 5;
  const fullStar = '★';
  const emptyStar = '☆';
  return Array(maxStars)
    .fill(emptyStar)
    .map((star, index) => index < rating ? fullStar : star)
    .join('');
}

async function loadTestimonials() {
  try {
    const response = await fetch('http://0.0.0.0:8000/api/testimonials/top');
    const testimonials = await response.json();

    const container = document.getElementById('testimonial-container');
    container.innerHTML = testimonials.map(testimonial => `
      <div class="testimonial-card">
        <div class="testimonial">
          <h2>${testimonial.title}</h2>
          <span>${testimonial.body}</span>
          <div class="rating">${createStarRating(testimonial.rating)}</div>
        </div>
        <div class="client">
          <img src="${testimonial.personPicture}" alt="${testimonial.personName}">
          <div class="client-info">
            <span>${testimonial.personName}</span>
            <span>${testimonial.personCompany}</span>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading testimonials:', error);
    document.getElementById('testimonial-container').innerHTML =
      '<p>Unable to load testimonials at this time.</p>';
  }
}

// Load testimonials when the page loads
document.addEventListener('DOMContentLoaded', loadTestimonials);