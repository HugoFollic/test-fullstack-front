<script setup lang="ts">
import { ref, onMounted } from "vue";
import TestimonialCard from "./components/TestimonialCard.vue";
import { Testimonial } from "./types";

const testimonials = ref<Testimonial[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const fetchTestimonials = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch('http://0.0.0.0:8000/api/testimonials/top');
    testimonials.value = await response.json();
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load testimonials';
    console.error('Error loading testimonials:', e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTestimonials();
});
</script>

<template>
  <div v-if="isLoading" class="spinner"></div>
  <div v-else-if="error">{{ error }}</div>
  <TestimonialCard
      v-for="testimonial in testimonials"
      :key="testimonial.id"
      :testimonial="testimonial"
  />
</template>
