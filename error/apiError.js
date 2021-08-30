
class ApiError extends Error{

    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static unprocessableEntity(message){
        return new ApiError(422, message)
    }

}

module.exports = ApiError