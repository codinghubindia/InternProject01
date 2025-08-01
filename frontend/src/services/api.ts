import axios from 'axios'


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const Internsdata = await axios.get(`${API_BASE_URL}/intern`);
const mockInterns: Intern[] = Internsdata.data;

// Mock API service - Replace with actual backend calls
export interface Intern {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  donationsRaised: number;
  rank: number;
  joinDate: string;
  avatar?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  requiredAmount: number;
  unlocked: boolean;
  icon: string;
}

// Mock data
/* const mockInterns: Intern[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    referralCode: 'sarah2025',
    donationsRaised: 15420,
    rank: 1,
    joinDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    referralCode: 'michael2025',
    donationsRaised: 12850,
    rank: 2,
    joinDate: '2024-01-20',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily@example.com',
    referralCode: 'emily2025',
    donationsRaised: 11200,
    rank: 3,
    joinDate: '2024-02-01',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    referralCode: 'david2025',
    donationsRaised: 9800,
    rank: 4,
    joinDate: '2024-02-10',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '5',
    name: 'Jessica Brown',
    email: 'jessica@example.com',
    referralCode: 'jessica2025',
    donationsRaised: 8500,
    rank: 5,
    joinDate: '2024-02-15',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
]; */

const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Raise your first $100',
    requiredAmount: 100,
    unlocked: true,
    icon: '🎯'
  },
  {
    id: '2',
    title: 'Rising Star',
    description: 'Reach $1,000 in donations',
    requiredAmount: 1000,
    unlocked: true,
    icon: '⭐'
  },
  {
    id: '3',
    title: 'Community Champion',
    description: 'Raise $5,000 for the cause',
    requiredAmount: 5000,
    unlocked: true,
    icon: '🏆'
  },
  {
    id: '4',
    title: 'Impact Leader',
    description: 'Achieve $10,000 milestone',
    requiredAmount: 10000,
    unlocked: true,
    icon: '👑'
  },
  {
    id: '5',
    title: 'Change Maker',
    description: 'Reach the ultimate $25,000 goal',
    requiredAmount: 25000,
    unlocked: false,
    icon: '💎'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  // TODO: Replace with actual authentication API calls
  login: async (email: string, password: string) => {
    await delay(1000);
    // Mock successful login
    // For demo purposes, allow any email/password combination
    // Try to find existing user first, otherwise create a demo user
    let user = mockInterns.find(intern => intern.email === email);
    
    if (!user) {
      // Create a demo user for any email not in mock data
      user = {
        id: Date.now().toString(),
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email,
        referralCode: `${email.split('@')[0]}2025`,
        donationsRaised: Math.floor(Math.random() * 10000) + 1000,
        rank: mockInterns.length + 1,
        joinDate: new Date().toISOString().split('T')[0]
      };
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true, user };
  },

  signup: async (name: string, email: string, password: string) => {
    await delay(1000);
    // Mock successful signup
    const newUser: Intern = {
      id: Date.now().toString(),
      name,
      email,
      referralCode: `${name.toLowerCase().replace(/\s+/g, '')}2025`,
      donationsRaised: 0,
      rank: mockInterns.length + 1,
      joinDate: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  },

  logout: () => {
    localStorage.removeItem('currentUser');
  }
};

export const dashboardAPI = {
  // TODO: Replace with actual backend API calls
  getInternData: async (internId: string): Promise<Intern> => {
    await delay(800);
    const currentUser = authAPI.getCurrentUser();
    return currentUser || mockInterns[0];
  },

  getRewards: async (): Promise<Reward[]> => {
    await delay(600);
    return mockRewards;
  },

  getLeaderboard: async (): Promise<Intern[]> => {
    await delay(700);
    return mockInterns.sort((a, b) => b.donationsRaised - a.donationsRaised);
  }
};