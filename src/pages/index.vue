<script setup lang="ts">
import { usePageStore } from '@/stores/page'

const { pageData } = usePageStore()
pageData.title = 'Home'
</script>

<template>
  <div>
    <h1>Home page</h1>
  </div>
</template>

<style scoped></style>
