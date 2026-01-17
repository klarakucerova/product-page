// Generate short hash from configuration
export const generateConfigHash = (config) => {
    const str = JSON.stringify(config)
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return Math.abs(hash).toString(36).substring(0, 8)
}

// Save configuration (only one at a time)
export const saveConfiguration = (config) => {
    const hash = generateConfigHash(config)
    const savedConfig = {
        ...config,
        hash,
        savedAt: new Date().toISOString()
    }
    
    // Save only one config
    localStorage.setItem('savedConfig', JSON.stringify(savedConfig))
    
    return hash
}

// Load the saved configuration
export const loadConfiguration = (hash) => {
    const saved = localStorage.getItem('savedConfig')
    if (!saved) return null
    
    const config = JSON.parse(saved)
    // If hash is provided, check if it matches
    if (hash && config.hash !== hash) return null
    
    return config
}

// Get saved configuration
export const getSavedConfiguration = () => {
    const saved = localStorage.getItem('savedConfig')
    return saved ? JSON.parse(saved) : null
}

// Delete saved configuration
export const deleteSavedConfiguration = () => {
    localStorage.removeItem('savedConfig')
}

// Check if a config is saved - ADD THIS FUNCTION
export const isConfigurationSaved = (hash) => {
    const saved = getSavedConfiguration()
    return saved && saved.hash === hash
}