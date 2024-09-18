<script setup lang="ts">
import { ref } from 'vue'
import type { TasksWithProjects } from '@/utils/supaQueries'
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import { usePageStore } from '@/stores/page'
import { columns } from '@/utils/tableColumns/tasksColumns'

const { pageData } = usePageStore()
pageData.title = 'Tasks'

const tasks = ref<TasksWithProjects | null>(null)

async function getTasks() {
  const { data, error } = await tasksWithProjectsQuery

  if (error)
    console.error(error)

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

<style scoped></style>
