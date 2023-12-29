import { FormApi, setIn } from 'final-form';
import moment from 'moment';
import { useMemo } from 'react';
import {
  addMethod,
  date,
  DateSchema,
  number,
  NumberSchema,
  ObjectSchema,
  setLocale,
  string,
  StringSchema,
  TestMessageParams,
  ValidationError
} from 'yup';
import { DocumentModel } from '../api';
import { AnyType, FilePreview, GeneralObject } from '../interfaces';

// -----===[HELPER/DEBUGGING FORM UTILITIES]===-----

/**
 * This method can be used to simulate a request to an external source such as the server.
 * Usually meant for mimicking submitting a form.
 * @param ms number of milliseconds
 */
export const simulateRequest = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Used as placeholder or testing of submit on forms.
 * @param values The object of form values.
 */
export const testOnSubmit = async (values: { [key: string]: unknown }) => {
  await simulateRequest(1000);
  // eslint-disable-next-line no-console
  console.log('TEST ON SUBMIT FORM VALUES', values);
};

export const submittingMessage = (msg: string, submitting: boolean) => (submitting ? 'SUBMITTING' : msg);

/**
 * This method loops through all form fields and sets them to their original state.
 * We do this to remove any error messages we no longer want to display.
 * After setting all fields back to default, we finish by calling reset on the entire form.
 * @param form An instance of the form is required and available through final form render.
 * @param values All values of the form are also required and available through final form render.
 */
export const resetFormAndFields = (form: FormApi<GeneralObject>, values: GeneralObject) => {
  Object.keys(values).forEach((key) => {
    form.change(key, undefined);
    form.resetFieldState(key);
  });
  form.reset();
};

// -----===[YUP FORM UTILITIES]===-----

/**
 * Attempt schema validation for all form values and return errors to final form
 * https://www.npmjs.com/package/yup#mixedvalidatevalue-any-options-object-promiseany-validationerror
 * @param schema ObjectSchema; used when declaring form schema, this is the shape of the form fields.
 */
export const validateFormValues = (schema: ObjectSchema) => async (values: unknown) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (e) {
    const errors = e?.inner?.reduce((formError: ValidationError, innerError: ValidationError) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});
    return errors;
  }
};

/**
 * Custom React Hook for converting Yup validations.
 * @param schema  ObjectSchema; used when declaring form schema, this is the shape of the form fields.
 */
export const useValidationSchema = (schema: ObjectSchema) => {
  const validate = useMemo(() => validateFormValues(schema), [schema]);
  return validate;
};

/**
 * Use this when merging of schema validations is necessary.
 * @param schemas Multiple Object Schemas
 */
export const mergeSchemas = (...schemas: ObjectSchema[]) => {
  const [first, ...rest] = schemas;
  const merged = rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first);
  return merged;
};

/**
 * Use this to create a new schema with the specified fields removed
 */
export const removeSchemaFields = (schema: ObjectSchema<AnyType>, fieldNames: string[] = []): ObjectSchema => {
  const clonedSchema = schema.clone();
  if (!clonedSchema.fields) return clonedSchema;
  Object.keys(clonedSchema.fields as Record<string, AnyType>).forEach((fieldName) => {
    fieldNames.includes(fieldName) && delete clonedSchema.fields[fieldName];
  });
  return clonedSchema;
};

/**
 * We are leveraging Yup's "addMethod" function to create our own method that compares
 * two fields and checks that they are the same. This is intended to check on string fields.
 * @param https://www.npmjs.com/package/yup#yupaddmethodschematype-schema-name-string-method--schema-void
 */

export interface SameAsOpts {
  message?: string;
  isStrict?: boolean;
}

addMethod<StringSchema>(string, 'sameAs', (ref: string, { message, isStrict }: SameAsOpts) => {
  // https://www.npmjs.com/package/yup#mixedtestoptions-object-schema
  return string().test({
    name: 'sameAs',
    message: (options: Partial<TestMessageParams>) =>
      message ?? `${formatPath(options?.path)} must match ${formatPath(ref)}`,
    test: function (value) {
      return isStrict ? value === this.parent[ref] : value?.toLowerCase() === this.parent[ref]?.toLowerCase();
    }
  });
});

/**
 * react-number-format always returns a string of the max length no matter what has been entered.
 * In order to make sure the user has inputted the correct amount of digits we need to pluck out all non integer
 * values and remove them, then we check that the amount of digits equals the number of digits a field
 * requires.
 */

export interface MaskLengthOpts {
  message?: string;
  isRequired?: boolean;
}

addMethod<StringSchema>(string, 'maskLength', (maskType: string, opts?: MaskLengthOpts) => {
  const maskTypeLengths: AnyType = {
    tax: 9,
    phone: 10,
    zip: 5
  };
  return string().test({
    name: 'maskLength',
    message: (options: Partial<TestMessageParams>) =>
      opts?.message ?? `${formatPath(options?.path)} must have ${maskTypeLengths[maskType]} digits`,
    test: (value: unknown) =>
      opts?.isRequired || value ? String(value)?.replace(/[^0-9]/gi, '').length === maskTypeLengths[maskType] : true
  });
});

