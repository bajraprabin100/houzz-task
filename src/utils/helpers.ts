import { AnyObject } from '@data-driven-forms/react-form-renderer';

export const scrollTo = (x: number, y: number) => window.scrollTo({ top: x, left: y, behavior: 'smooth' });

export const scrollToTop = () => scrollTo(0, 0);

// https://stackoverflow.com/a/12900504
export const getFileExtension = (fileName: string) => fileName?.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
export const isEmptyObject = (obj: AnyObject) => Object.keys(obj).length === 0;

export const formatPhoneNumber = (value: any) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const emailValidationHelper = (value: any) => {
  /* eslint-disable no-useless-escape */
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
  return !regex.test(value);
};
