/* eslint-disable @typescript-eslint/no-unused-vars */
import { StringSchema, StringSchemaConstructor, NumberSchema, NumberSchemaConstructor } from 'yup';
import { MaskLengthOpts, SameAsOpts } from '../utils';
/**
 * Since we have created a custom 'Yup' method, we need to extend
 * Yup's string schema typings so that TypeScript does not return an error.
 */
declare module 'yup' {
  interface StringSchema {
    allowedNonAlphaNumeric(removeNumbers?: boolean): StringSchema;
    alphaNumeric(isStrict?: boolean): StringSchema;
    maskLength(maskType: string, opts?: MaskLengthOpts): StringSchema;
    sameAs(ref: string, opts?: SameAsOpts): StringSchema;
    strongPassword(pattern?: string, message?: string): StringSchema;
  }

  interface NumberSchema {
    length(length: number): NumberSchema;
  }
}

export const string: StringSchemaConstructor;
export const number: NumberSchemaConstructor;
