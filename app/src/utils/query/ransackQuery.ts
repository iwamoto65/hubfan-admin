export const buildRansackQuery = (args: { [key: string]: any }): string => {
  let query: string = ''

  Object.entries(args).forEach(([key, value], index) => {
    query += ((index == 0 ? '?' : '&') + `q[${key}]=${value}`)
  })

  return query
}
