import { useState } from "react";
import { Upload } from 'lucide-react'

export default function AccountTab() {

    const [accountData, setAccountData] = useState({
        username: '',
        email: '',
        bio: ''
    });

    const handleSave = (section) => {
        alert(`${section} settings saved successfully!`);
    }

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input type="text" value={accountData.username} onChange={(e) => setAccountData({...accountData, username: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Email </label>
                <input type="email" value={accountData.email} onChange={(e) => setAccountData({...accountData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
            </div>
        
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Profile Bio </label>
                <textarea value={accountData.bio} onChange={(e) => setAccountData({...accountData, bio: e.target.value})} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" placeholder="Tell us about yourself..." />
            </div>
        
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">JD</div>
                    <div>
                        <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload New Avatar
                        </button>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                </div>
            </div>
        
            <button onClick={() => handleSave('Account')} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" >
                Save Account Settings
            </button>
        </div>
    )
}