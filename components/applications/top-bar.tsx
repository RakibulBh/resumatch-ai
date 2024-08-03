import React from "react";
import {
  Briefcase,
  Clock,
  Calendar,
  Target,
  TrendingUp,
  Award,
  X,
} from "lucide-react";

const TopBar = () => {
  const cards = [
    { icon: <Briefcase />, title: "Total Applications", value: 87 },
    { icon: <Briefcase />, title: "Application Rate", value: "3.5/week" },
    { icon: <Clock />, title: "Avg. Response Time", value: "12 days" },
    { icon: <Calendar />, title: "Interviews Scheduled", value: 5 },
    { icon: <Target />, title: "Success Rate", value: "8%" },
    { icon: <TrendingUp />, title: "Active Applications", value: 15 },
    { icon: <Award />, title: "Offers Received", value: 2 },
    { icon: <X />, title: "Rejections", value: 23 },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg rounded-lg p-6 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-20 rounded-lg p-4 transition-all duration-300 hover:bg-opacity-30 hover:transform hover:scale-105"
          >
            <div className="flex items-center justify-center mb-2">
              {React.cloneElement(card.icon, {
                size: 24,
                className: "text-white",
              })}
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-indigo-100 uppercase tracking-wide">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
