interface ResponseObject {

    responseCode: number,
    Error: Error | null

}

export enum Type {

    Any = "",
    MultpleChoice = "&type=multiple",
    BinaryChoice = "&type=boolean"
    
}

export enum Difficulty {

    Any = "",
    Easy = "&difficulty=easy",
    Medium = "&difficulty=medium",
    Hard = "&difficulty=hard"
    
}

export enum Category {

    Any = "",
    GeneralKnowledge = "&category=9",
    Books = "&category=10",
    Flim = "&category=11",
    Music = "&category=12",
    MusicalsAndTheatres = "&category=13",
    Television = "&category=14",
    VideoGames = "&category=15",
    BoardGames = "&category=16",
    ScienceAndNature = "&category=17",
    Computers = "&category=18",
    Mathematics = "&category=19",
    Mythology = "&category=20",
    Sports = "&category=21",
    Geography = "&category=22",
    History = "&category=23",
    Politics = "&category=24",
    Art = "&category=25",
    Celebrities = "&category=26",
    Animals = "&category=27",
    Vehicles = "&category=28",
    Comics = "&category=29",
    Gadgets = "&category=30",
    AnimeAndManga = "&category=31",
    CartoonAndAnimation = "&category=32",

}

export const OpenTBResponseObjects : Record<string, ResponseObject> = {
    Success : {
        responseCode: 0,
        Error: null
    },
    NoResults : {
        responseCode : 1,
        Error : new Error("Could not return results")
    },
    InvalidParameter : {
        responseCode : 2,
        Error : new Error("Arguments passed to the end points are not vaild")
    },
    TokenNotFound : {
        responseCode : 3,
        Error : new Error("Session Token does not exist")
    },
    TokenEmpty : {
        responseCode : 4,
        Error : new Error("All the question in this category has been completed, Reset the token")
    },
    RateLimit : {
        responseCode : 5,
        Error : new Error("Timeout error, each Ip can access the api every 5 seconds")
    }
} 