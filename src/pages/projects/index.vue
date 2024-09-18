<script setup lang="ts">
import { ref } from 'vue'
import { usePageStore } from '@/stores/page'
import type { Projects } from '@/utils/supaQueries'
import { projectsQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'

const { pageData } = usePageStore()
pageData.title = 'Projects'

const projects = ref<Projects | null>(null)
async function getProjects() {
  const { data, error } = await projectsQuery

  if (error)
    console.error(error)

  projects.value = data
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
