import {Schema, model, models} from 'mongoose'
import { nanoid } from 'nanoid'

const user = new Schema({
    username: {
        type: String,
        unique: true,
    },
    name: String,
    lastname: String,
    email: String,
    password: String,
    dob: Date,
    salt: {
        type: String,
        default: nanoid(16),
    },
    logs: {
        last_activity: Date,
        last_login: Date,
        last_password_reset: Date,
    },
    state: {
        online: {
            type: Boolean,
            default: false,
        },
        avaliable: {
            type: Boolean,
            default: false,
        },
    },
    contacts: [String],
    requests: [String],
})

const chat = new Schema({
    name: String,
    dob: Date,
    members: [String],
    messages: [{
        author: String,
        body: String
    }]
})

export const User = models['User'] || model('User', user)
export const Chat = models['Chat'] || model('Chat', chat)