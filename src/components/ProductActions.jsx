import { useState, useEffect } from 'react'
import { getSavedConfiguration, isConfigurationSaved, deleteSavedConfiguration } from '../utils/configStorage'

function ProductActions({
    totalPrice, 
    onAddToCart, 
    onSave, 
    onDelete,
    onViewSaved,
    conditionClass = '',
    currentConfigHash
}) {
    const formattedPrice = totalPrice.toLocaleString('en-US')
    const [hasSavedConfig, setHasSavedConfig] = useState(false)
    const [isCurrentConfigSaved, setIsCurrentConfigSaved] = useState(false)

    const handleToggleSave = async () => {
        if (isCurrentConfigSaved) {
            // Delete if already saved
            deleteSavedConfiguration()
            setIsCurrentConfigSaved(false)
            setHasSavedConfig(false)
            window.dispatchEvent(new CustomEvent('configsUpdated'))
            if (onDelete) onDelete()  // Optional callback
        } else {
            // Save if not saved
            await onSave()
            setIsCurrentConfigSaved(true)
            setHasSavedConfig(true)
        }
    }

    useEffect(() => {
        const checkSavedConfig = () => {
            const saved = getSavedConfiguration()
            setHasSavedConfig(saved !== null)
            
            if (currentConfigHash) {
                const isSaved = isConfigurationSaved(currentConfigHash)
                setIsCurrentConfigSaved(isSaved)
            } else {
                setIsCurrentConfigSaved(false)
            }
        }

        checkSavedConfig()

        window.addEventListener('configsUpdated', checkSavedConfig)

        return () => {
            window.removeEventListener('configsUpdated', checkSavedConfig)
        }
    }, [currentConfigHash])

    return (
        <div className={`product-actions ${conditionClass}`}>
            <div className="inner">
                <div className="price">
                    ${formattedPrice}
                </div>
                <div className="actions">
                    <button className="btn btn--primary" onClick={onAddToCart}>
                        Add to Cart
                    </button>

                        <button 
                            className={`btn btn--icon btn--save ${isCurrentConfigSaved ? 'is-saved' : ''}`} 
                            onClick={handleToggleSave}
                            data-tooltip={isCurrentConfigSaved ? "Remove" : "Save"}
                        >
                            <svg className="icon-svg--save" width="20" height="30">
                                <use xlinkHref="#icon-bookmark"></use>
                            </svg>
                        </button>
                </div>
                        {hasSavedConfig && (
                            <button className="btn btn--icon btn--view-saved" onClick={onViewSaved}>
                                View Saved
                            </button>
                        )}
            </div>
        </div>
    );
}

export default ProductActions;