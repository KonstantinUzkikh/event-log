const formatDate = (value: string | Date) => {
  return new Date(value).toLocaleDateString('ru-Ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export default formatDate
