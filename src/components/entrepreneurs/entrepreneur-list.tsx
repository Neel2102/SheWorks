'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit, startAfter, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { EntrepreneurProfile } from '@/types';
import { EntrepreneurCard } from './entrepreneur-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfilePopup } from '@/components/profile/profile-popup';

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

const BUSINESS_STAGES = [
  'All',
  'Ideation',
  'Validation',
  'Early Stage',
  'Growth',
  'Scaling',
  'Mature'
];

export function EntrepreneurList() {
  const [entrepreneurs, setEntrepreneurs] = useState<EntrepreneurProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<EntrepreneurProfile | null>(null);
  
  // Filters
  const [industry, setIndustry] = useState('All');
  const [stage, setStage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEntrepreneurs = async (isInitial = false) => {
    try {
      setLoading(true);
      
      let q = query(
        collection(db, 'users'),
        where('role', '==', 'entrepreneur'),
        where('isRegistrationComplete', '==', true)
      );
      
      if (industry !== 'All') {
        q = query(q, where('industry', '==', industry));
      }
      
      if (stage !== 'All') {
        q = query(q, where('currentStage', '==', stage));
      }
      
      q = query(q, orderBy('createdAt', 'desc'), limit(12));
      
      if (!isInitial && lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      
      const querySnapshot = await getDocs(q);
      const newEntrepreneurs = querySnapshot.docs.map(doc => doc.data() as EntrepreneurProfile);
      
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
      setHasMore(!querySnapshot.empty && querySnapshot.size === 12);
      
      if (isInitial) {
        setEntrepreneurs(newEntrepreneurs);
      } else {
        setEntrepreneurs(prev => [...prev, ...newEntrepreneurs]);
      }
    } catch (error) {
      console.error('Error fetching entrepreneurs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchEntrepreneurs(true);
  }, [industry, stage]);

  // Filter by search term
  const filteredEntrepreneurs = entrepreneurs.filter(
    entrepreneur => 
      entrepreneur.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrepreneur.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrepreneur.fieldOfInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
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
          <Select value={stage} onValueChange={setStage}>
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_STAGES.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            placeholder="Search entrepreneurs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredEntrepreneurs.length === 0 && !loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No entrepreneurs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredEntrepreneurs.map((entrepreneur) => (
            <EntrepreneurCard
              key={entrepreneur.uid}
              profile={entrepreneur}
              onViewDetails={setSelectedProfile}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => fetchEntrepreneurs()}
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