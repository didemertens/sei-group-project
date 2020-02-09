function errorHandler(err, req, res, next) { 

  if (err.name === 'ValidationError') {
    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = err.errors[key].message
    }

    err.errors = customErrors

    return res.status(422).json({ message: 'Unprocessible Entity', errors: customErrors })
  }

  if (err.message === 'Not found') {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(500).json({ message: 'Internal Server Error' })
  next(err)

}

module.exports = errorHandler
