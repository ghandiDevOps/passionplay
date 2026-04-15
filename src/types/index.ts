import type {
  User,
  CoachProfile,
  Session,
  Booking,
  Review,
} from "@prisma/client";

// ─── Types enrichis (avec relations) ─────────────────────────────────────────

export type SessionWithCoach = Session & {
  coach: CoachProfile & {
    user: User;
  };
};

export type BookingWithSession = Booking & {
  session: SessionWithCoach;
};

export type CoachWithUser = CoachProfile & {
  user: User;
};

// ─── Types API ────────────────────────────────────────────────────────────────

export type ApiError = {
  error: string;
  code?: string;
};

export type ReserveResponse = {
  clientSecret: string;
  bookingId: string;
};

export type ScanResponse =
  | { success: true;  participantName: string; scannedAt: Date }
  | { success: false; error: string; code: string };

// ─── Re-exports Prisma ────────────────────────────────────────────────────────
export type { User, CoachProfile, Session, Booking, Review };
export type { SessionType, SessionDomain, SessionStatus, BookingStatus } from "@prisma/client";
