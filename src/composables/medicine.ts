import { storeToRefs } from 'pinia'
import { useMockDataStore } from 'src/stores/mockData'

export function useMedicineFetch() {

  const { medicines: originalRows } = useMockDataStore()

  const fetch = (startRow: number, count: number, filter: string, sortBy: string, descending: boolean) => {

    const data = filter
      ? originalRows.filter(row => row.medicineName.includes(filter))
      : originalRows.slice()

    // handle sortBy
    if (sortBy) {
      const sortFn = sortBy === 'desc'
        ? (descending
          ? (a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
          : (a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        )
        : (descending
          ? (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy]))
          : (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
        )
      data.sort(sortFn)
    }

    return data.slice(startRow, startRow + count)
  }
  function getRowsNumberCount(filter: string) {
    if (!filter) {
      return originalRows.length
    }
    let count = 0
    originalRows.forEach(treat => {
      if (treat.medicineName.includes(filter)) {
        ++count
      }
    })
    return count
  }


  return { fetch, getRowsNumberCount }
}
