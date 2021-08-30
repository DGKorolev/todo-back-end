
class ApiError extends Error{

    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static unprocessableEntity(){
        return new ApiError(422, '')
    }

}