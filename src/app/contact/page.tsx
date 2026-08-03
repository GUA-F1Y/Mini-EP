'use client';

import React, { useState } from 'react';
import { Mail, Send, Check, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';
import { contactService } from '@/services/contactService';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'Booking',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await contactService.submitContact(form);

    setLoading(false);
    if (success) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', type: 'Booking', message: '' });
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left border-b border-surface pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            MANAGEMENT & BOOKINGS
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            GET IN TOUCH
          </h1>
          <p className="text-muted text-sm max-w-lg">
            For concert bookings, sync licensing, press inquiries, or official collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8 bg-secondary/50 p-8 rounded-3xl border border-surface">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-foreground">
                MANAGEMENT DIRECTORY
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Official business inquiries are reviewed directly by GUAF1Y management team. Response times are typically within 24-48 business hours.
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-background border border-surface">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted">BOOKING & MANAGEMENT</span>
                  <p className="text-foreground font-semibold">booking@guaf1ymusic.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-background border border-surface">
                <Globe className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted">PRESS & MEDIA KIT</span>
                  <p className="text-foreground font-semibold">press@guaf1ymusic.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-background border border-surface">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted">RECORD LABEL</span>
                  <p className="text-foreground font-semibold">Nocturne Music Group (NMG)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface text-[11px] text-muted flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>CLOUDFLARE TURNSTILE & CAPTCHA PROTECTED</span>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 bg-secondary/30 p-8 sm:p-10 rounded-3xl border border-surface">
            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-accent/10 border border-accent/40 rounded-2xl animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-accent text-background flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  INQUIRY TRANSMITTED TO SUPABASE
                </h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Thank you for reaching out. Management has received your inquiry and will follow up shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-accent text-background text-xs font-mono font-bold"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-muted uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-background border border-surface rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-muted uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="sarah@agency.com"
                      className="w-full bg-background border border-surface rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-type" className="block text-xs font-mono text-muted uppercase mb-1">
                      Inquiry Type
                    </label>
                    <select
                      id="contact-type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full bg-background border border-surface rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent"
                    >
                      <option value="Booking">Concert / Event Booking</option>
                      <option value="Press">Press & Interview</option>
                      <option value="Licensing">Sync & Film Licensing</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-muted uppercase mb-1">
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      autoComplete="off"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Festival Performance 2026"
                      className="w-full bg-background border border-surface rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-muted uppercase mb-1">
                    Message Details *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details about dates, venue, budget, or licensing scope..."
                    className="w-full bg-background border border-surface rounded-xl p-4 text-xs text-foreground focus:outline-none focus:border-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-accent text-background font-bold font-mono text-xs hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'TRANSMITTING TO SUPABASE...' : 'SUBMIT OFFICIAL INQUIRY'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </PageTransition>
  );
}
