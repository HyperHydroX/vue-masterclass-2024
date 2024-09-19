import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Session, User } from '@supabase/supabase-js'
import { ref } from 'vue'
import type { Tables } from '../../db/types'
import { profileQuery } from '@/utils/supaQueries'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  async function setProfile() {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      const { data } = await profileQuery(user.value.id)

      profile.value = data || null
    }
  }

  async function setAuth(userSession: null | Session = null) {
    if (!userSession) {
      user.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  return {
    user,
    profile,

    setAuth,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
