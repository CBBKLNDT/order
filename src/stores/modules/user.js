import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '../../api/user'

export const useUserStore = defineStore(
    'qy_user',
    () => {
        const token = ref('')
        const setToken = (newtoken) => {
            token.value = newtoken
        }
        const removeToken = () => {
            token.value = ''
        }
        const user = ref({})
        const getUser = async () => {
            const res = await userGetInfoService()
            user.value = res.data.data
        }
        const setUser = (obj) => {
            user.value = obj
        }
        return {
            token,
            setToken,
            removeToken,
            user,
            getUser,
            setUser
        }
    },
    {
        persist: true
    }
)