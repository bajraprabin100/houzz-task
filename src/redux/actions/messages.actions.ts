import { Dispatch } from 'redux';
import { API_URL, Error } from '../../api';
import { AnyType } from '../../interfaces';
import { restRequestOptions } from '../../utils';
import { AppRootState } from '../reducers';

const SECURE_MESSAGING_URL = `${API_URL}/api/SecureMessaging`;

export enum MessagesActionEnum {
  GET_UNREAD_MESSAGE_COUNT = '[MESSAGES] Get Unread Message Count',
  GET_UNREAD_MESSAGE_COUNT_ERROR = '[MESSAGES] Get Unread Message Count Error'
}

export const getUnreadMessageCount = (caseRecordId?: string) => async (
  dispatch: Dispatch,
  getState: () => AppRootState
) => {
  try {
    const loadMessages = async () => {
      const state = getState();

      const url = new URL(`${SECURE_MESSAGING_URL}/${caseRecordId ? 'UnreadCaseMessageCount' : 'UnreadMessageCount'}`);
      if (caseRecordId) {
        url.searchParams.append('caseRecordId', caseRecordId);
      }
    };

    // Check the state and continue to loading the messages if the user is authenticated
    const checkStateAndContinue = async () => {
      if (getState().auth.session?.user) {
        await loadMessages();
        return;
      }

      setTimeout(checkStateAndContinue, 500);
    };

    await checkStateAndContinue();
  } catch (e) {
    dispatch(messageError(e.message));
  }
};

const messageError = (payload: AnyType) => ({
  type: MessagesActionEnum.GET_UNREAD_MESSAGE_COUNT_ERROR,
  payload
});
