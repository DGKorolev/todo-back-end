const ApiError = require('../error/apiError')

module.exports = (error, req, res, next) => {
    if (error instanceof ApiError){
        return res.status(error.status).json({message: error.message})
    }

    console.log('fesfwefewf')

    return res.status(404).json({message: 'Непредвиденная ощибка'})
}