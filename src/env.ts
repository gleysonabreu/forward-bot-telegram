import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export const envSchema = z.object({
    APP_SESSION_STRING_TL: z.string().default(''),
    APP_TL_API_ID: z.number(),
    APP_TL_API_HASH: z.string(),
    APP_TL_ORIGIN_CHAT_ID: z.string(),
    APP_TL_DESTINATION_CHAT_ID: z.number().int(),
});

export const env = envSchema.parse({
    APP_SESSION_STRING_TL: process.env.APP_SESSION_STRING_TL,
    APP_TL_API_ID: parseInt(process.env.APP_TL_API_ID || '', 10),
    APP_TL_API_HASH: process.env.APP_TL_API_HASH,
    APP_TL_ORIGIN_CHAT_ID: process.env.APP_TL_ORIGIN_CHAT_ID || '',
    APP_TL_DESTINATION_CHAT_ID: parseInt(process.env.APP_TL_DESTINATION_CHAT_ID || '', 10),
});