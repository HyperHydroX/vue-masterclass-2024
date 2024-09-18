<script setup lang="ts">
import { ref } from 'vue'
import { usePageStore } from '@/stores/page'
import type { Projects } from '@/utils/supaQueries'
import { projectsQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'
import { useErrorStore } from '@/stores/error'

const { pageData } = usePageStore()
const errorStore = useErrorStore()

pageData.title = 'Projects'

const projects = ref<Projects | null>(null)
async function getProjects() {
  const { data, error, status } = await projectsQuery

  if (error)
    errorStore.setError({ error, customCode: status })

  projects.value = data
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>
