<script setup lang="ts">
import { Testimonial } from "../types";

const props = defineProps<{
  testimonial: Testimonial,
}>();

const createStarRating = (rating: number) => {
  const maxStars = 5;
  const fullStar = '★';
  const emptyStar = '☆';
  return Array(maxStars)
      .fill(emptyStar)
      .map((star, index) => (index < rating ? fullStar : star))
      .join('');
};

</script>
<template>
  <div class="testimonial-card">
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
</template>
