import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InvestorProfile, MentorProfile } from '@/types';
import { BadgeCheck } from 'lucide-react';

interface InvestorMentorCardProps {
  profile: InvestorProfile | MentorProfile;
  onViewDetails: (profile: InvestorProfile | MentorProfile) => void;
}

export function InvestorMentorCard({ profile, onViewDetails }: InvestorMentorCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg truncate">{profile.name}</h3>
            {profile.role === 'mentor' && (
              <BadgeCheck className="h-5 w-5 text-teal-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {profile.industry} • {profile.role === 'investor' ? 'Investor' : 'Mentor'}
          </p>
          <p className="text-sm line-clamp-3">{profile.bio}</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button 
          onClick={() => onViewDetails(profile)} 
          variant="outline" 
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}