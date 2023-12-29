import { STANDARD_PORTAL_APPLICATION_NAME } from '../api';

export const standardPortalConfig = {
  url: 'http://localhost:3000',
  isStandardPortalUrl: window.location.origin === 'http://localhost:3000',
  applicationName: STANDARD_PORTAL_APPLICATION_NAME
  // authUsername: STANDARD_PORTAL_USERNAME,
  // authPassword: STANDARD_PORTAL_PASSWORD
};

export const IS_HTML = true;
export const REQUIRED = true;
export const NOT_REQUIRED = false;
export const CALLBACK_PATH = '/implicit/callback';
export const FORM_WIZARD_VALUES = {
  pages: {
    registration: {
      names: {
        organization: 'organization',
        prescriber: 'prescriber',
        termsAndConditions: 'terms',
        baa: 'baa'
      }
    }
  }
};
export const ACCESS_URL = 'https://locahost:3000';
export const RESOURCES_URL = `${ACCESS_URL}/resources`;
export const ROUTE_PATHS = {
  loginCallback: CALLBACK_PATH,
  landingPage: '/',
  login: '/login',
  registration: '/registration',
  registrationSubmitted: '/registration/submitted',
  home: '/home'
};
export const MIN_BIRTHDATE = '1900-01-01';
export const FINISHED_EVENT = 'FINISHED';

export const REGENERON_PROVIDER_PORTAL_NAME = 'RegeneronProviderPortal';

// tooltip constants
export const ACTION_NEEDED = 'Action needed';
export const RECENTLY_UPDATED = 'Recently updated';
export const UNREAD_MESSAGE = 'Unread Message';
export const OUTGOING_MESSAGE = 'Outgoing message';
export const INCOMING_MESSAGE = 'Incoming message';
export const REPLY = 'Reply';
export const ATTACHMENT = 'Attachment';
export const SENT_MESSAGE = 'Sent Message';
export const REFRESH = 'Refresh';
export const INCOMPLETE_ACTIVE_JOURNEY_STEP = 'The Journey Step is active and incomplete';
export const ACTIVE_JOURNEY_STEP = 'The Journey step is active and is completed';

// Document source constants
export const OUTBOUND_EMAIL = 'Outbound Email';
