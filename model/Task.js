const fs = require('fs')
const path = require('path')

class Task {

    saveTasks(tasks){
        fs.writeFileSync(path.resolve(__dirname, '../data.txt'), JSON.stringify(tasks), 'utf8')
    }

    getTasks(){
        return  JSON.parse(fs.readFileSync(path.resolve(__dirname, path.resolve(__dirname, '../data.txt')), 'utf8'))
    }

}

module.exports = new Task()
