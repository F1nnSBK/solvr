export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const logout = async () => {
    await supabase.auth.signOut()
    await navigateTo('/auth/login')
  }

  const isLoggedIn = computed(() => !!user.value)

  const displayName = computed(() => {
    if (!user.value) return null
    return user.value.email?.split('@')[0] ?? 'Nutzer'
  })

  const avatarLabel = computed(() => {
    if (!displayName.value) return '?'
    return displayName.value.slice(0, 2).toUpperCase()
  })

  return { user, isLoggedIn, displayName, avatarLabel, logout }
}
