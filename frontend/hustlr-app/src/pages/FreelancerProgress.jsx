import React, { useState } from "react";
import { Award, Star, DollarSign, Clock, Trophy, Zap, ChevronUp, Shield, Target } from "lucide-react";

function AchievementTracker() {
  const [achievements, setAchievements] = useState([
    {
      id: "first-gig",
      name: "First Milestone",
      description: "Complete your first project successfully",
      icon: <Award className="h-6 w-6" />,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      level: 1,
      maxLevel: 1,
      category: "skills",
    },
    {
      id: "top-rated",
      name: "Client Favorite",
      description: "Receive 5-star reviews from clients",
      icon: <Star className="h-6 w-6" />,
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      level: 1,
      maxLevel: 3,
      category: "reputation",
    },
    {
      id: "earning-streak",
      name: "Revenue Champion",
      description: "Earn $1000 on the platform",
      icon: <DollarSign className="h-6 w-6" />,
      unlocked: false,
      progress: 750,
      maxProgress: 1000,
      level: 0,
      maxLevel: 3,
      category: "earnings",
    },
    {
      id: "time-master",
      name: "Deadline Master",
      description: "Complete 5 projects ahead of schedule",
      icon: <Clock className="h-6 w-6" />,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      level: 0,
      maxLevel: 2,
      category: "skills",
    },
    {
      id: "expert-freelancer",
      name: "Portfolio Builder",
      description: "Complete 20 projects in your field",
      icon: <Trophy className="h-6 w-6" />,
      unlocked: false,
      progress: 8,
      maxProgress: 20,
      level: 0,
      maxLevel: 3,
      category: "skills",
    },
    {
      id: "trusted-partner",
      name: "Trusted Partner",
      description: "Work with 3 repeat clients",
      icon: <Shield className="h-6 w-6" />,
      unlocked: false,
      progress: 2,
      maxProgress: 3,
      level: 0,
      maxLevel: 2,
      category: "reputation",
    },
  ]);

  const [xp, setXp] = useState(320);
  const [level, setLevel] = useState(2);
  const xpForNextLevel = 500;
  const [activeTab, setActiveTab] = useState("all");

  // Simulate earning XP
  const earnXp = () => {
    setXp((prev) => {
      const newXp = prev + Math.floor(Math.random() * 30) + 10;
      if (newXp >= xpForNextLevel) {
        setLevel((prevLevel) => prevLevel + 1);
        return newXp - xpForNextLevel;
      }
      return newXp;
    });
  };

  // Simulate progress on a random achievement
  const makeProgress = () => {
    setAchievements((prev) => {
      const newAchievements = [...prev];
      const randomIndex = Math.floor(Math.random() * newAchievements.length);
      const achievement = newAchievements[randomIndex];

      if (achievement.progress < achievement.maxProgress) {
        achievement.progress += 1;

        if (achievement.progress >= achievement.maxProgress && achievement.level < achievement.maxLevel) {
          achievement.unlocked = true;
          achievement.level += 1;
          achievement.progress = 0;
        } else if (achievement.progress >= achievement.maxProgress) {
          achievement.unlocked = true;
        }
      }

      return newAchievements;
    });
  };

  const filteredAchievements = activeTab === "all" 
    ? achievements 
    : achievements.filter((a) => a.category === activeTab);

  const getLevelColor = (level, maxLevel) => {
    if (level === 0) return "bg-gray-200 text-gray-700";
    if (level === maxLevel) return "bg-gradient-to-r from-amber-500 to-yellow-300 text-white";
    if (level === 1) return "bg-gradient-to-r from-slate-500 to-slate-400 text-white";
    if (level === 2) return "bg-gradient-to-r from-amber-600 to-amber-500 text-white";
    return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white";
  };

  return (
    <div className="flex flex-col gap-6 p-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <div className="card bg-white shadow-xl w-full md:w-1/3 border border-gray-100">
          <div className="card-body p-6">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#422AD5] to-[#5D4EF5] flex items-center justify-center text-white font-bold text-xl">
                  {level}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Level {level}</h2>
                <p className="text-gray-600 text-sm">Professional Freelancer</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Experience</span>
                <span className="text-[#422AD5]">
                  {xp}/{xpForNextLevel} XP
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-[#422AD5] h-2.5 rounded-full"
                  style={{ width: `${(xp / xpForNextLevel) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {xpForNextLevel - xp} XP needed for level {level + 1}
              </p>
            </div>

            <div className="stats shadow mt-6 bg-gray-50">
              <div className="stat p-2">
                <div className="stat-title text-xs">Completed</div>
                <div className="stat-value text-[#422AD5] text-2xl">12</div>
                <div className="stat-desc text-xs">Projects</div>
              </div>
              <div className="stat p-2">
                <div className="stat-title text-xs">Earned</div>
                <div className="stat-value text-[#422AD5] text-2xl">$2.4k</div>
                <div className="stat-desc text-xs">Total</div>
              </div>
              <div className="stat p-2">
                <div className="stat-title text-xs">Rating</div>
                <div className="stat-value text-[#422AD5] text-2xl">4.9</div>
                <div className="stat-desc text-xs">Average</div>
              </div>
            </div>

            <button className="btn mt-4 bg-[#422AD5] hover:bg-[#3620B0] text-white border-none w-full" onClick={earnXp}>
              Complete Daily Task <Zap className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>

        <div className="card bg-white shadow-xl w-full md:w-2/3 border border-gray-100">
          <div className="card-body p-6">
            <div className="flex justify-between items-center">
              <h2 className="card-title text-xl font-bold">Your Achievement Journey</h2>
              <div className="badge bg-[#422AD5] text-white p-3">
                {achievements.filter((a) => a.unlocked).length}/{achievements.length} Unlocked
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  className={`btn btn-sm ${activeTab === "all" ? "bg-[#422AD5] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`btn btn-sm ${activeTab === "skills" ? "bg-[#422AD5] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setActiveTab("skills")}
                >
                  Skills
                </button>
                <button
                  className={`btn btn-sm ${activeTab === "earnings" ? "bg-[#422AD5] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setActiveTab("earnings")}
                >
                  Earnings
                </button>
                <button
                  className={`btn btn-sm ${activeTab === "reputation" ? "bg-[#422AD5] text-white" : "bg-gray-100 text-gray-700"}`}
                  onClick={() => setActiveTab("reputation")}
                >
                  Reputation
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-start p-4 rounded-lg border ${achievement.unlocked ? "border-[#422AD5]/20 bg-[#422AD5]/5" : "border-gray-200 bg-white"} transition-all hover:shadow-md`}
                  >
                    <div
                      className={`p-3 rounded-lg ${achievement.unlocked ? "bg-[#422AD5] text-white" : "bg-gray-100 text-gray-500"} mr-4`}
                    >
                      {achievement.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">{achievement.name}</h3>
                        {achievement.level > 0 && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getLevelColor(achievement.level, achievement.maxLevel)}`}
                          >
                            Level {achievement.level}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>

                      {achievement.level < achievement.maxLevel && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-[#422AD5] h-1.5 rounded-full"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {achievement.level === achievement.maxLevel && achievement.unlocked && (
                        <div className="mt-3">
                          <span className="text-xs font-medium text-green-600 flex items-center">
                            <ChevronUp className="h-3 w-3 mr-1" /> Maximum Level Achieved
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="btn bg-gray-100 hover:bg-gray-200 text-gray-800 border-none" onClick={makeProgress}>
                <Target className="h-4 w-4 mr-2" /> Complete Achievement Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-white shadow-xl border border-gray-100">
        <div className="card-body p-6">
          <h2 className="card-title text-xl font-bold mb-4">Upcoming Achievements</h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-gray-600">Achievement</th>
                  <th className="text-gray-600">Category</th>
                  <th className="text-gray-600">Progress</th>
                  <th className="text-gray-600">Reward</th>
                </tr>
              </thead>
              <tbody>
                {achievements
                  .filter((a) => !a.unlocked || a.level < a.maxLevel)
                  .slice(0, 3)
                  .map((achievement) => (
                    <tr key={achievement.id} className="hover:bg-gray-50">
                      <td className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-[#422AD5]/10 text-[#422AD5]">{achievement.icon}</div>
                        <div>
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-xs text-gray-500">{achievement.description}</div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-sm bg-gray-100 text-gray-700 capitalize">
                          {achievement.category}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-[#422AD5] h-1.5 rounded-full"
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-sm font-medium text-[#422AD5]">+{(achievement.level + 1) * 50} XP</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementTracker;