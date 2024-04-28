import { ITheater } from "../../models/interfaces/theater";
import models from "../../models/Local.model";
import { Crud } from "./crud";

export class TheaterRepository extends Crud<ITheater> {

    constructor(){
        super();
        this.schema = models.TheaterModel;
    }

}