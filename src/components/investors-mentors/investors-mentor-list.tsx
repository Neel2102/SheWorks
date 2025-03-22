'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit, startAfter, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { InvestorProfile, MentorProfile } from '@/types';
import { InvestorMentorCard } from './investor-mentor-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfilePopup } from '@/components/profile/profile-popup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const INDUSTRIES = [
  'All',
  'Technology',
  'E-commerce',
  'Healthcare',
  'Education',
  'Finance',
  'Food & Beverage',
  'Fashion',
  'Beauty',
  'Travel',
  'Real Estate',
  'Other'
];

export function InvestorMentorList() {
  const [profiles, setProfiles] = useState<(InvestorProfile | MentorProfile)[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<InvestorProfile | MentorProfile | null>(null);
  
  // Filters
  const [activeTab, setActiveTab] = useState<'both' | 'investors' | 'mentors'>('both');
  const [industry, setIndustry] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProfiles = async (isInitial = false) => {
    try {
      setLoading(true);
      
      let q;
      
      if (activeTab === 'both') {
        q = query(
          collection(db, 'users'),
          where('role', 'in', ['investor', 'mentor']),
          where('isRegistrationComplete', '==', true)
        );
      } else if (activeTab === 'investors') {
        q = query(
          collection(db, 'users'),
          where('role', '==', 'investor'),
          where('isRegistrationComplete', '==', true)
        );
      } else {
        q = query(
          collection(db, 'users'),
          where('role', '==', 'mentor'),
          where('isRegistrationComplete', '==', true)
        );
      }
      
      if (industry !== 'All') {
        q = query(q, where('industry', '==', industry));
      }
      
      q = query(q, orderBy('createdAt', 'desc'), limit(12));
      
      if (!isInitial && lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      
      const querySnapshot = await getDocs(q);
      const newProfiles = querySnapshot.docs.map(doc => doc.data() as (InvestorProfile | MentorProfile));
      
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(!querySnapshot.empty && querySnapshot.size === 12);
      
      if (isInitial) {
        setProfiles(newProfiles);
      } else {
        setProfiles(prev => [...prev, ...newProfiles]);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProfiles(true);
  }, [activeTab, industry]);

  // Filter by search term
  const filteredProfiles = profiles.filter(
    profile => 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.fieldOfInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'both' | 'investors' | 'mentors')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="both">All</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map(ind => (
                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredProfiles.length === 0 && !loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No results found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProfiles.map((profile) => (
            <InvestorMentorCard
              key={profile.uid}
              profile={profile}
              onViewDetails={setSelectedProfile}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => fetchProfiles()}
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}

      {selectedProfile && (
        <ProfilePopup
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}
