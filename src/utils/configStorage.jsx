
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

export const saveConfiguration = (config) => {
    const hash = generateConfigHash(config)
    const savedConfig = {
        ...config,
        hash,
        savedAt: new Date().toISOString()
    }
    
    localStorage.setItem('savedConfig', JSON.stringify(savedConfig))
    
    return hash
}

export const loadConfiguration = (hash) => {
    const saved = localStorage.getItem('savedConfig')
    if (!saved) return null
    
    const config = JSON.parse(saved)
    if (hash && config.hash !== hash) return null
    
    return config
}

export const getSavedConfiguration = () => {
    const saved = localStorage.getItem('savedConfig')
    return saved ? JSON.parse(saved) : null
}

export const deleteSavedConfiguration = () => {
    localStorage.removeItem('savedConfig')
}

export const isConfigurationSaved = (hash) => {
    const saved = getSavedConfiguration()
    return saved && saved.hash === hash
}