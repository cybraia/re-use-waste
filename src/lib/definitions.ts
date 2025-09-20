import type { LucideIcon } from 'lucide-react';

export type BusinessProfile = {
  id: string;
  name: string;
  industry: string;
  location: string;
  contact: {
    email: string;
    phone: string;
  };
  wasteProduced: string[];
  materialsNeeded: string[];
  avatar: string;
};

export type MaterialListing = {
  id: string;
  companyId: string;
  type: 'offer' | 'request'; // Giving away waste or needing materials
  material: {
    name: string;
    categories: WasteCategory[];
    description: string;
    image: string;
  };
  quantity: {
    value: number;
    unit: 'kg' | 'ton' | 'items' | 'm³';
  };
  location: string;
  postedAt: string;
};

export type Message = {
  id: string;
  senderId: string; // 'user' or businessId
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  listingId: string;
  participantIds: string[];
  participantNames: { [key: string]: string };
  participantAvatars: { [key: string]: string };
  messages: Message[];
  lastMessageAt: string;
  listingName: string;
};

export type WasteCategory = 
  | 'Plastic'
  | 'Paper'
  | 'Glass'
  | 'Metal'
  | 'Wood'
  | 'Textiles'
  | 'Organic Waste'
  | 'Electronics'
  | 'Construction Debris'
  | 'Chemicals'
  | 'Other';

export const wasteCategories: { name: WasteCategory, icon: LucideIcon }[] = [
    { name: 'Plastic', icon: require('lucide-react').Bot },
    { name: 'Paper', icon: require('lucide-react').FileText },
    { name: 'Glass', icon: require('lucide-react').GlassWater },
    { name: 'Metal', icon: require('lucide-react').Hammer },
    { name: 'Wood', icon: require('lucide-react').HardwoodFloor },
    { name: 'Textiles', icon: require('lucide-react').Shirt },
    { name: 'Organic Waste', icon: require('lucide-react').Apple },
    { name: 'Electronics', icon: require('lucide-react').Laptop },
    { name: 'Construction Debris', icon: require('lucide-react').Building2 },
    { name: 'Chemicals', icon: require('lucide-react').FlaskConical },
    { name: 'Other', icon: require('lucide-react').Archive },
];
