<script setup lang="ts">
import { ref } from 'vue'
import type { Tables } from '../../../db/types'
import { supabase } from '@/supabase/supabaseClient'

const tasks = ref<Tables<'tasks'>[] | null>(null);
(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error)
    console.error(error)

  tasks.value = data
})()
</script>

<template>
  <div>
    <h1>Projects page</h1>
    <RouterLink to="/">
      Go to home
    </RouterLink>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
