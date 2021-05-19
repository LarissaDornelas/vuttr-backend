import {Document} from 'mongoose'

export interface Tool extends Document {
    readonly title: string,
    readonly link: string,
    readonly description: string,
    readonly tags: string[]
}