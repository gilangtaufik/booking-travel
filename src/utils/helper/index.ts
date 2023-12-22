/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
import { UnprocessableEntityException } from '@nestjs/common';
import { ClassTransformOptions, plainToClass, Transform } from 'class-transformer';
import * as CryptoJS from 'crypto-js';
import { snakeCase } from 'lodash';
import  sequelize  from 'sequelize';
import { Literal } from 'sequelize/types/utils';
import { Readable } from 'stream';

export const circularToJSON = (circular: unknown) => JSON.parse(JSON.stringify(circular));

export function generateViewModel<T, V>(cls: { new(...args: any[]): T }, obj: V[], options?: ClassTransformOptions): T[];
export function generateViewModel<T, V>(cls: { new(...args: any[]): T }, obj: V, options?: ClassTransformOptions): T;
export function generateViewModel(...args: any[]) {
  const result = plainToClass(args[0], circularToJSON(args[1]),
    {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      enableImplicitConversion: true,
      ...args[2],
    });
  return result as unknown;
}

export function Default(defaultValue: unknown): PropertyDecorator {
  return Transform((obj: any) => obj?.value ?? defaultValue);
}

export const makeSHA512HashFrom = (string: string): string => CryptoJS.SHA512(string).toString(CryptoJS.enc.Hex);

export const compareSHA512 = (password, salt, hashedPassword) => {
  const passwordData = CryptoJS.SHA512(`${salt}${password}`).toString(CryptoJS.enc.Hex);

  if (passwordData === hashedPassword) {
    return true;
  }
  return false;
};

export const queryPaginationSort = (querySort: string, callback?: (field: string) => string | Literal, acceptedString?: string[]) => {
  const stringOrders = querySort?.split(',').filter(Boolean) || [];

  const orders = stringOrders.map((order) => {
    const orderFlow = order[0] == '-' ? 'desc' : 'asc';
    const orderBy = order[0] == '-' ? order.slice(1) : order;

    if (acceptedString && !acceptedString.includes(orderBy)) { throw new UnprocessableEntityException(`query sort '${order}' not accepted`, 'ERR01'); }

    const fieldCallback = callback(orderBy);

    if (typeof fieldCallback === 'string' && fieldCallback?.includes('.')) {
      const [table, attribute] = fieldCallback.split('.');
      return [sequelize.literal(`${table}.${snakeCase(attribute)}`), orderFlow];
    }

    return [fieldCallback, orderFlow];
  });
  return orders;
};

export const encodeStringToNumber = (string: string): string => {
  let number = '';
  const { length } = string;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) { number += string.charCodeAt(i).toString(16); }
  return number;
};

export const decodeEncodedString = (encodedString: string): string => {
  let string = '';
  const { length } = encodedString;
  for (let i = 0; i < length;) {
    const code = encodedString.slice(i, i += 2);
    string += String.fromCharCode(parseInt(code, 16));
  }
  return string;
};

export const isArrayEqual = (array1: any[], array2: any[]): boolean => array1.join() === array2.join();
export const compareObject = (a: any, b: any): any => {
  if (Object.keys(a).length > 0) {
    return Object.keys(Object.fromEntries(Object.entries(b).filter(([key, val]) => key in a && a[key] !== val)));
  }
  return Object.keys(b);
};


export const getReadableStream = (buffer: Buffer) => {
  const stream = new Readable();

  stream.push(buffer);
  stream.push(null);

  return stream;
};

export function isEmpty(data: any = null): boolean {
  let result = false;
  if (typeof data === 'object') {
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') { result = true; }
    if (!data) result = true;
  } else if (typeof data === 'string') {
    if (!data.trim()) result = true;
  } else if (typeof data === 'undefined') {
    result = true;
  }

  return result;
}

export function generateReference(max : number, min:number){
  return Math.floor(Math.random() * (max - min + 1) + min)
}