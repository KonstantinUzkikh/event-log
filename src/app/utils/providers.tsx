import { FilterMatchMode, PrimeReactProvider } from 'primereact/api';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {

  const value = {
    filterMatchMode: {
      text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
      numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
      date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    },
    // inputStyle: 'filled',
  }

  return (
    <React.StrictMode>
      <PrimeReactProvider>
        {children}
      </PrimeReactProvider>
    </React.StrictMode>
  )
}

export default Providers
