/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'

import { Device } from '@/schema/device'


export type State = {
  initalized: boolean
  pending: boolean
  devices: Device[]
}
export type Actions = {
  setDevices: (devices: Device[]) => void
}

export const deviceStore = create<State & Actions>()((set) => ({
  initalized: false,
  pending: false,
  devices: [],

  setDevices: async (devices) => { set({ devices: devices, initalized: true }) },

}))

