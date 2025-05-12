import { Builder, Font, JSX } from "canvacord";
import { writeFile } from 'node:fs/promises'

interface Game {
    name : string
}

class Image extends Builder<Game> {

    public constructor() {
        super(300, 300)

        Font.loadDefault()
    }

    public setName (name : string) : void{
        
        this.options.set("name", name)       
    }

    public async render() {
        return (
            // <h1>ASd</h1>
            null           
        )
    }
}