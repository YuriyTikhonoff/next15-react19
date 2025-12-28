const validateJsonFormat = (jsonString: string): boolean =>
  /^application\/(?:[\w-]+\+)?json/i.test(jsonString)

export default validateJsonFormat
