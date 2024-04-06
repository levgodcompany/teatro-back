import { Request } from "express";

export type requestHandler<P,T> = Request<P,{}, T>;

export type RequestHandler<P = {}, B = {}, T = any> = Request<P, any, B, any> & T;