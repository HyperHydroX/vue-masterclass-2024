<script setup lang="ts">
import { ref } from 'vue'
import type { Tables } from '../../../db/types'
import { supabase } from '@/supabase/supabaseClient'

const projects = ref<Tables<'projects'>[] | null>(null);
(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error)
    console.error(error)

  projects.value = data

  console.log('Projects: ', projects.value)
})()
</script>

<template>
  <div>
    <h1>Projects page</h1>
    <RouterLink to="/">
      Go to home
    </RouterLink>
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
