import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://sxlibpefuwkgyaqvpixy.supabase.co';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || Buffer.from('c2Jfc2VjcmV0X2xfdmxSRzdLR2poUXkycWZlZUNiTGdfYVJMX3BWb2E=', 'base64').toString('utf-8');

if (!supabaseUrl || !supabaseSecretKey) {
  console.warn('[Supabase SDK] Warning: SUPABASE_URL or SUPABASE_SECRET_KEY is missing. Database synchronization and health check features will be unavailable until added to your .env file.');
}

// Reusable server-side Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseSecretKey
);
