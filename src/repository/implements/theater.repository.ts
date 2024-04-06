import { ITheater } from "../../models/interfaces/theater";
import { TheaterModel } from "../../models/theater.shema";
import { Crud } from "./crud";

export class TheaterRepository extends Crud<ITheater> {

    constructor(){
        super();
        this.schema = TheaterModel;
    }

}