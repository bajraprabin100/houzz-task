import { memoize } from 'lodash';
import moment from 'moment';
import sanitizeHtml from 'sanitize-html';
import { AnyType } from '../interfaces';

export const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
export const YEAR_FIRST_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_TIME_FORMAT = 'hh:mma';

export function dateFormatter(date?: Date | string | null, format?: string | null): string | null {
  if (!date) return null;

  return moment.utc(date).format(format ?? DEFAULT_DATE_FORMAT);
}

export const getCurrentDate = () => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export function casedateFormatter(date?: Date | string | null, format?: string | null): string | null {
  if (!date) return null;
  return moment
    .utc(date)
    .local()
    .format(format ?? DEFAULT_DATE_FORMAT);
}

export function localDateTableFormat(date?: Date | string | null, format?: string | null): string | null {
  if (!date) return null;
  return moment
    .utc(date)
    .local()
    .format(format ?? DEFAULT_DATE_FORMAT);
}

export function localDateTableFormatAnother(date?: string | null, format?: string | null): string | null {
  if (!date) return null;

  date = date.substring(0, date.lastIndexOf('-')).concat('Z');

  return moment(moment.utc(date))
    .local()
    .format(format ?? DEFAULT_DATE_FORMAT);
}

export function localDateFormat(date?: Date | string | null, format?: string | null): string | null {
  if (!date) return null;
  return moment(date).format(format ?? DEFAULT_DATE_FORMAT);
}

export function defaultDateFormat(date?: Date | string | null): string | null {
  if (!date) return null;
  return dateFormatter(date);
}

export function getDateValue(date?: string | null): string {
  if (!date) return '';
  const newDate = date.substring(0, 10);
  return moment(newDate).format(DEFAULT_DATE_FORMAT);
}

export function defaultDateFormatWithAge(date?: Date | string | null): string | null {
  if (!date) return null;

  const age = moment().utc().diff(date, 'years', false);

  return `${defaultDateFormat(date)} (${age})`;
}

export function yearFirstDateFormat(date?: Date | string | null): string | null {
  return dateFormatter(date, YEAR_FIRST_FORMAT);
}

export function timeFormatter(date?: Date | string | null, format?: string | null): string | null {
  return moment.utc(date).format(format ?? DEFAULT_TIME_FORMAT);
}

export const humanize = (value?: string | null) => {
  return value
    ?.replace(/^[\s_]+|[\s_]+$/g, '')
    ?.replace(/[_\s]+/g, ' ')
    ?.replace(/^[a-z]/, (m: string) => {
      return m.toUpperCase();
    });
};

export const numbersOnly = (value = '') => value.replace(/\D/g, '');

export const cleanHtml = memoize((value: string) =>
  sanitizeHtml(value, {
    allowedTags: false,
    allowedAttributes: false
  })
);

export const safeHtml = memoize((value: string) =>
  sanitizeHtml(value, {
    allowedTags: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'ul',
      'li',
      'ol',
      'p',
      'br',
      'h3',
      'h5',
      'center',
      'u',
      'title',
      'td',
      'br',
      'table',
      'tr',
      'tbody',
      'Table',
      'style',
      'start',
      '&nbsp;',
      '&ldquo;',
      '&rdquo;',
      '&quot;'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'name', 'rel', 'style', 'start', 'width']
    }
  })
);

export const rawHtmlProps = memoize((__html: string) => {
  return {
    dangerouslySetInnerHTML: {
      __html
    }
  };
});

export const rawCleanHtmlProps = memoize((value: string) => {
  return rawHtmlProps(cleanHtml(value));
});

export const htmlProps = memoize((value: string) => {
  return {
    dangerouslySetInnerHTML: {
      __html: value
    }
  };
});

export const rawSafeHtmlProps = memoize((value: string) => {
  return rawHtmlProps(safeHtml(value));
});

export const formatContactNumber = (number?: AnyType) => {
  if (!number) return null;
  const match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return number;
};
