<template>
  <div class="error-404">
    <h1>Server Error {{ '' }}</h1>
    <p>Please try again or come back other time.</p>
  </div>
</template>
<script>
export default {
  name: 'Error500',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
