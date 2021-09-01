const fs = require('fs')

class Task {

    async saveTasks (data){

        try {

            await fs.promises.writeFile('data.txt', JSON.stringify(data), 'utf8')

        } catch(err) {
            console.log(err.message)
        }

    }


    async getTasks (){

        try {

            const data = await fs.promises.readFile('data.txt', 'utf8')

            const jsonData = await JSON.parse(data)

            if (Array.isArray(jsonData)) return jsonData


        } catch(err) {
            console.log(err.message)
        }

        return []

    }

}

module.exports = new Task()
