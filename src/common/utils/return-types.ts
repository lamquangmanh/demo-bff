import { Int } from '@nestjs/graphql';

export const returnInt = () => Int;
export const returnString = () => String;
export const returnBoolean = () => Boolean;
export const returnDate = () => Date;
export const returnInts = () => [Int];
export const returnStrings = () => [String];
export const returnBooleans = () => [Boolean];
