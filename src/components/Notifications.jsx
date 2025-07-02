import { useState } from "react";

export default function NotificationsTab({ handleSave }) {

    const [notificationData, setNotificationData] = useState({
        emailNotifications: true,
        pushNotifications: false,
        frequency: 'daily'
    })

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                        <p className="text-xs text-gray-500">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                        type="checkbox"
                        checked={notificationData.emailNotifications}
                        onChange={(e) => setNotificationData({...notificationData, emailNotifications: e.target.checked})}
                        className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                
                <div className="flex items-center justify-between">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                        <p className="text-xs text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                        type="checkbox"
                        checked={notificationData.pushNotifications}
                        onChange={(e) => setNotificationData({...notificationData, pushNotifications: e.target.checked})}
                        className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
    
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Frequency</label>
                <div className="space-y-2">
                    {['immediately', 'daily', 'weekly'].map((freq) => (
                        <label key={freq} className="flex items-center">
                            <input
                                type="radio"
                                name="frequency"
                                value={freq}
                                checked={notificationData.frequency === freq}
                                onChange={(e) => setNotificationData({...notificationData, frequency: e.target.value})}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700 capitalize">{freq}</span>
                        </label>
                    ))}
                </div>
            </div>
    
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-800">You can always change these settings later. We respect your privacy and won't spam you.</p>
            </div>
            
            <button
                onClick={() => handleSave('Notification')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
                Save Notification Settings
            </button>
        </div>
    );
}