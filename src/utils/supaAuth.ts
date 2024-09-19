import { supabase } from '@/supabase/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/authForm.model'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

export async function register(formData: RegisterForm) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error)
    return console.error(error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: `${formData.firstName} ${formData.lastName}`,
    })

    if (error)
      return console.error(error)
  }
  authStore.setAuth(data.session)
  return true
}

export async function login(formData: LoginForm) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error)
    return console.error(error)

  authStore.setAuth(data.session)
  return true
}
