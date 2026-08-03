export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  audioUrl: string;
  coverUrl: string;
  lyrics?: string;
  trackNumber: number;
  playsCount: number;
  likesCount: number;
  releaseDate: string;
  producers?: string[];
  genre?: string;
  isBonusTrack?: boolean;
}

export interface FanMessage {
  id: string;
  name: string;
  location?: string;
  message: string;
  likesCount: number;
  createdAt: string;
  isApproved: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'Live' | 'Studio' | 'BTS' | 'Editorial';
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  caption?: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'Booking' | 'Press' | 'Licensing' | 'General';
  createdAt: string;
  status: 'Pending' | 'Read' | 'Replied' | 'Archived';
}

export interface CreditItem {
  role: string;
  name: string;
  details?: string;
}

export interface AnalyticsSummary {
  totalPlays: number;
  totalLikes: number;
  fanMessagesCount: number;
  contactInquiriesCount: number;
  topTrack: string;
  monthlyListeners: string;
}
