import { useState } from "react"
import { User, Lock, Bell } from 'lucide-react'
import AccountTab from "./components/AccountTab"
import PasswordTab from "./components/PasswordTab"
import NotificationsTab from "./components/Notifications"

export default function App() {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const handleSave = (section) => {
    alert(`${section} settings saved successfully!`);
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountTab handleSave={handleSave} />;
      case 'password':
        return <PasswordTab handleSave={handleSave} />;
      case 'notifications':
        return <NotificationsTab handleSave={handleSave} />;
      default:
        return <AccountTab />;
    }
  }

  return (
    <div className="p-6 bg-white min-h-screen font-display sm:w-[500px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Settings</h1>
        <p className="text-gray-600">Manage your account preferences and security settings</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full">
        <div className="border-b border-gray-200">
          <nav className="flex justify-center px-3 space-x-2 sm:space-x-8 sm:px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm cursor-pointer transition-colors ${ activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' }`} >
                  <Icon className="w-4 h-4 " />
                  <span className="text-xs sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          <div className="">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}



