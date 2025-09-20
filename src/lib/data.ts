import type { BusinessProfile, MaterialListing, Conversation } from './definitions';

export const userProfile: BusinessProfile = {
  id: 'user',
  name: 'Eco-Friendly Solutions',
  industry: 'Manufacturing',
  location: 'Greenville, USA',
  contact: {
    email: 'contact@efsolutions.com',
    phone: '123-456-7890',
  },
  wasteProduced: ['Plastic', 'Wood'],
  materialsNeeded: ['Scrap Metal', 'Cardboard'],
  avatar: 'https://picsum.photos/seed/user/100/100',
};

export const businesses: BusinessProfile[] = [
  userProfile,
  {
    id: 'b1',
    name: 'GreenBuild Construction',
    industry: 'Construction',
    location: 'Metropolis, USA',
    contact: { email: 'info@greenbuild.com', phone: '555-0101' },
    wasteProduced: ['Wood', 'Construction Debris'],
    materialsNeeded: ['Metal'],
    avatar: 'https://picsum.photos/seed/b1/100/100',
  },
  {
    id: 'b2',
    name: 'CircuitRevivers',
    industry: 'Electronics Recycling',
    location: 'Tech City, USA',
    contact: { email: 'recycle@circuitrevivers.net', phone: '555-0102' },
    wasteProduced: ['Electronics', 'Plastic'],
    materialsNeeded: ['Metal'],
    avatar: 'https://picsum.photos/seed/b2/100/100',
  },
  {
    id: 'b3',
    name: 'Pulp & Fiber Co.',
    industry: 'Paper Production',
    location: 'Forestville, USA',
    contact: { email: 'contact@pulpfiber.com', phone: '555-0103' },
    wasteProduced: ['Paper', 'Chemicals'],
    materialsNeeded: ['Wood', 'Textiles'],
    avatar: 'https://picsum.photos/seed/b3/100/100',
  },
];

export const listings: MaterialListing[] = [
  {
    id: 'l1',
    companyId: 'b1',
    type: 'offer',
    material: {
      name: 'Untreated Wood Scraps',
      categories: ['Wood', 'Construction Debris'],
      description: 'Various sizes of untreated pine and oak scraps from construction sites. Good for mulching or small projects.',
      image: 'https://picsum.photos/seed/5/600/400',
    },
    quantity: { value: 2, unit: 'ton' },
    location: 'Metropolis, USA',
    postedAt: '2024-05-20T10:00:00Z',
  },
  {
    id: 'l2',
    companyId: 'b2',
    type: 'request',
    material: {
      name: 'Bulk Copper Wire',
      categories: ['Metal', 'Electronics'],
      description: 'Looking for insulated and non-insulated copper wire for our recycling process. All gauges accepted.',
      image: 'https://picsum.photos/seed/3/600/400',
    },
    quantity: { value: 500, unit: 'kg' },
    location: 'Tech City, USA',
    postedAt: '2024-05-22T14:30:00Z',
  },
  {
    id: 'l3',
    companyId: 'b3',
    type: 'offer',
    material: {
      name: 'Mixed Office Paper',
      categories: ['Paper'],
      description: 'Bales of mixed office paper, shredded and unshredded. Contains staples.',
      image: 'https://picsum.photos/seed/2/600/400',
    },
    quantity: { value: 5, unit: 'ton' },
    location: 'Forestville, USA',
    postedAt: '2024-05-21T09:00:00Z',
  },
  {
    id: 'l4',
    companyId: 'user',
    type: 'offer',
    material: {
      name: 'HDPE Plastic Regrind',
      categories: ['Plastic'],
      description: 'High-density polyethylene regrind from industrial containers. Clean and ready for processing.',
      image: 'https://picsum.photos/seed/1/600/400',
    },
    quantity: { value: 1, unit: 'ton' },
    location: 'Greenville, USA',
    postedAt: '2024-05-23T11:00:00Z',
  },
    {
    id: 'l5',
    companyId: 'b2',
    type: 'offer',
    material: {
      name: 'Old Circuit Boards',
      categories: ['Electronics', 'Metal'],
      description: 'Assorted motherboards and circuit boards from various devices. For precious metal recovery.',
      image: 'https://picsum.photos/seed/6/600/400',
    },
    quantity: { value: 250, unit: 'kg' },
    location: 'Tech City, USA',
    postedAt: '2024-05-24T16:00:00Z',
  },
  {
    id: 'l6',
    companyId: 'b1',
    type: 'request',
    material: {
      name: 'Scrap Steel Beams',
      categories: ['Metal', 'Construction Debris'],
      description: 'Seeking scrap steel I-beams and other structural steel for a new art installation project.',
      image: 'https://picsum.photos/seed/3/600/400',
    },
    quantity: { value: 10, unit: 'ton' },
    location: 'Metropolis, USA',
    postedAt: '2024-05-19T08:45:00Z',
  },
];

export const conversations: Conversation[] = [
  {
    id: 'c1',
    listingId: 'l1',
    participantIds: ['user', 'b1'],
    participantNames: {
        'user': 'You',
        'b1': 'GreenBuild Construction',
    },
    participantAvatars: {
        'user': 'https://picsum.photos/seed/user/100/100',
        'b1': 'https://picsum.photos/seed/b1/100/100',
    },
    listingName: 'Untreated Wood Scraps',
    lastMessageAt: '2024-05-20T11:05:00Z',
    messages: [
      { id: 'm1', senderId: 'user', text: 'Hi, I saw your listing for wood scraps. Is it still available?', timestamp: '2024-05-20T11:00:00Z' },
      { id: 'm2', senderId: 'b1', text: 'Yes, it is. We can arrange for pickup anytime this week.', timestamp: '2024-05-20T11:05:00Z' },
    ],
  },
  {
    id: 'c2',
    listingId: 'l3',
    participantIds: ['user', 'b3'],
     participantNames: {
        'user': 'You',
        'b3': 'Pulp & Fiber Co.',
    },
    participantAvatars: {
        'user': 'https://picsum.photos/seed/user/100/100',
        'b3': 'https://picsum.photos/seed/b3/100/100',
    },
    listingName: 'Mixed Office Paper',
    lastMessageAt: '2024-05-21T10:15:00Z',
    messages: [
      { id: 'm3', senderId: 'user', text: 'Interested in the mixed office paper. Could you provide details on the contamination levels?', timestamp: '2024-05-21T10:00:00Z' },
      { id: 'm4', senderId: 'b3', text: 'It\'s standard post-consumer waste. Less than 2% contamination. We can provide a sample bale.', timestamp: '2024-05-21T10:15:00Z' },
    ],
  },
];
