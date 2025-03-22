import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserProfile, EntrepreneurProfile, InvestorProfile, MentorProfile, isEntrepreneur, isInvestor, isMentor } from '@/types';
import { AtSign, Linkedin, MessageSquare } from 'lucide-react';

interface ProfilePopupProps {
  profile: UserProfile;
  onClose: () => void;
}

export function ProfilePopup({ profile, onClose }: ProfilePopupProps) {
  const getTitle = () => {
    if (isEntrepreneur(profile)) {
      return profile.businessName;
    }
    return `${profile.name} (${profile.role === 'investor' ? 'Investor' : 'Mentor'})`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{profile.industry}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h4 className="text-sm font-medium mb-2">About</h4>
            <p className="text-sm">{profile.bio}</p>
          </div>
          
          {isEntrepreneur(profile) && (
            <>
              <div>
                <h4 className="text-sm font-medium mb-2">Business Stage</h4>
                <p className="text-sm">{profile.currentStage}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Funding Requirements</h4>
                <p className="text-sm">{profile.fundingRequirements}</p>
              </div>
            </>
          )}
          
          {isInvestor(profile) && (
            <div>
              <h4 className="text-sm font-medium mb-2">Available Capital</h4>
              <p className="text-sm">{profile.availableCapital}</p>
            </div>
          )}
          
          {isMentor(profile) && (
            <div>
              <h4 className="text-sm font-medium mb-2">Areas of Expertise</h4>
              <p className="text-sm">{profile.areasOfExpertise}</p>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-medium mb-2">Field of Interest</h4>
            <p className="text-sm">{profile.fieldOfInterest}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Connect with {isEntrepreneur(profile) ? 'them' : profile.name}</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.contactInfo.includes('@') && (
                <Button variant="outline" size="sm" className="gap-2" 
                  onClick={() => window.open(`mailto:${profile.contactInfo}`)}>
                  <AtSign className="h-4 w-4" />
                  Email
                </Button>
              )}
              
              {profile.contactInfo.includes('linkedin.com') && (
                <Button variant="outline" size="sm" className="gap-2"
                  onClick={() => window.open(profile.contactInfo)}>
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
              )}
              
              {profile.contactInfo.includes('whatsapp') && (
                <Button variant="outline" size="sm" className="gap-2"
                  onClick={() => window.open(profile.contactInfo)}>
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}