export enum SignatureEntityType {
  PATIENT = 'Patient',
  PROVIDER = 'Provider',
  CAREGIVER = 'Caregiver',
  OFFICE_CONTACT = 'Officecontact',
  PRESCRIPTION = 'Prescription'
}

export enum SignaturePurpose {
  HIPAA = 'HIPAA',
  FCRA = 'FCRA',
  PRESCRIPTION_WRITTEN = 'PrescriptionWritten',
  PRESCRIPTION_ALLOWED = 'PrescriptionAllowed'
}

export enum SignatureOptions {
  TEXT = 'Text',
  IMAGE = 'Image'
}

export const IMAGE_TYPE = 'image/png';

export const getSignatureType = (signature: string): SignatureOptions => {
  return signature?.includes(IMAGE_TYPE) ? SignatureOptions.IMAGE : SignatureOptions.TEXT;
};
