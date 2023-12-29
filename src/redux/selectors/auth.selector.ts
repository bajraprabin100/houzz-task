import { AppRootState } from '..';

export const authUserDetailsSelector = (state: AppRootState) => state?.auth?.session?.userDetails;
export const authOrgDetailsSelector = (state: AppRootState) => state?.auth?.session?.orgDetails;
