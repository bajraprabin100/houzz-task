import React, { PropsWithChildren, useContext, useEffect } from 'react';

import { AnyObject } from 'final-form';
import { AsyncTypeahead, AsyncTypeaheadProps, Typeahead, TypeaheadProps } from 'react-bootstrap-typeahead';
import { Field, FieldProps, FieldRenderProps, useForm } from 'react-final-form';
import { Form } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { some } from 'lodash';
import NumberFormat from 'react-number-format';
import { AnyType } from '../interfaces';
import { defaultDateFormatWithAge } from '../utils';

export const FormInputField = (props: FieldRenderProps<string[]>) => (
  <>
    {props.label && <Form.Label className='text-uppercase'>{props.label}</Form.Label>}
    <Form.Control {...props.input} {...props} isValid={isValid(props)} isInvalid={isInvalid(props)} />
    {displayError(props)}
  </>
);

export const FormDateField = (props: FieldRenderProps<string[]>) => {
  const { withAge, ...cleanProps } = props;
  const type = props.readOnly ? 'text' : 'date';
  const value =
    (withAge && type === 'text' ? defaultDateFormatWithAge(String(props.input.value)) : props.input.value) ?? '';

  const handleBlur = (event: AnyType) => {
    if (event.target.value === undefined || event.target.value === '') event.target.value = null;
    props.input.onBlur();
  };

  return (
    <>
      {props.label && <Form.Label className='text-uppercase'>{props.label}</Form.Label>}
      <Form.Control
        {...props.input}
        {...cleanProps}
        isValid={isValid(props)}
        isInvalid={isInvalid(props)}
        type={type}
        value={value}
        onBlur={handleBlur}
      />
      {displayError(props)}
    </>
  );
};

export const FormTextAreaField = (props: FieldRenderProps<string[]>) => (
  <>
    {props.label && <Form.Label className='text-uppercase'>{props.label}</Form.Label>}
    <Form.Control {...props.input} {...props} as='textarea' isValid={isValid(props)} isInvalid={isInvalid(props)} />
    {displayError(props)}
  </>
);

// eslint-disable-next-line react/display-name
export const FormFormatField = (format: string) => (props: FieldRenderProps<string[]>) => (
  <>
    <Form.Label className='text-uppercase'>{props.label}</Form.Label>
    <NumberFormat
      customInput={Form.Control}
      format={format}
      isValid={isValid(props)}
      isInvalid={isInvalid(props)}
      {...(props.input as unknown)}
      {...props}
    />
    {displayError(props)}
  </>
);

export const FormSelectField = (props: FieldRenderProps<string[]>) => (
  <>
    {props.label && <Form.Label className='text-uppercase'>{props.label}</Form.Label>}
    <Form.Control as='select' {...props.input} {...props} isValid={isValid(props)} isInvalid={isInvalid(props)}>
      <option value=''>--Select One--</option>
      {props.options?.map((option: { value: string; label?: string }, i: number) => (
        <option key={i} value={option.value}>{`${option?.label}`}</option>
      ))}
    </Form.Control>
    {displayError(props)}
  </>
);

// eslint-disable-next-line react/display-name
export const FormCheckField = (checkType: 'radio' | 'checkbox' | undefined) => (props: FieldRenderProps<string[]>) => (
  <>
    <Form.Check {...props} type={checkType} isInvalid={isInvalid(props)}>
      <Form.Check.Input {...props.input} {...props} type={checkType} />
      <Form.Check.Label>
        {props.label && <div>{props.label}</div>}
        {props.description && <div>{props.description}</div>}
      </Form.Check.Label>
    </Form.Check>
    {displayError(props, false)}
  </>
);

