const {DB_USER, PASSWORD} = process.env;
// console.log(DB_USER, PASSWORD);
export const mongoUrl = `mongodb+srv://${DB_USER}:${PASSWORD}@favfood.0y9cqwd.mongodb.net/favfood?retryWrites=true&w=majority`;