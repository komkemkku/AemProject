export default defineNuxtRouteMiddleware((to, from) => {
    const reftoken = useStatefulCookie('token')
    if(!reftoken.value){
        return navigateTo('/login')
    }

})
