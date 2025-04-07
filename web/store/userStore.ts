import { create } from 'zustand'
import { z } from 'zod'
import { addToast } from '@heroui/toast'

import axiosInstance from '@/lib/axiosInstance'
import { userSchema } from '@/schema/user'



export type State = {
  pending: boolean
}
export type Actions = {
  login: (user: z.infer<typeof userSchema>) => Promise<boolean>
}

export const userStore = create<State & Actions>()((set) => ({
  pending: false,


  login: async (user) => {
    set({ pending: true });
    try {
      const response = await axiosInstance.post('auth/login',
        user, { withCredentials: true });
      const data = await response.data;

      addToast({
        title: "Success",
        description: data.message,
        color: 'success',
      })

      return true
    } catch (error) {
      addToast({
        title: "Error",
        description: " Please try again.",
        color: 'danger',
      })

      return false
    } finally {
      set({ pending: false });
    }
  },





}))

