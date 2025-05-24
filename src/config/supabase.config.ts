import { registerAs } from '@nestjs/config';

export const supabaseConfig = registerAs('supabase', () => ({
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
})); 