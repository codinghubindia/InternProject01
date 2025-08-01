const mockIntern = [
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
];

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(mockIntern)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch intern data' })
    };
  }
};
