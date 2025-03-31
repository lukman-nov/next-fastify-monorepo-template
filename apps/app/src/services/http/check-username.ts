import type { GetUsernameReplyProp } from '@zx/shared';
import { API } from '@/lib/api-client';

export const checkAvailableUsername = async (username: string) => {
  return await API.get(`users/check-username?username=${username}`).json<GetUsernameReplyProp>();
};
