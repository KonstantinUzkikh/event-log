import { TEvent, TPerformer } from './eventsStor'
import * as Avatars from '../avatars'

export const importance = ['Низкая', 'Высокая', 'Критическая']

export const equipment = ['', 'Вегас', 'Коммутатор', 'Люк', 'ИБП', 'Трансформатор', 'ЛВС']

export const messages = [
  'Сервер Vegas недоступен',
  'Потеряно сетевое соединение',
  'Открыта крышка',
  'Низкий заряд батареи',
  'Недостаточное количество масла',
  'Обрыв силового кабеля',
  'Отсутствует подтверждение пуска в работу',
]

export const performers: TPerformer[] = [
  {
    performerId: 101,
    name: 'Смирнов В.А.',
    avatar: Avatars.AvatarGreen,
  },
  {
    performerId: 102,
    name: 'Капустин С.С.',
    avatar: Avatars.AvatarGreenYellow,
  },
  {
    performerId: 103,
    name: 'Ветрова И.С.',
    avatar: Avatars.AvatarYellow,
  },
  {
    performerId: 104,
    name: 'Лавочкин А.В.',
    avatar: Avatars.AvatarGreen,
  },
  {
    performerId: 105,
    name: 'Ольшанская Е.Г.',
    avatar: Avatars.AvatarYellow,
  },
]

export const eventsValues: TEvent[] = [
  {
    id: 10001,
    date: new Date('10.12.2022 10:00:14'),
    importance: importance[1],
    equipment: equipment[1],
    message: messages[0],
    performer: performers[0],
    isRead: false,
  },
  {
    id: 10002,
    date: new Date('10.12.2022 10:00:15'),
    importance: importance[0],
    equipment: equipment[2],
    message: messages[1],
    performer: performers[1],
    isRead: false,
  },
  {
    id: 10003,
    date: new Date('10.12.2022 10:00:15'),
    importance: importance[0],
    equipment: equipment[4],
    message: messages[2],
    performer: performers[2],
    isRead: false,
  },
  {
    id: 10004,
    date: new Date('10.12.2022 10:00:16'),
    importance: importance[1],
    equipment: equipment[5],
    message: messages[3],
    performer: performers[3],
    isRead: false,
  },
  {
    id: 10005,
    date: new Date('10.12.2022 10:00:16'),
    importance: importance[2],
    equipment: equipment[6],
    message: messages[4],
    performer: performers[4],
    isRead: false,
  },
  {
    id: 10006,
    date: new Date('10.12.2022 10:00:16'),
    importance: importance[2],
    equipment: equipment[7],
    message: messages[5],
    performer: performers[2],
    isRead: false,
  },
  {
    id: 10007,
    date: new Date('10.12.2022 10:00:17'),
    importance: importance[1],
    equipment: equipment[0],
    message: messages[5],
    performer: performers[0],
    isRead: false,
  },
]
