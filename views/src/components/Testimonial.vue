<template>
  <div v-if="testimonials.length" v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
    <div class="testimonial">
      <h2>{{ testimonial.title }}</h2>
      <span>{{ testimonial.body }}</span>
      <div class="rating">{{ createStarRating(testimonial.rating) }}</div>
    </div>
    <div class="client">
      <img :src="testimonial.personPicture" :alt="testimonial.personName" />
      <div class="client-info">
        <span>{{ testimonial.personName }}</span>
        <span>{{ testimonial.personCompany }}</span>
      </div>
    </div>
  </div>
  <p v-else>Unable to load testimonials at this time.</p>
</template>

<script>
export default {
  data() {
    return {
      testimonials: [],
    };
  },
  methods: {
    async loadTestimonials() {
      try {
        const response = await fetch('http://0.0.0.0:8000/api/testimonials/top');
        this.testimonials = await response.json();
      } catch (error) {
        console.error('Error loading testimonials:', error);
        this.testimonials = [];
      }
    },
    createStarRating(rating) {
      const maxStars = 5;
      const fullStar = '★';
      const emptyStar = '☆';
      return Array(maxStars)
          .fill(emptyStar)
          .map((star, index) => (index < rating ? fullStar : star))
          .join('');
    },
  },
  mounted() {
    this.loadTestimonials();
  },
};
</script>