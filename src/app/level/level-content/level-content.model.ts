export interface Level {
    heading: string;
    difficulty: number;     // number between 1-3
    level: LevelCmponent[]
}

export interface LevelCmponent {
    type: string;           // could be 'img' / 'text' / 'input'
    image?: string;
    text?: string;
    input?: string;
    link?: string;
    linkText?: string
}