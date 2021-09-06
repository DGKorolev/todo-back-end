module.exports = class User{
    constructor(user) {
        this.email = user.email
        this.id = user.id
        this.createdAt = user.createdAt
        this.updatedAt = user.updatedAt
    }
}