export const FormSwitchField = (props: FieldRenderProps<string[]>) => (
  <>
    <Form.Check {...props.input} {...props} type='switch' isInvalid={isInvalid(props)} />
    {displayError(props)}
  </>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderTypeaheadActions = ({ onClear, selected }: any) => {
  const clearInput = () => {
    onClear();
  };

  return (
    <div className='rbt-aux'>
      {!!selected.length && (
        <button type='reset' className='bg-transparent border-0 p-0' onClick={clearInput}>
          <X tabIndex={0} className='pointer fs-6 my-auto' />
        </button>
      )}
    </div>
  );
};

export const FormTypeaheadField = (props: FieldRenderProps<string[]>) => {
  return (
    <>
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <Typeahead
        {...(props.input as unknown)}
        {...((props as unknown) as TypeaheadProps<string[]>)}
        // Falsy values can cause issues in some cases, such as formWizard navigation:
        defaultSelected={props.defaultSelected || []}
        ref={props.forwardedRef}>
        {renderTypeaheadActions}
      </Typeahead>
      {displayError(props)}
    </>
  );
};

export const FormAsyncTypeaheadField = (props: FieldRenderProps<string[]>) => {
  return (
    <>
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <AsyncTypeahead {...(props.input as unknown)} {...((props as unknown) as AsyncTypeaheadProps<string[]>)}>
        {renderTypeaheadActions}
      </AsyncTypeahead>
      {displayError(props)}
    </>
  );
};

export const CustomSwitch = (props: FieldRenderProps<string[]>) => {
  const form = useForm();
  const { input: inputProps } = props;
  useEffect(() => {
    form.change(inputProps.name, props.defaultChecked);
  }, []);
  return (
    <label className='switch switch-left-right'>
      <input {...inputProps} className='switch-input' defaultChecked={props.defaultChecked} type='checkbox' />
      <span className='switch-label' data-on='Yes' data-off='No'></span>
      <span className='switch-handle'></span>
    </label>
  );
};

// eslint-disable-next-line react/display-name

const fieldTypes: { [key: string]: (props: FieldRenderProps<string[]>) => JSX.Element } = {
  checkbox: FormCheckField('checkbox'),
  date: FormDateField,
  email: FormInputField,
  number: FormInputField,
  password: FormInputField,
  radio: FormCheckField('radio'),
  select: FormSelectField,
  switch: FormSwitchField,
  switchCustom: CustomSwitch,
  tax: FormFormatField('##-#######'),
  tel: FormFormatField('(###) ###-####'),
  text: FormInputField,
  textarea: FormTextAreaField,
  typeahead: FormTypeaheadField,
  asyncTypeahead: FormAsyncTypeaheadField,
  zip: FormFormatField('#####')
};

// eslint-disable-next-line react/display-name
const inputType = (type: string, options?: AnyObject) => (props: FieldProps<AnyType, FieldRenderProps<AnyType>>) => (
  <FilteredFormSection fieldNames={[props.name]}>
    <Field
      {...props}
      {...options}
      component={fieldTypes[type]}
      name={props.name}
      type={type}
      parse={parseValues(type)}
    />
  </FilteredFormSection>
);

export const CheckboxField = inputType('checkbox');
export const DateField = inputType('date');
export const EmailField = inputType('email');
export const NumberField = inputType('number');
export const PasswordField = inputType('password');
export const PhoneField = inputType('tel');
export const RadioField = inputType('radio');
export const SelectField = inputType('select');
export const SwitchField = inputType('switch');
export const SwitchFieldCustom = inputType('switchCustom');
export const TaxIdField = inputType('tax');
export const TextAreaField = inputType('textarea');
export const TextField = inputType('text');
export const TypeaheadField = inputType('typeahead');
export const AsyncTypeaheadField = inputType('asyncTypeahead');
export const ZipField = inputType('zip');

export const displayError = (props: FieldRenderProps<string[]>, requireTouch = true) => {
  if (!(props.meta.error && ((requireTouch && props.meta.touched) || !requireTouch))) return null;

  return (
    <Form.Control.Feedback type='invalid' tooltip={false}>
      {props.meta.error}
    </Form.Control.Feedback>
  );
};

export const displayErrorText = (props: FieldRenderProps<string[]>, requireTouch = true) => {
  if (!(props.meta.error && ((requireTouch && (props.meta.touched || props.meta.dirty)) || !requireTouch))) return null;
  return <p className='fs-2 text-danger'>{props.meta.error}</p>;
};

const isValid = (props: FieldRenderProps<string[], HTMLElement>): boolean | undefined => {
  return !props.meta.error && props.meta.active;
};

const isInvalid = (props: FieldRenderProps<string[], HTMLElement>): boolean | undefined => {
  return props.meta.error && props.meta.touched;
};

export interface FilteredFormContextApi {
  isVisible: (formFieldName: string | undefined) => boolean;
}
export const FilteredFormContext = React.createContext<FilteredFormContextApi>({ isVisible: () => true });
export function FilteredFormSection({
  children,
  fieldNames = []
}: { fieldNames: string[] } & PropsWithChildren<AnyType>) {
  const { isVisible } = useContext(FilteredFormContext);
  return (some(fieldNames, isVisible) && children) || null;
}

/**
 * Use this to parse the final values of the field. This will parse the final value of all fields.
 * @param type used to identify the type of input when need to differentiate.
 */
const parseValues = (type: string) => (value: string) => {
  if (type === 'tel') {
    return value?.replace(/\D+/g, '');
  }
  return value;
};
