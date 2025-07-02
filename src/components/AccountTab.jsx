import { useState, useRef } from "react";
import { Upload } from 'lucide-react'

export default function AccountTab({ handleSave }) {

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        bio: '',
        image: ''
    })
    const [accountData, setAccountData] = useState({
        username: '',
        email: '',
        bio: ''
    });

    const handleUsernameChange = (e) => {
        const value = e.target.value
        setAccountData((prev) => ({ ...prev, username: value }))
        
        if (value.trim()) {
            setErrors((prev) => ({ ...prev, username: "" }))
        }
    }

    const handleEmailChange = (e) => {
        const value = e.target.value
        setAccountData((prev) => ({ ...prev, email: value }))
        
        if (/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(value)) {
            setErrors((prev) => ({ ...prev, email: "" }))
        }
    }

    const handleBioChange = (e) => {
        const value = e.target.value
        setAccountData((prev) => ({ ...prev, bio: value }))
        
        if (value.trim()) {
            setErrors((prev) => ({ ...prev, bio: "" }))
        }
    }

    const fileInputRef = useRef(null)
    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState("")

    const MAX_FILE_SIZE = 500 * 1024 * 1024

    const handleFile = (selectedFile) => {
        if (!selectedFile) {
            return
        }
    
        if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
            setErrors((prev) => ({ ...prev, image: "Only JPG or PNG files are allowed." }))
            return
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            setErrors((prev) => ({ ...prev, image: "File size must be less than 500KB." }))
            return
        }
        
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile))
        setErrors((prev) => ({ ...prev, image: "" }))
    }
        
    const handleChange = (e) => {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return 
        handleFile(selectedFile)
    }

    const triggerFileInput = () => fileInputRef.current.click()

    const validate = () => {
        const newErrors = {}

        if(!accountData.username.trim()) {
            newErrors.username = 'Please provide a username'
        }
        if (!accountData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(accountData.email)) {
            newErrors.email = "Please enter a valid email address."
        }
        if (!accountData.bio.trim()) {
            newErrors.bio = 'Please tell us about yourself'
        }
        if (!file) {
            newErrors.image = "Please upload a valid photo (JPG or PNG, max 5MB)."
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (validate()) {
            handleSave('Account')
        }
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input type="text" value={accountData.username} onChange={handleUsernameChange} className={`w-full px-3 py-2 border ${errors.username ? 'border-red-600' : 'border-gray-300'}  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} />
                <p className="text-xs text-red-600">{errors.username}</p>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Email </label>
                <input type="email" value={accountData.email} onChange={handleEmailChange} className={`w-full px-3 py-2 border ${errors.email ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`} />
                <p className="text-xs text-red-600">{errors.email}</p>
            </div>
        
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"> Profile Bio </label>
                <textarea value={accountData.bio} onChange={handleBioChange} rows={4} className={`w-full px-3 py-2 border ${errors.bio ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`} placeholder="Tell us about yourself..." />
                <p className="text-xs text-red-600">{errors.bio}</p>
            </div>
        
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                <div className="flex items-center space-x-4" onClick={!file ? triggerFileInput : undefined} onDragOver={(e) => e.preventDefault()}>
                    {previewUrl ? 
                        (<img src={previewUrl} alt="preview" className="w-16 h-16 object-cover rounded-full mb-2 border-2 border-neutral-700"/>) : 
                        (<div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">JD</div>)
                    }
                    
                    <div>
                        <div className={`inline-flex items-center px-4 py-2 cursor-pointer bg-white border ${errors.image ? 'border-red-600' : 'border-gray-300'} rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`} onClick={triggerFileInput}>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload New Avatar
                            <input type="file" accept="image/jpeg,image/png" ref={fileInputRef} onChange={handleChange} className="hidden"/>
                        </div>
                        <p className={`text-xs ${errors.image ? 'text-red-600' : 'text-gray-500'} mt-1`}>{errors.image || 'JPG, PNG up to 5MB'}</p>
                    </div>
                </div>
            </div>
        
            <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" >
                Save Account Settings
            </button>
        </form>
    )
}