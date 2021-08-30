module.exports = (error, req, res, next) => {
    if (error instanceof ApiError){
        res.status(error.status).json({message: error.message})
    }

    return res.status(404).json({message: 'Непредвиденная ощибка'})
}