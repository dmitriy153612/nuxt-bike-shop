function getStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(item => String(item))
  }
  else if (value !== null && value !== undefined) {
    return [String(value)]
  }
  return []
}

export default getStringArray
