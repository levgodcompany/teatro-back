import { Document } from "mongoose";

// Interfaz para representar una opinión o comentario de un cliente
export interface IReview extends Document {
  author: string; // Autor del comentario
  rating: number; // Calificación del local (de 1 a 5)
  comment: string; // Comentario del cliente
}
