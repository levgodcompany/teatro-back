import { HttpStatus } from "../HttpStatus";


export class ErrorClass extends Error {
  status!: HttpStatus;
  constructor(message: string) {
    super(message);
  }
}

export class ValidationError extends ErrorClass {

  constructor(message: string) {
    super(message);
    this.name = "ValidationError"; // Error para validaciones
    this.status = HttpStatus.UnprocessableEntity
  }
}

export class ConflictError extends ErrorClass {

  constructor(message: string) {
    super(message);
    this.name = "ConflictError"; // Error para validaciones
    this.status = HttpStatus.Conflict
  }
}


export class CreationError extends ErrorClass {

  constructor(message: string) {
    super(message);
    this.name = "CreationError"; // Error si no se pudo crear
    this.status = HttpStatus.InternalServerError
  }
}


export class UnauthorizedError extends ErrorClass {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError"; // No autorizado
    this.status = HttpStatus.Unauthorized
  }
}


// Error personalizado para errores de autorización
export class AuthorizationError extends ErrorClass {
  constructor(message: string) {
      super(message);
      this.name = 'AuthorizationError';
      this.status = HttpStatus.Forbidden
  }
}

// Error personalizado para errores de autenticación
export class AuthenticationError extends ErrorClass {
  constructor(message: string) {
      super(message);
      this.name = 'AuthenticationError';
      this.status = HttpStatus.Unauthorized
  }
}

// Error personalizado para errores de recurso no encontrado
export class NotFoundError extends ErrorClass {
  constructor(message: string) {
      super(message);
      this.name = 'NotFoundError';
      this.status = HttpStatus.NotFound
  }
}

// Error personalizado para errores de acceso prohibido
export class ForbiddenError extends ErrorClass {
  constructor(message: string) {
      super(message);
      this.name = 'ForbiddenError';
      this.status = HttpStatus.Forbidden
  }
}