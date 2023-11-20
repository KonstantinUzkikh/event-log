import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { TEvent, useEvents } from '@/app/stor/eventsStor'
import formatDate from '@/app/utils/formatDate'

export default function EventsTable({ onFilter, windowHeight }:
  { onFilter: (events: TEvent[]) => TEvent[]; windowHeight: number }) {
  const events = useEvents((state) => state.events)
  const toggleReadMessages = useEvents((state) => state.toggleReadMessages)
  const toggleReadAllMessages = useEvents((state) => state.toggleReadAllMessages)

  const [selectedEvents, setSelectedEvents] = useState<TEvent[]>([])
  const [isSelectAll, setIsSelectAll] = useState(false)

  const rowClass = (data: TEvent) => {
    return {
      'opacity-40': data.isRead,
    }
  }

  const dateBodyTemplate = (rowData: TEvent) => {
    return formatDate(rowData.date)
  }

  const importanceBodyTemplate = (rowData: TEvent) => {
    return (
      <div className='flex align-items-center gap-2'>
        <span>{rowData.importance}</span>
      </div>
    )
  }

  const equipmentBodyTemplate = (rowData: TEvent) => {
    return (
      <div className='flex align-items-center gap-2'>
        <span>{rowData.equipment}</span>
      </div>
    )
  }

  const messageBodyTemplate = (rowData: TEvent) => {
    return (
      <div className='flex align-items-center gap-2'>
        <span>{rowData.message}</span>
      </div>
    )
  }

  const performerBodyTemplate = (rowData: TEvent) => {
    return (
      <div className='flex align-items-center gap-2'>
        <span>{rowData.performer.name}</span>
      </div>
    )
  }

  return (
    <div className='card bg-transparent'>
      <DataTable
        value={onFilter(events)}
        paginator
        rows={windowHeight < 600 ? 10 : windowHeight < 730 ? 15 : windowHeight < 850 ? 20 : 25}
        paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
        dataKey='id'
        selectionMode='multiple'
        selection={selectedEvents}
        onSelectionChange={(e) => {
          const eventsTemporary = e.value as TEvent[]
          setSelectedEvents(e.value)
        }}
        selectAll={isSelectAll}
        onSelectAllChange={(e) => {
          setIsSelectAll(e.checked)
          e.checked ? setSelectedEvents(events) : setSelectedEvents([])
        }}
        globalFilterFields={['date', 'equipment', 'message', 'importance', 'performer']}
        emptyMessage='События не найдены.'
        currentPageReportTemplate='Показаны с {first} по {last} из {totalRecords} строк'
        paginatorClassName='border-t flex justify-center items-center text-center'
        resizableColumns
        showGridlines
        stripedRows
        rowClassName={rowClass}
        removableSort
        onKeyDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (e.key === ' ' && selectedEvents.length > 0) {
            isSelectAll ? toggleReadAllMessages() : toggleReadMessages(selectedEvents)
            setSelectedEvents([])
            setIsSelectAll(false)
          }
        }}
      >
        <Column selectionMode='multiple' headerStyle={{ width: '3rem', padding: '10' }} ></Column>
        <Column field='date' header='Дата' sortable dataType='date' style={{ minWidth: '10rem' }} body={dateBodyTemplate} />
        <Column field='importance' header='Важность' sortable style={{ minWidth: '7rem' }} body={importanceBodyTemplate} />
        <Column field='equipment' header='Оборудование' sortable style={{ minWidth: '10rem' }} body={equipmentBodyTemplate} />
        <Column field='message' header='Сообщение' sortable style={{ minWidth: '15rem' }} body={messageBodyTemplate} />
        <Column field='performer' header='Ответственный' sortable style={{ minWidth: '10rem' }} body={performerBodyTemplate} />
      </DataTable>
    </div>
  )
}
