export type UserRole = 'entrepreneur' | 'investor' | 'mentor';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  industry: string;
  fieldOfInterest: string;
  contactInfo: string;
  bio: string;
  isRegistrationComplete: boolean;
  createdAt: any; // Firestore timestamp
}

export interface EntrepreneurProfile extends UserProfile {
  businessName: string;
  currentStage: string;
  fundingRequirements: string;
}

export interface InvestorProfile extends UserProfile {
  availableCapital: string;
}

export interface MentorProfile extends UserProfile {
  areasOfExpertise: string;
}

// Utility type guard functions
export function isEntrepreneur(profile: UserProfile): profile is EntrepreneurProfile {
  return profile.role === 'entrepreneur';
}

export function isInvestor(profile: UserProfile): profile is InvestorProfile {
  return profile.role === 'investor';
}

export function isMentor(profile: UserProfile): profile is MentorProfile {
  return profile.role === 'mentor';
}