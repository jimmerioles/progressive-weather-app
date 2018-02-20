<template>
  <footer>
    <small>© <b><a href="https://twitter.com/jimmerioles" target="_blank" rel="noopener">Jim Merioles</a></b> {{ year }} - A <cite>freeCodeCamp</cite> Project</small>
  </footer>
</template>

<script>
export default {
  name: 'AppCredits',

  props: {
    year: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
footer {
  text-align: center;
  position: absolute;
  bottom: 10px;
  visibility: hidden;
}

@media screen and (min-width: 450px) {
  footer {
    visibility: visible;
  }
}
</style>