/**
 * This is the default regex used to check password strength. This will keep us from having to constantly
 * write this over and over. We are also able to override it if need be in the `strongPassword` method below.
 */
const DEFAULT_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/gi;

/**
 * Wrapper to the `matches` method on string to simplify strong password checking.
 */
addMethod<StringSchema>(string, 'strongPassword', (pattern = DEFAULT_PASSWORD_REGEX, message?: string) => {
  return string().matches(
    pattern,
    message ?? 'Must be at least 8 characters, should have one uppercase, one lowercase, and one special character'
  );
});

addMethod<NumberSchema>(number, 'length', (length: number) => {
  return number().test({
    name: 'length',
    message: (options: Partial<TestMessageParams>) =>
      `${formatPath(options?.path)} must be exactly ${length} characters`,
    test: (value: AnyType) => (value ? String(value).length === length : false)
  });
});

const ALPHA_NUMERIC_REGEX = /\w/gi;
const ALPHA_NUMERIC_REGEX_STRICT = /^\w+$/gi;

/**
 * Wrapper to the `matches` method on string to simplify alpha numeric checking.
 */
addMethod<StringSchema>(string, 'alphaNumeric', (isStrict?: boolean) => {
  const REGEX = isStrict ? ALPHA_NUMERIC_REGEX_STRICT : ALPHA_NUMERIC_REGEX;
  const message = isStrict ? 'must not include any special characters' : 'must include a letter or a number';
  return string().matches(REGEX, ({ path }) => `${formatPath(path)} ${message}`);
});

const HYPHEN_APOSTROPHE_REGEX = /^[\w- ']*$/gi;
const HYPHEN_APOSTROPHE_NO_NUMBER_REGEX = /^[\w- '][^0-9]*$/gi;

/**
 * Wrapper to the `matches` method on string to simplify alpha numeric checking.
 */
addMethod<StringSchema>(string, 'allowedNonAlphaNumeric', (removeNumbers?: boolean) => {
  const match = removeNumbers ? HYPHEN_APOSTROPHE_NO_NUMBER_REGEX : HYPHEN_APOSTROPHE_REGEX;
  return string().matches(
    match,
    ({ path }) =>
      `${formatPath(path)} can only contain letters${removeNumbers ? '' : ', numbers'}, hyphens, or apostrophes`
  );
});

/**
 * Wrapper test method that check is the value is a valid date using moment
 */
addMethod<DateSchema>(date, 'isValidDate', (message?: string) => {
  const format = 'YYYY-MM-DD';
  const strictDateCheck = true;

  return date().test({
    name: 'isValidDate',
    message: ({ path }: Partial<TestMessageParams>) => message ?? `${formatPath(path)} is not a valid date.`,
    test: (value: AnyType) => moment(value, format, strictDateCheck).isValid()
  });
});

/**
 * Set default error messages. This was mostly created to format `key_value` to `key value` for better error messaging.
 * We can eventually extend this later on for internationalizing our error messages.
 * https://github.com/jquense/yup#using-a-custom-locale-dictionary
 */
setLocale({
  mixed: {
    required: (ref) => {
      return `${formatPath(ref.path)} is a required field`;
    }
  },
  string: {
    min: (ref) => {
      return `${formatPath(ref.path)} must be at least ${ref.min} characters`;
    },
    max: (ref) => {
      return `${formatPath(ref.path)} must be at most ${ref.max} characters`;
    },
    email: (ref) => {
      return `${formatPath(ref.path)} must be a valid email`;
    }
  },
  number: {
    min: (ref) => {
      return `${formatPath(ref.path)} must be less than or equal to ${ref.min}`;
    },
    max: (ref) => {
      return `${formatPath(ref.path)} must be greater than or equal to ${ref.max}`;
    },
    lessThan: (ref) => {
      return `${formatPath(ref.path)} must be less than ${ref.less}`;
    },
    moreThan: (ref) => {
      return `${formatPath(ref.path)} must be greater than ${ref.more}`;
    },
    positive: (ref) => {
      return `${formatPath(ref.path)} must be a positive number`;
    },
    negative: (ref) => {
      return `${formatPath(ref.path)} must be a negative number`;
    }
  }
});

export const formatPath = (path?: string) => {
  return path?.replace(/[_]/gi, ' ');
};

export function getFilePayload(file: FilePreview): DocumentModel | undefined {
  if (!file) return;

  return {
    fileData: (file.bytes as string)?.replace(/data:(image\/jpeg|image\/png|application\/pdf);base64,/, ''),
    fileName: file.path
  };
}

export function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString });
}
