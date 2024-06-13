import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose"

@Injectable()
export class DatabaseService {
    constructor(private configservice: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const uri = this.configservice.get("DATABASE_URI")
        console.log(uri)
        return {
          uri
        }
    }
}
