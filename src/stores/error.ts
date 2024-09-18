import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PostgrestError } from '@supabase/supabase-js'
import type { CustomError, ExtendedPostgrestError } from '@/types/error.model'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomError | ExtendedPostgrestError | null>(null)
  const isCustomError = ref<boolean>(false)

  function setError({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error
    customCode?: number
  }) {
    if (typeof error === 'string')
      isCustomError.value = true

    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? new Error(error) : error
      activeError.value.customCode = customCode || 500
      return
    }

    activeError.value = error
    activeError.value.statusCode = customCode || 500
  }

  function clearError() {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    isCustomError,
    setError,
    clearError,
  }
})
