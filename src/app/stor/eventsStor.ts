import { create } from 'zustand'
import { produce } from 'immer'
import { TAvatar } from '../avatars/avatarType'
import { equipment, eventsValues, importance, messages, performers } from './constants'
import getRandomNatural from '../utils/getRandomNatural'
import formatDate from '../utils/formatDate'

export type TReadOptions = 'all' | 'unread' | 'read'

type TAvatarComponent = ({ width = '40', height = '40', className }: TAvatar) => React.ReactNode

export type TPerformer = {
  performerId: number
  name: string
  avatar: TAvatarComponent
}

export type TEvent = {
  id: number
  date: Date
  importance: string
  equipment: string
  message: string
  performer: TPerformer
  isRead: boolean
}

interface EventsState {
  lastEventsID: number
  readFilter: TReadOptions,
  isAllRead: boolean
  filter: string
  events: TEvent[]
  toggleReadAllMessages: () => void
  toggleReadMessages: (events: TEvent | TEvent[]) => void
  setReadFilter: (option: TReadOptions) => void
  onReadFilter: () => TEvent[]
  setFilter: (filter: string) => void
  onFilter: () => TEvent[]
  addEvent: () => void
}

export const useEvents = create<EventsState>()((set, get) => ({
  lastEventsID: eventsValues[eventsValues.length - 1].id,
  readFilter: 'all',
  isAllRead: false,
  filter: '',
  events: eventsValues,
  toggleReadAllMessages: () => {
    set(produce(get(), (draft) => {
      draft.events.forEach(it => it.isRead = !draft.isAllRead)
      draft.isAllRead = !draft.isAllRead
    }))
  },
  toggleReadMessages: (events: TEvent | TEvent[]) => {
    if (events instanceof Array) {
      set(
        produce(get(), (draft) => {
          events.forEach(event => {
            const index = draft.events.findIndex(it => it.id === event.id)
            index >= 0 && (draft.events[index].isRead = !draft.events[index].isRead)
          })
        }),
      )
    } else {
      set(
        produce(get(), (draft) => {
          const index = draft.events.findIndex(it => it.id === events.id)
          index >= 0 && (draft.events[index].isRead = !draft.events[index].isRead)
        }),
      )
    }
  },
  setReadFilter: (option: TReadOptions) => set({ readFilter: option }),
  onReadFilter: () => get().readFilter === 'unread'
    ? get().events.filter(it => it.isRead === false)
    : get().readFilter === 'read'
      ? get().events.filter(it => it.isRead === true)
      : get().events,
  setFilter: (filter: string) => set({ filter: filter }),
  onFilter: () => {
    const filter = get().filter.toLowerCase()
    if (filter === '') return get().onReadFilter()
    const temp = get().onReadFilter().filter(it => {
      return it.importance.toLowerCase().includes(filter)
        || (it.equipment || '').toLowerCase().includes(filter)
        || it.message.toLowerCase().includes(filter)
        || it.performer.name.toLowerCase().includes(filter)
        || formatDate(it.date).includes(filter)
    })
    return temp
  },
  addEvent: () => {
    const { lastEventsID } = get()
    const event: TEvent = {
      id: lastEventsID + 1,
      date: new Date(),
      importance: importance[getRandomNatural(importance.length)],
      equipment: `${equipment[getRandomNatural(equipment.length)]} - ${lastEventsID + 1}`,
      message: `${messages[getRandomNatural(messages.length)]} - ${lastEventsID + 1}`,
      performer: performers[getRandomNatural(performers.length)],
      isRead: false,
    }
    set(produce(get(), (draft) => {
      draft.events.push(event)
      ++draft.lastEventsID
    }))
  },
}))
