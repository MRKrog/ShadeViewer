export const fetchOptions = (type, body) => ({
  method: type,
  body: JSON.stringify(body),
  headers:{
    'Content-Type': 'application/json'
  }
})
