function errorHandler(err, req, res, next) { 
  console.log('error2 is', err)
  if (err.name === 'ValidationError' || err.name === 'MongoError') { 
    const customErrors = {}

    for (const key in err.errors) {
      customErrors[key] = `${key} is required`
    }

    return res.status(422).json({ message: 'Unprocessible Entity', errors: customErrors })
  }

  if (err.message === 'NotFound') {
    return res.status(404).json({ message: 'Not found' })
  }

  if (err.message === 'Unauthorized') {
    return res.status(401).json({ message: 'Invalid details' })
  }

  res.status(500).json({ message: 'Internal Server Error' })
  next(err)

}

module.exports = errorHandler
