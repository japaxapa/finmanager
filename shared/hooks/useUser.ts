import { useQuery } from '@tanstack/react-query';
import { getUserProfile, UserProfile } from '../services/userService';

export function useUserProfile() {
  return useQuery<UserProfile | null, Error>({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,
  });
}
