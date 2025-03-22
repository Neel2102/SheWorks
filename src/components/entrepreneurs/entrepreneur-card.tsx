import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EntrepreneurProfile } from '@/types';

interface EntrepreneurCardProps {
  profile: EntrepreneurProfile;
  onViewDetails: (profile: EntrepreneurProfile) => void;
}

export function EntrepreneurCard({ profile, onViewDetails }: EntrepreneurCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg truncate">{profile.businessName}</h3>
          <p className="text-sm text-muted-foreground">
            {profile.industry} • {profile.currentStage}
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