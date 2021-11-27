import {Schema, model, models} from 'mongoose'

const user = new Schema({
    username: {
        type: String,
        unique: true,
    },
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    dob: Date,
    logs: {
        last_activity: {
            type: Date,
            default: new Date()
        },
        last_login: {
            type: Date,
            default: new Date()
        },
        last_password_reset: {
            type: Date,
            default: new Date()
        },
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