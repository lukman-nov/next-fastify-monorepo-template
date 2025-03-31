import type { GetEmailReplyProp } from '@zx/shared';
import { API } from '@/lib/api-client';

export const checkAvailableEmail = async (email: string) => {
  return await API.get(`users/check-email?email=${email}`).json<GetEmailReplyProp>();
};
