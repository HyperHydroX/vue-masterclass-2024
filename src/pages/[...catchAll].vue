<script setup lang="ts">
import { useErrorStore } from '@/stores/error'

const { setError } = useErrorStore()

setError({ error: 'Page not found', customCode: 404 })
</script>

<template>
  <div />
</template>

<style scoped></style>
