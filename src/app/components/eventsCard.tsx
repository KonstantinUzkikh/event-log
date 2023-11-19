import React, { useRef, useState } from 'react'
import { Card } from 'primereact/card'
import { DataView } from 'primereact/dataview'
import clsx from 'clsx'
import { TEvent, useEvents } from '@/app/stor/eventsStor'
import formatDate from '@/app/utils/formatDate'
import { Checkbox } from 'primereact/checkbox'

export default function EventsCards({ onFilter }: { onFilter: (events: TEvent[]) => TEvent[] }) {
  const events = useEvents((state) => state.events)
  const toggleReadMessages = useEvents((state) => state.toggleReadMessages)

  const [selectedEvents, setSelectedEvents] = useState<TEvent[]>([])

  const CardItem = (event: TEvent) => {
    const cardRef = useRef<HTMLButtonElement>(null)

    return (
      <button
        ref={cardRef}
        onClick={() => {
          let temporary = [...selectedEvents]
          const index = temporary.findIndex(it => it.id === event.id)
          index < 0 ? temporary.push(event) : temporary.splice(index, 1)
          setSelectedEvents(temporary)
        }}
        onKeyDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (e.key === ' ' && selectedEvents.length > 0) {
            toggleReadMessages(selectedEvents)
            setSelectedEvents([])
            cardRef?.current?.blur()
          }
        }}
      >
        <Card
          header={() => (
            <div className='flex justify-between items-center'>
              <span>{formatDate(event.date)}</span>
              <Checkbox
                checked={selectedEvents.findIndex(it => it.id === event.id) >= 0}
                className='w-[14px] h-[14px] border overflow-hidden'
              />
            </div>
          )}
          className={clsx('text-left md:w-25rem cursor-pointer p-2 rounded-[10px]', event.isRead && 'opacity-40')}
        >
          <div className='flex justify-between items-start gap-2 text-fz-small'>
            <div className='flex flex-col gap-1'>
              <div className='grid grid-cols-[7rem_12rem] justify-start items-center gap-1'>
                <span className='bg-color-base-20-day'>Важность</span>
                <span>{event.importance}</span>
              </div>
              <div className='grid grid-cols-[7rem_12rem] justify-start items-center gap-1'>
                <span className='bg-color-base-20-day'>Оборудование</span>
                <span>{event.equipment}</span>
              </div>
              <div className='grid grid-cols-[7rem_12rem] justify-start items-center gap-1'>
                <span className='flex h-[32px] items-center bg-color-base-20-day'>Сообщение</span>
                <span>{event.message}</span>
              </div>
            </div>
            <div className='h-full flex flex-col justify-between gap-1'>
              <span className='flex items-center justify-center'><event.performer.avatar /></span>
              <span className='flex items-center justify-center'>{event.performer.name}</span>
            </div>
          </div>
        </Card>
      </button>
    )
  }

  return (
    <div className='card'>
      <DataView
        value={onFilter(events)}
        itemTemplate={CardItem}
        layout='grid'
        paginator
        rows={12} // TODO: добавить зависимость от размера экрана
        paginatorPosition='bottom'
        paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
        emptyMessage='События не найдены.'
        currentPageReportTemplate='Показаны с {first} по {last} из {totalRecords} карточек'
        paginatorClassName='border-t flex justify-center items-center text-center'
      />
    </div>
  )
}
