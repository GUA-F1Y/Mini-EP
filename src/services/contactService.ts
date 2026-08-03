import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { TablesInsert } from '@/lib/supabase/types';

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

export const contactService = {
  async submitContact(input: ContactInput): Promise<boolean> {
    if (!isSupabaseConfigured) {
      console.log('[Mock Contact Submission]:', input);
      return true;
    }

    try {
      const submission: TablesInsert<'contact_submissions'> = {
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
        type: input.type,
        status: 'Pending',
      };

      const { error } = await supabase.from('contact_submissions').insert(submission);

      if (error) {
        console.error('Error submitting contact form to Supabase:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Contact submission error:', e);
      return false;
    }
  },
};

