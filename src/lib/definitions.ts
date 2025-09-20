import type { LucideIcon } from 'lucide-react';
import {
    Bot,
    FileText,
    GlassWater,
    Hammer,
    Container,
    Shirt,
    Apple,
    Laptop,
    Building2,
    FlaskConical,
    Archive
} from 'lucide-react';


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
    { name: 'Plastic', icon: Bot },
    { name: 'Paper', icon: FileText },
    { name: 'Glass', icon: GlassWater },
    { name: 'Metal', icon: Hammer },
    { name: 'Wood', icon: Container },
    { name: 'Textiles', icon: Shirt },
    { name: 'Organic Waste', icon: Apple },
    { name: 'Electronics', icon: Laptop },
    { name: 'Construction Debris', icon: Building2 },
    { name: 'Chemicals', icon: FlaskConical },
    { name: 'Other', icon: Archive },
];
