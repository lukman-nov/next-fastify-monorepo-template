import { z } from 'zod';

// Request Get Email
export const getEmailRequestSchema = z.object({ email: z.string().email() });
export type GetEmailReqProps = z.infer<typeof getEmailRequestSchema>;

// Reply Get Email
export const getEmailReplySchema = z.object({ email: z.string().nullable() });
export type GetEmailReplyProp = z.infer<typeof getEmailReplySchema>;

// Request Get Username
export const getUsernameRequestSchema = z.object({ username: z.string() });
export type GetUsernameReqProps = z.infer<typeof getUsernameRequestSchema>;

// Reply Get Username
export const getUsernameReplySchema = z.object({ username: z.string().nullable() });
export type GetUsernameReplyProp = z.infer<typeof getUsernameReplySchema>;
