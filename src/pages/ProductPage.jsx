import { useState } from 'react'
import ProductOption from '../components/ProductOption'

function ProductPage({ conditionClass }) {
    const [selectedColor, setSelectedColor] = useState('sky-blue')
    const [selectedStorage, setSelectedStorage] = useState('512GB')

    const colorOptions = [
        { id: 'sky-blue', name: 'Sky Blue', value: '#CAD8DF' },
        { id: 'silver', name: 'Silver', value: '#E2E4E5' },
        { id: 'starlight', name: 'Starlight', value: '#EDE4D5' },
        { id: 'midnight', name: 'Midnight', value: '#303641' }
    ]

    const storageOptions = [
        { id: '512GB', name: '512GB', price: 0 },
        { id: '1TB', name: '1TB', price: 180 },
        { id: '2TB', name: '2TB', price: 540 }
    ]

    const currentColor = colorOptions.find(opt => opt.id === selectedColor);
    const currentStorage = storageOptions.find(opt => opt.id === selectedStorage);

    return (

    <div className="container grid grid--product product">  
        <div className="grid__item">
            image here
        </div>
        <div className="grid__item">
            <h2>Customize your MacBook Air - {currentColor?.name}</h2>
            <ul className="description">
                <li>Apple M4 chip with 10-core CPU, 10-core GPU, 16-core Neural Engine</li>
                <li>16GB unified memory</li>
                <li>{currentStorage?.name} SSD storage</li>
                <li>15.3-inch Liquid Retina display with True Tone²</li>
                <li>12MP Center Stage camera</li>
                <li>MagSafe 3 charging port</li>
                <li>Two Thunderbolt 4 ports</li>
                <li>35W Dual USB-C Port Compact Power Adapter</li>
                <li>Backlit Magic Keyboard with Touch ID - US English</li>
            </ul>

            <ProductOption 
                label="Color"
                options={colorOptions} 
                selected={selectedColor}
                onSelect={setSelectedColor}
                variant="color"
                selectedName={currentColor?.name}
            />

            <ProductOption 
                label="Storage" 
                options={storageOptions}
                selected={selectedStorage}
                onSelect={setSelectedStorage}
                variant="storage"
            />
        </div>
    </div>
    
  );
}

export default ProductPage;
