import {randomUUID} from 'node:crypto'

export class DatabaseMemomry {
    #videos = new Map()

    list(search) {
    return Array.from(this.#videos.entries()).map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
            id,
            ...data // Operador Spread (...): Sintaxe do JavaScript utilizada para espalhar os elementos de um iterável ou objeto.
        }
    })
    .filter(video => { //filter deve ser retornado a busca 
        if (search) {
            return video.title.includes(search)
        }

        return true // Caso não seja retornado um valor especifico
    })
}

    // entries retorna um array com arrays dentro, onde o primeiro é o Id e o segundo as demais informações
    
    create(video) {
        const videoId = randomUUID()
        // random UUID - Unique Universal ID
        this.#videos.set(videoId,video)
    }

    update(id,video) {
        this.#videos.set(id,video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}