function Modal({ isOpen, onClose, title, children }) {
    return (
        <>
            {isOpen && <div className="modal__overlay" onClick={onClose}></div>}

            <div className={`modal__sidebar ${isOpen ? 'open' : ''}`}>
                <button className="modal__close" onClick={onClose}>×</button>
                
                <div className="modal__header">
                    <h2>{title}</h2>
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal