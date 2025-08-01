import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, dashboardAPI, Intern, Reward } from '../services/api';
import { 
  LogOut, 
  Copy, 
  DollarSign, 
  Trophy, 
  Target, 
  Gift,
  CheckCircle,
  Lock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [intern, setIntern] = useState<Intern | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const currentUser = authAPI.getCurrentUser();
        if (!currentUser) {
          navigate('/');
          return;
        }

        const [internData, rewardsData] = await Promise.all([
          dashboardAPI.getInternData(currentUser.id),
          dashboardAPI.getRewards()
        ]);

        setIntern(internData);
        setRewards(rewardsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    authAPI.logout();
    navigate('/');
  };

  const copyReferralCode = async () => {
    if (intern?.referralCode) {
      await navigator.clipboard.writeText(intern.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!intern) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to load dashboard data</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const unlockedRewards = rewards.filter(reward => 
    reward.unlocked || intern.donationsRaised >= reward.requiredAmount
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Intern Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/leaderboard')}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Leaderboard
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, {intern.name}!</h2>
                <p className="text-blue-100 text-lg">
                  You're making a real difference. Keep up the amazing work!
                </p>
              </div>
              {intern.avatar && (
                <img
                  src={intern.avatar}
                  alt={intern.name}
                  className="w-20 h-20 rounded-full border-4 border-white/20"
                />
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Raised</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${intern.donationsRaised.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Current Rank</p>
                <p className="text-2xl font-bold text-gray-900">#{intern.rank}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Rewards Unlocked</p>
                <p className="text-2xl font-bold text-gray-900">{unlockedRewards.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Next Goal</p>
                <p className="text-2xl font-bold text-gray-900">$25K</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Referral Code Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Code</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-bold text-blue-600">
                    {intern.referralCode}
                  </span>
                  <button
                    onClick={copyReferralCode}
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Share this code to track donations from your network and earn referral bonuses.
              </p>
            </div>

            {/* Progress to Next Reward */}
            <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress to Next Reward</h3>
              <div className="space-y-4">
                {rewards.map((reward) => {
                  const progress = calculateProgress(intern.donationsRaised, reward.requiredAmount);
                  const isUnlocked = intern.donationsRaised >= reward.requiredAmount;
                  
                  if (isUnlocked) return null;
                  
                  return (
                    <div key={reward.id} className="first:block hidden">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{reward.title}</span>
                        <span className="text-sm text-gray-600">
                          ${intern.donationsRaised.toLocaleString()} / ${reward.requiredAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{reward.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Rewards & Unlockables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rewards.map((reward) => {
                  const isUnlocked = intern.donationsRaised >= reward.requiredAmount;
                  
                  return (
                    <div
                      key={reward.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isUnlocked
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{reward.icon}</span>
                        {isUnlocked ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <h4 className={`font-semibold mb-1 ${
                        isUnlocked ? 'text-green-900' : 'text-gray-900'
                      }`}>
                        {reward.title}
                      </h4>
                      <p className={`text-sm mb-2 ${
                        isUnlocked ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {reward.description}
                      </p>
                      <p className={`text-xs font-medium ${
                        isUnlocked ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {isUnlocked ? 'Unlocked!' : `Unlock at $${reward.requiredAmount.toLocaleString()}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Make More Impact?</h3>
            <p className="text-green-100 mb-6">
              Keep sharing your story and referral code to unlock more rewards and help more causes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Share Your Story
              </button>
              <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors">
                View Campaign Tips
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;