
class ApiError extends Error{

    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static unprocessableEntity(message= 'Unprocessable entity'){
        return new ApiError(422, message)
    }

    static badRequest(message = 'Bad request'){
        return new ApiError(400, message)
    }

}

module.exports = ApiError