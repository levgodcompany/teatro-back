import {Response} from "express";
import { AuthenticationError, AuthorizationError, ConflictError, CreationError, ErrorClass, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "./errors";
import { respoensHandler } from "../responseHandler";
import { HttpStatus } from "../HttpStatus";
import { Message } from "../../DTO/message";


// Esto se modificara por el patron de diseño Chain of Responsibility
export class ValidErrors {

   private errorTypesToStatusMap: Map<typeof ErrorClass, HttpStatus> = new Map([
      [ValidationError, HttpStatus.UnprocessableEntity],
      [NotFoundError, HttpStatus.NotFound],
      [ForbiddenError, HttpStatus.Forbidden],
      [AuthenticationError, HttpStatus.Unauthorized],
      [AuthorizationError, HttpStatus.Forbidden],
      [UnauthorizedError, HttpStatus.Unauthorized],
      [ConflictError, HttpStatus.Conflict],
      [CreationError, HttpStatus.InternalServerError]
  ]);


   constructor(private error: unknown, private res:Response){}

   handle(): void {
      const status = this.determineStatus();
      const errorMessage:Message = {
         message: this.error instanceof Error ? `${this.error.message}` : 'Unknown error occurred'
      }
      respoensHandler<Message>(this.res, status, errorMessage);
   }




   private determineStatus(): number {

      for (const [errorType, status] of this.errorTypesToStatusMap) {
          if (this.error instanceof errorType) {
              return status;
          }
      }

      return HttpStatus.InternalServerError;
  }

  addError(error: typeof ErrorClass, status: HttpStatus){
   this.errorTypesToStatusMap.set(error, status);
  }


   setError(error:unknown){
      this.error = error;
   }
   


}