import { useState } from "react";
import { EyeOff, Eye } from 'lucide-react'

export default function PasswordTab({ handleSave }) {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleOldPasswordChange = (e) => {
        const value = e.target.value;
        setPasswordData((prev) => ({ ...prev, oldPassword: value }));
        if (value.trim()) {
            setErrors((prev) => ({ ...prev, oldPassword: "" }));
        }
    };
    
    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setPasswordData((prev) => ({ ...prev, newPassword: value }));
        if (value.length >= 8) {
            setErrors((prev) => ({ ...prev, newPassword: "" }));
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setPasswordData((prev) => ({ ...prev, confirmPassword: value }));
        if (value.trim()) {
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
    }


    const validate = () => {
        const newErrors = {}

        if(!passwordData.oldPassword.trim()) {
            newErrors.oldPassword = 'Please provide your current password'
        }
        if (!passwordData.newPassword.trim()) {
            newErrors.newPassword = "Please provide a new password"
        } else if (passwordData.newPassword.length < 8) {
            newErrors.newPassword = "Must be at least 8 characters long"
        }
        if (!passwordData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your new password'
        } else if (passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (validate()) {
            handleSave('Password')
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Current Password </label>
                <div className="relative">
                    <input type={showOldPassword ? "text" : "password"} value={passwordData.oldPassword} onChange={handleOldPasswordChange} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <div type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" >
                        {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </div>
                </div>
                <p className="text-xs text-red-600">{errors.oldPassword}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> New Password </label>
                <div className="relative">
                    <input type={showNewPassword ? "text" : "password"} value={passwordData.newPassword} onChange={handleNewPasswordChange} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                <p className={`text-xs ${errors.newPassword ? 'text-red-500' : 'text-gray-500' } mt-1`}>{errors.newPassword || 'Must be at least 8 characters long'}</p>
            </div>
    
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Confirm New Password </label>
                <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={passwordData.confirmPassword} onChange={handleConfirmPasswordChange} className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600" >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                <p className="text-xs text-red-600">{errors.confirmPassword}</p>
            </div>
    
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                    <strong>Security tip:</strong> Use a strong password with a mix of letters, numbers, and symbols.
                </p>
            </div>
    
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
                Update Password
            </button>
        </form>
    )
}