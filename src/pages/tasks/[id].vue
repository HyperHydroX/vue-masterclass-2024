<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { usePageStore } from '@/stores/page'
import type { Task } from '@/utils/supaQueries'
import { taskQuery } from '@/utils/supaQueries'

const route = useRoute('/tasks/[id]')
const { pageData } = usePageStore()

const task = ref<Task | null>(null)

watch(
  () => task.value?.name,
  () => (pageData.title = `Task: ${task.value?.name || ''}`),
)

async function getTask() {
  const { data, error } = await taskQuery(route.params.id)

  if (error)
    console.error(error)

  task.value = data
}

await getTask()
</script>

<template>
  <Table v-if="task">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ task.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ task.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Assignee </TableHead>
      <TableCell>Lorem ipsum</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Project </TableHead>
      <TableCell> {{ task.projects?.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ task.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            v-for="collab in task.collaborators"
            :key="collab"
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              to=""
            >
              <AvatarImage src="" alt="" />
              <AvatarFallback />
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
    <TableRow class="hover:bg-transparent">
      <TableHead class="align-top pt-4">
        Comments
      </TableHead>

      <TableCell>
        Comments cards goes in here..

        <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
          <textarea
            placeholder="Add your comment.."
            class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
          />
          <div class="flex justify-between mt-3">
            <Button> Comment </Button>
            <div class="flex gap-4">
              <button variant="ghost" @click.prevent>
                <iconify-icon icon="lucide:paperclip" />
                <span class="sr-only">Attach file</span>
              </button>
              <button variant="ghost" @click.prevent>
                <iconify-icon icon="lucide:image-up" />

                <span class="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  </Table>
</template>

<style scoped></style>
