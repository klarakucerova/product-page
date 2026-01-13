
function ProductOption({
    label, 
    options, 
    selected, 
    onSelect,
    variant = 'default',
    selectedName
    }) {
    return (
        <div className={`product-option product-option--${variant}`}>
            <h3>{label} 
                {variant === 'color' && selectedName && (
                    <span className="selected-name">{selectedName}</span>
                )}
            </h3>
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
                </button>
                ))}
            </div>
        </div>
    )
}

export default ProductOption;