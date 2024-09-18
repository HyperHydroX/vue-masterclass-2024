<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { storeToRefs } from 'pinia'
import { useErrorStore } from '@/stores/error'

const errorStore = useErrorStore()
const { activeError } = storeToRefs(errorStore)

onErrorCaptured((error) => {
  errorStore.setError({ error })
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="activeError" />

    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name" />

        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
