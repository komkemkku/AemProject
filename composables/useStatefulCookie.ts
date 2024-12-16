import type { CookieOptions } from "#app"

export const useStatefulCookie = <t>(key: string, Option?: CookieOptions<t>) => {
  const cookie = useCookie<t | undefined>(key)

  const state = useState<t | undefined>(key,  ()=> cookie.value)
  
  watch(state, ()=> {
    cookie.value = state.value
  })
  return state
}
