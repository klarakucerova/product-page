
function ProductActions({ totalPrice, onAddToCart }) {
    const formattedPrice = totalPrice.toLocaleString('en-US')

    return (
        <div className="product-actions">
            {/* Product action buttons would go here */}
            <div className="inner">
                <div className="price">
                    ${formattedPrice}
                </div>
                <div className="actions">
                    <button className="btn btn--primary" onClick={onAddToCart}>Add to Cart</button>
                    <button className="btn btn--secondary">Save</button>
                </div>
            </div>
        </div>
    );
}

export default ProductActions;