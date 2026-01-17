import { useState, useEffect } from 'react'
import { getSavedConfiguration, deleteSavedConfiguration } from '../utils/configStorage'

function SavedConfigModal({ isOpen, onClose, onLoadConfig, powerAdapterOptions, keyboardOptions, colorOptions  }) {
    const [savedConfig, setSavedConfig] = useState(null)

    useEffect(() => {
        if (isOpen) {
            setSavedConfig(getSavedConfiguration())
        }
    }, [isOpen])

    const handleDelete = () => {
        deleteSavedConfiguration()
        setSavedConfig(null)
        window.dispatchEvent(new CustomEvent('configsUpdated'))
        onClose()
    }

    const handleShare = () => {
        if (savedConfig) {
            const shareUrl = `${window.location.origin}${window.location.pathname}?config=${savedConfig.hash}`
            navigator.clipboard.writeText(shareUrl)
            alert('Link copied!')
        }
    }

    const getPowerAdapterName = () => {
        const adapter = powerAdapterOptions?.find(opt => opt.id === savedConfig.power)
        return adapter?.name || savedConfig.power
    }

    const getKeyboardName = () => {
        const keyboard = keyboardOptions?.find(opt => opt.id === savedConfig.keyboard)
        return keyboard?.name || savedConfig.keyboard
    }

    const getColorName = () => {
        const color = colorOptions?.find(opt => opt.id === savedConfig.color)
        return color?.name || savedConfig.color
    }

    return (
        <>
            {isOpen && <div className="modal__overlay" onClick={onClose}></div>}
            <div className={`modal__sidebar ${isOpen ? 'open' : ''}`}>
                <div className="modal__header">
                    <h2>Saved Configuration</h2>
                    <button className="modal__close" onClick={onClose}>×</button>
                </div>
                <div className="modal__body">
                    {!savedConfig ? (
                        <p>No saved configuration yet.</p>
                    ) : (
                        <div className="config">
                            <ul className="description">
                                <li>Apple M4 chip with 10-core CPU, 10-core GPU, 16-core Neural Engine in {getColorName()}</li>
                                <li>{savedConfig.screen}-inch Liquid Retina display with True Tone²</li>
                                <li>{savedConfig.memory} unified memory</li>
                                <li>{savedConfig.storage} SSD storage</li>
                                <li>12MP Center Stage camera</li>
                                <li>MagSafe 3 charging port</li>
                                <li>Two Thunderbolt 4 ports</li>
                                <li>{getPowerAdapterName()}</li>
                                <li>{getKeyboardName()}</li>
                            </ul>
                            <div className="config__actions">
                                <button 
                                    className="btn btn--primary"
                                    onClick={onLoadConfig}
                                >
                                    Load Configuration
                                </button>
                                <button 
                                    className="btn btn--secondary"
                                    onClick={handleShare}
                                >
                                    Share
                                </button>
                                <button 
                                    className="btn btn--danger"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SavedConfigModal