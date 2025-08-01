import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, Intern } from '../services/api';
import { ArrowLeft, Trophy, Medal, Award, TrendingUp, Calendar } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        // TODO: Replace with actual API call to backend
        const data = await dashboardAPI.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-r from-blue-500 to-purple-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-4xl font-bold mb-4">Top Performers</h2>
            <p className="text-xl text-blue-100">
              Celebrating our most impactful interns this month
            </p>
            <div className="flex justify-center items-center mt-6 space-x-8">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  ${leaderboard.reduce((sum, intern) => sum + intern.donationsRaised, 0).toLocaleString()}
                </div>
                <div className="text-blue-200 text-sm">Total Raised</div>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">30</div>
                <div className="text-blue-200 text-sm">Days Left</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <div className="flex justify-center items-end space-x-4 mb-8">
            {/* Second Place */}
            {topThree[1] && (
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mb-4">
                  {topThree[1].avatar ? (
                    <img
                      src={topThree[1].avatar}
                      alt={topThree[1].name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-gray-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-600">
                        {topThree[1].name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">{topThree[1].name}</h3>
                  <p className="text-2xl font-bold text-gray-600">
                    ${topThree[1].donationsRaised.toLocaleString()}
                  </p>
                </div>
                <div className="h-20 bg-gradient-to-t from-gray-300 to-gray-500 rounded-t-lg flex items-center justify-center">
                  <Medal className="h-8 w-8 text-white" />
                </div>
                <div className="bg-gray-600 text-white py-2 rounded-b-lg">
                  <span className="font-bold">2nd Place</span>
                </div>
              </div>
            )}

            {/* First Place */}
            {topThree[0] && (
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mb-4">
                  {topThree[0].avatar ? (
                    <img
                      src={topThree[0].avatar}
                      alt={topThree[0].name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-yellow-400"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-yellow-400 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {topThree[0].name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">{topThree[0].name}</h3>
                  <p className="text-3xl font-bold text-yellow-600">
                    ${topThree[0].donationsRaised.toLocaleString()}
                  </p>
                </div>
                <div className="h-32 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-t-lg flex items-center justify-center">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <div className="bg-yellow-600 text-white py-2 rounded-b-lg">
                  <span className="font-bold">1st Place</span>
                </div>
              </div>
            )}

            {/* Third Place */}
            {topThree[2] && (
              <div className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mb-4">
                  {topThree[2].avatar ? (
                    <img
                      src={topThree[2].avatar}
                      alt={topThree[2].name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-amber-500"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-amber-500 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {topThree[2].name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2">{topThree[2].name}</h3>
                  <p className="text-2xl font-bold text-amber-600">
                    ${topThree[2].donationsRaised.toLocaleString()}
                  </p>
                </div>
                <div className="h-16 bg-gradient-to-t from-amber-400 to-amber-600 rounded-t-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="bg-amber-700 text-white py-2 rounded-b-lg">
                  <span className="font-bold">3rd Place</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Remaining Rankings */}
        {remaining.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Complete Rankings</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {remaining.map((intern, index) => (
                <div key={intern.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full ${getRankBadgeColor(intern.rank)} flex items-center justify-center`}>
                          <span className="text-white font-bold">#{intern.rank}</span>
                        </div>
                      </div>
                      {intern.avatar ? (
                        <img
                          src={intern.avatar}
                          alt={intern.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-600">
                            {intern.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{intern.name}</h4>
                        <p className="text-sm text-gray-600">
                          Joined {new Date(intern.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${intern.donationsRaised.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total Raised</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Want to climb the leaderboard?</h3>
          <p className="text-purple-100 mb-6">
            Share your referral code, engage with your network, and watch your impact grow!
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View My Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;