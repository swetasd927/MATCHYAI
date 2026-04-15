import { DataSource } from "typeorm"
import "dotenv/config" 

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "sweta",
    entities: [

    ]

})

