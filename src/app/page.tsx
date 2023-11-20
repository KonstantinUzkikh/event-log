'use client'

import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import clsx from 'clsx'
import EventsTable from '@/app/components/eventsTable'
import EventsCards from '@/app/components/eventsCard'
import { TEvent, TReadOptions, useEvents } from './stor/eventsStor'
import { RadioButton } from 'primereact/radiobutton'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import formatDate from './utils/formatDate'

type TRead = {
  name: string,
  code: TReadOptions,
}

export default function Home() {
  const addEvent = useEvents((state) => state.addEvent)
  const filter = useEvents((state) => state.filter)
  const setFilter = useEvents((state) => state.setFilter)
  const readFilter = useEvents((state) => state.readFilter)
  const setReadFilter = useEvents((state) => state.setReadFilter)

  const [windowWidth, setWindowWidth] = useState(1024)
  const [windowHeight, setWindowHeight] = useState(850)

  const onReadFilter = (events: TEvent[]) => {
    return readFilter === 'unread'
      ? events.filter(it => it.isRead === false)
      : readFilter === 'read'
        ? events.filter(it => it.isRead === true)
        : events
  }

  const onFilter = (events: TEvent[]) => {
    if (filter === '') return onReadFilter(events)
    const filterTemplate = filter.toLowerCase()
    const temp = onReadFilter(events).filter(it => {
      return it.importance.toLowerCase().includes(filterTemplate)
        || (it.equipment || '').toLowerCase().includes(filterTemplate)
        || it.message.toLowerCase().includes(filterTemplate)
        || it.performer.name.toLowerCase().includes(filterTemplate)
        || formatDate(it.date).includes(filterTemplate)
    })
    return temp
  }

  const [intervals, setIntervals] = useState<{ intervalFirst: NodeJS.Timeout | null; intervalSecond: NodeJS.Timeout | null }>({ intervalFirst: null, intervalSecond: null })
  const [format, setFormat] = useState<'table' | 'card'>('table')
  const [generation, setGeneration] = useState<'start' | 'stop'>('stop')
  const [readState, setReadState] = useState<TRead | null>(null);
  const readOptions: TRead[] = [
    { name: 'Все', code: 'all' },
    { name: 'Не прочитанные', code: 'unread' },
    { name: 'Прочитанные', code: 'read' },
  ];

  useEffect(() => {
    const { intervalFirst, intervalSecond } = intervals
    if (generation === 'start') {
      setIntervals({
        intervalFirst: setInterval(() => addEvent(), 3000),
        intervalSecond: setInterval(() => addEvent(), 5000)
      })
    } else {
      intervalFirst && clearInterval(intervalFirst)
      intervalSecond && clearInterval(intervalSecond)
    }
    return () => {
      intervalFirst && clearInterval(intervalFirst)
      intervalSecond && clearInterval(intervalSecond)
    }
  }, [generation])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []);

  return (
    <main className='min-h-screen w-full p-2'>
      <div className='flex justify-between pb-3'>
        <div className='flex gap-3 items-center'>
          <Button label='Таблица' raised className={clsx(
            'py-1 px-2 rounded-[10px]',
            'text-fz-body',
            format === 'table' ? 'bg-blue-200 cursor-default' : 'hover:bg-blue-300',
          )}
            onClick={() => setFormat('table')}
          />
          <Button label='Карточки' raised className={clsx(
            'py-1 px-2 text-fz-body rounded-[10px]',
            format === 'card' ? 'bg-blue-200 cursor-default' : 'hover:bg-blue-300'
          )}
            onClick={() => setFormat('card')}
          />
        </div>
        <div className='flex items-center gap-3 text-fz-body'>
          {windowWidth > 1023 && <span>Генерация событий:</span>}
          <div className='flex items-center'>
            <RadioButton inputId='start' value='start' onChange={(e) => setGeneration(e.value)} checked={generation === 'start'} />
            <label htmlFor='start' className='ml-2'>старт</label>
          </div>
          <div className='flex items-center'>
            <RadioButton inputId='stop' value='stop' onChange={(e) => setGeneration(e.value)} checked={generation === 'stop'} />
            <label htmlFor='stop' className='ml-2'>стоп</label>
          </div>
        </div>

        <div className='flex items-center gap-3 text-fz-body'>
          <span>Сообщения:</span>
          <Dropdown value={readState} onChange={(e: DropdownChangeEvent) => {
            setReadState(e.value)
            setReadFilter(e.value.code)
          }} options={readOptions} optionLabel='name'
            placeholder='Вид' className='w-full md:w-14rem' />
        </div>
        <div className='flex gap-3 items-center text-fz-body shadow-md rounded-[10px] py-.5 bg-white'>
          <span className='px-3 flex gap-2 justify-end items-center'>
            <i className='pi pi-search bg-white' />
            <InputText
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={windowWidth > 1023 ? 'Поиск по ключевому слову' : 'Ключевое слово'}
              className={clsx(windowWidth < 850 && 'w-[100px]')}
            />
          </span>
        </div>
      </div>
      {format === 'table'
        ? <EventsTable onFilter={onFilter} windowHeight={windowHeight} />
        : <EventsCards onFilter={onFilter} windowHeight={windowHeight} />}
    </main>
  )
}
