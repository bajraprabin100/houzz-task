import moment from 'moment';
import { BooleanSchema, date, DateSchema, MixedSchema, number, NumberSchema, ref, string, StringSchema } from 'yup';

import { AnyType } from '../interfaces';
import { MIN_BIRTHDATE } from '.';

export type AnySchema = StringSchema | MixedSchema | NumberSchema | BooleanSchema | DateSchema;
export interface ValidationOptions {
  required?: boolean;
  min?: number;
  max?: number;
  message?: string;
  strictAlphaNumeric: boolean;
}

// -----===[COMMON VALIDATORS]===-----
export const textOnlyField = (max = 20) =>
  string()
    .matches(/[a-zA-Z]/gi)
    .max(max);

export const noSpecialCharactersField = (max = 20) => string().alphaNumeric().max(max);
export const allowedSpecialCharactersField = (max = 20) => string().allowedNonAlphaNumeric().max(max);

export const addressValidation = (required = true) =>
  isRequiredMap[String(required)](string().max(50).allowedNonAlphaNumeric()).label('Address');
export const cityValidation = () => makeRequired(string().max(30).allowedNonAlphaNumeric()).label('City');
export const conditionalValidation = (
  fieldName: string,
  schema: AnySchema | AnyType,
  is?: boolean | AnyType,
  schemaType: AnySchema | AnyType = string()
) =>
  schemaType.when(fieldName, {
    is: is ?? true,
    then: schema,
    otherwise: validations.notRequiredValidation(schemaType).nullable()
  });
export const confirmMatchesValidation = (fieldName: string, message: string) =>
  string().oneOf([ref(fieldName), undefined], message);
export const dobValidation = (): DateSchema =>
  date()
    // Stops a bare Yup error from showing if date is not fully filled out:
    .typeError('Invalid date')
    // Moment has much better date string parsing than Yup's built-in one, so we use it instead:
    .transform((currentValue: string | Date, originalValue: string | Date) => moment(originalValue).clone().toDate())
    .max(new Date().toLocaleDateString())
    .min(new Date(MIN_BIRTHDATE).toLocaleDateString())
    .label('Date of Birth');

export const emailValidation = (required = true): StringSchema =>
  isRequiredMap[String(required)](string().max(100).email().label('Email')) as StringSchema;
export const nameValidation = (required = true, max = 50) =>
  isRequiredMap[String(required)](string().allowedNonAlphaNumeric().max(max).label('Name'));
export const notRequiredValidation = (type: AnySchema) => makeNotRequired(type);
export const npiValidation = (required = true) =>
  isRequiredMap[String(required)](
    number().test('len', 'NPI must be 10 numbers', (val) => val?.toString().length === 10)
  ).label('NPI');
export const orgNameValidation = () => makeRequired(string().max(100).alphaNumeric().label('Organization Name'));
export const passwordValidation = () => makeRequired(string().min(8).strongPassword().label('Password'));
export const phoneValidation = (message?: string) => string().maskLength('phone').required(message);
export const phoneConditional = (field: string) =>
  string().when(field, {
    is: (key: string) => !key || key.length === 0,
    then: validations.phoneValidation('Either home phone or mobile number is required'),
    otherwise: validations.phoneValidation().notRequired().nullable()
  });
export const requiredValidation = (type: AnySchema) => makeRequired(type);
export const stateValidation = () => requiredValidation(string()).label('State');
export const suffixValidation = () => notRequiredValidation(string()).label('Suffix');
export const taxIdValidation = (required = true) =>
  isRequiredMap[String(required)](string().maskLength('tax', { isRequired: required })).label('Tax ID');
export const usernameValidation = () =>
  makeRequired(
    string()
      .max(20)
      .matches(/^[\w\S]+$/gi, 'Username cannot contain spaces.')
  ).label('Username');
export const allowNumeric = (msg: string, fieldName: string) =>
  makeRequired(string().matches(/^[0-9]*\.?[0-9]+$/gi, msg)).label(fieldName);

export const zipValidation = () => makeRequired(string().length(5).maskLength('zip')).label('Zip Code');
export const idValidation = (options?: Partial<ValidationOptions>) =>
  isRequiredMap[`${options?.required ?? true}`](
    string()
      .alphaNumeric(options?.strictAlphaNumeric ?? false)
      .max(options?.max ?? 20)
      .label('ID')
  );
export const ptanValidation = (required = true) =>
  isRequiredMap[String(required)](
    string()
      .matches(/^(?![a-zA-Z]+$)[a-zA-Z0-9]+$/, 'PTAN needs to be in alphaNumeric  or numeric characters only.')
      .min(6)
      .max(8)
  ).label('PTAN');
export const deaValidation = (required = true) => isRequiredMap[String(required)](string().length(9)).label('DEA');

export const validations = {
  addressValidation,
  allowedSpecialCharactersField,
  cityValidation,
  conditionalValidation,
  dobValidation,
  emailValidation,
  idValidation,
  nameValidation,
  noSpecialCharactersField,
  notRequiredValidation,
  npiValidation,
  orgNameValidation,
  passwordValidation,
  phoneValidation,
  phoneConditional,
  requiredValidation,
  stateValidation,
  suffixValidation,
  taxIdValidation,
  textOnlyField,
  usernameValidation,
  zipValidation,
  allowNumeric,
  ptanValidation,
  deaValidation
};

// -----===[HELPERS]===-----

const makeRequired = (schema: AnySchema): AnySchema => schema.required();

const makeNotRequired = (schema: AnySchema): AnySchema => schema.notRequired();

const isRequiredMap: { [key: string]: (schema: AnySchema, defaultValue?: unknown) => AnySchema } = {
  true: makeRequired,
  false: makeNotRequired
};
