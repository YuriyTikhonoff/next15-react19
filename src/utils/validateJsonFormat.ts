const validateJsonFormat = (contentType: string): boolean =>
  /^application\/(?:[\w-]+\+)?json/i.test(contentType)

export default validateJsonFormat
