import { useState } from 'react'
import Modal from './Modal'

function ProductOption({
    label, 
    options, 
    selected, 
    onSelect,
    variant = 'default',
    selectedName,
    helpText,
    helpHeader,
    helpContent 
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className={`product-option product-option--${variant}`}>
            <div className='option__label'>
                <h3 className="label">{label} 
                    {variant === 'color' && selectedName && (
                        <span className="selected-name">{selectedName}</span>
                    )}
                </h3>
                {helpText && (
                    <button 
                        className="help-link"
                        onClick={() => setIsModalOpen(true)}
                    >
                        {helpText}
                    </button>
                )}
            </div>

            {/* Dropdown for keyboard variant */}
            {variant === 'keyboard' ? (
                <div className="options">
                    <div className="select">
                        <select 
                            value={selected} 
                            onChange={(e) => onSelect(e.target.value)}
                            className="keyboard-dropdown"
                        >
                            {options.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <svg className="icon-svg--chevron select__chevron" width="20" height="20"><use xlinkHref="#icon-chevron"></use></svg> 
                    </div>
                </div>
            ) : (
                /* Existing button options for color/storage */
                <div className="options">
                    {options.map(option => (
                    <button
                        key={option.id}
                        className={`option-btn ${selected === option.id ? 'active' : ''}`}
                        onClick={() => onSelect(option.id)}
                    >
                        {/* Conditional rendering based on variant */}
                        {variant === 'color' && (
                            <>
                                <span 
                                    className="color-swatch" 
                                    style={{ backgroundColor: option.value }}
                                />
                                <span className="name">{option.name}</span>
                            </>
                        )}

                        {variant === 'storage' && (
                            <>
                                <span className="name">{option.name} SSD storage</span>
                                {option.price > 0 && (
                                <span className="price-badge">+${option.price}</span>
                                )}
                            </>
                        )}

                        {variant === 'screenSize' && (
                            <>
                                <span className="name">{option.name}</span>
                                {option.price > 0 && (
                                <span className="price-badge">+${option.price}</span>
                                )}
                            </>
                        )}

                        {variant === 'memory' && (
                            <>
                                <span className="name">{option.name} unified memory</span>
                                {option.price > 0 && (
                                <span className="price-badge">+${option.price}</span>
                                )}
                            </>
                        )}

                        {variant === 'powerAdapter' && (
                            <>
                                <span className="name">{option.name}</span>
                                {option.price > 0 && (
                                <span className="price-badge">+${option.price}</span>
                                )}
                            </>
                        )}
                    </button>
                    ))}
                </div>
            )}

            {/* Modal */}
            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={helpHeader || label}
            >
                {helpContent}
            </Modal>
        </div>
    )
}

export default ProductOption;