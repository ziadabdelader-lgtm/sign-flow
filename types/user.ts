export type UserType = 'deaf' | 'hearing' | 'both';
export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  user_type: UserType;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  profile: Profile;
}
