import * as ip from "ip";

export default {
    HOST: 'http://' + ip.address(),
    PORT: 8080,
    MONGO_URI: 'mongodb://127.0.0.1:27017/contactApp',
    JWT_KEY: "JWT_SECRET",
    AGENDA_COLLECTION: "agendajobs"
};

export const factory = {
    MONGO_URI: 'mongodb://127.0.0.1:27017/contactApp',
    AGENDA_COLLECTION: "agendajobs"
};