import { useState, useEffect } from 'react'
import ProductOption from '../components/ProductOption'
import ProductActions from '../components/ProductActions'
import SavedConfigModal from '../components/SavedConfigModal'
import { 
    generateConfigHash, 
    saveConfiguration, 
    loadConfiguration 
} from '../utils/configStorage'

function ProductPage() {
    const [showSavedConfig, setShowSavedConfig] = useState(false)
    const [currentConfigHash, setCurrentConfigHash] = useState(null)
    
    const [selectedColor, setSelectedColor] = useState('skyblue')
    const [selectedScreenSize, setSelectedScreenSize] = useState('13')
    const [selectedMemory, setSelectedMemory] = useState('16GB')
    const [selectedStorage, setSelectedStorage] = useState('512GB')
    const [selectedPowerAdapter, setSelectedPowerAdapter] = useState('35W')
    const [selectedKeyboard, setSelectedKeyboard] = useState('us-english')

    const colorOptions = [
        { id: 'skyblue', name: 'Sky Blue', value: '#CAD8DF', price: 0 },
        { id: 'silver', name: 'Silver', value: '#E2E4E5', price: 0 },
        { id: 'starlight', name: 'Starlight', value: '#EDE4D5', price: 0 },
        { id: 'midnight', name: 'Midnight', value: '#303641', price: 0 }
    ]

    const screenSizeOptions = [
        { id: '13', name: '13-inch', value: '13.6', price: 0 },
        { id: '15', name: '15-inch', value: '15.3', price: 200 }
    ]

    const memoryOptions = [
        { id: '16GB', name: '16GB', price: 0 },
        { id: '24GB', name: '24GB', price: 200 },
        { id: '32GB', name: '32GB', price: 380 }
    ]

    const storageOptions = [
        { id: '512GB', name: '512GB', price: 0 },
        { id: '1TB', name: '1TB', price: 180 },
        { id: '2TB', name: '2TB', price: 540 }
    ]

    const powerAdapterOptions = [
        { id: '35W', name: '35W Dual USB-C Port Compact Power Adapter', price: 0 },
        { id: '70W', name: '70W USB-C Power Adapter', price: 0 },
    ]

    const keyboardOptions = [
        { id: 'us-english', name: 'Backlit Magic Keyboard with Touch ID - US English', price: 0 },
        { id: 'arabic', name: 'Backlit Magic Keyboard with Touch ID - Arabic', price: 0 },
        { id: 'uk-english', name: 'Backlit Magic Keyboard with Touch ID - British English', price: 0 },
        { id: 'chinese-pinyin', name: 'Backlit Magic Keyboard with Touch ID - Chinese (Pinyin)', price: 0 },
        { id: 'chinese-zhuyin', name: 'Backlit Magic Keyboard with Touch ID - Chinese (Zhuyin)', price: 0 },
        { id: 'danish', name: 'Backlit Magic Keyboard with Touch ID - Danish', price: 0 },
        { id: 'dutch', name: 'Backlit Magic Keyboard with Touch ID - Dutch', price: 0 },
        { id: 'french-canadian', name: 'Backlit Magic Keyboard with Touch ID - French Canadian', price: 0 },
        { id: 'french', name: 'Backlit Magic Keyboard with Touch ID - French', price: 0 },
        { id: 'german', name: 'Backlit Magic Keyboard with Touch ID - German', price: 0 },
        { id: 'hebrew', name: 'Backlit Magic Keyboard with Touch ID - Hebrew', price: 0 },
        { id: 'italian', name: 'Backlit Magic Keyboard with Touch ID - Italian', price: 0 },
        { id: 'japanese', name: 'Backlit Magic Keyboard with Touch ID - Japanese', price: 0 },
        { id: 'korean', name: 'Backlit Magic Keyboard with Touch ID - Korean', price: 0 },
        { id: 'portuguese', name: 'Backlit Magic Keyboard with Touch ID - Portuguese', price: 0 },
        { id: 'russian', name: 'Backlit Magic Keyboard with Touch ID - Russian', price: 0 },
        { id: 'spanish-latin-america', name: 'Backlit Magic Keyboard with Touch ID - Spanish (Latin America)', price: 0 },
        { id: 'spanish', name: 'Backlit Magic Keyboard with Touch ID - Spanish', price: 0 },
        { id: 'swiss', name: 'Backlit Magic Keyboard with Touch ID - Swiss', price: 0 },
        { id: 'ukrainian', name: 'Backlit Magic Keyboard with Touch ID - Ukrainian', price: 0 }
    ]

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const configHash = params.get('config')
        if (configHash) {
            const config = loadConfiguration(configHash)
            if (config) {
                setSelectedColor(config.color)
                setSelectedScreenSize(config.screen)
                setSelectedMemory(config.memory)
                setSelectedStorage(config.storage)
                setSelectedPowerAdapter(config.power)
                setSelectedKeyboard(config.keyboard)
            }
        }
    }, [])

    useEffect(() => {
        const config = getCurrentConfig()
        const hash = generateConfigHash(config)
        setCurrentConfigHash(hash)
    }, [selectedColor, selectedScreenSize, selectedMemory, selectedStorage, selectedPowerAdapter, selectedKeyboard])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const configHash = params.get('config')
        if (configHash) {
            const config = loadConfiguration(configHash)
            if (config) {
                setSelectedColor(config.color)
                setSelectedScreenSize(config.screen)
                setSelectedMemory(config.memory)
                setSelectedStorage(config.storage)
                setSelectedPowerAdapter(config.power)
                setSelectedKeyboard(config.keyboard)
            }
        }
    }, [])

    const updateURL = (hash) => {
        const newUrl = `${window.location.pathname}?config=${hash}`
        window.history.pushState({}, '', newUrl)
    }

    // Get current configuration
    const getCurrentConfig = () => ({
        color: selectedColor,
        screen: selectedScreenSize,
        memory: selectedMemory,
        storage: selectedStorage,
        power: selectedPowerAdapter,
        keyboard: selectedKeyboard
    })

    // Handle Save
    const handleSave = () => {
        const config = getCurrentConfig()
        const hash = saveConfiguration(config)
        updateURL(hash)
        setCurrentConfigHash(hash)
        window.dispatchEvent(new CustomEvent('configsUpdated'))
    }

    const handleDelete = () => {
        console.log('Configuration deleted')
    }

    // Handle Share
    const handleShare = async () => {
        const config = getCurrentConfig()
        const hash = saveConfiguration(config)
        
        const shareUrl = `${window.location.origin}${window.location.pathname}?config=${hash}`
        
        try {
            await navigator.clipboard.writeText(shareUrl)
        } catch (err) {
            prompt('Copy this link:', shareUrl)
        }
    }

    const handleLoadSaved = () => {
        const config = loadConfiguration()
        if (config) {
            setSelectedColor(config.color)
            setSelectedScreenSize(config.screen)
            setSelectedMemory(config.memory)
            setSelectedStorage(config.storage)
            setSelectedPowerAdapter(config.power)
            setSelectedKeyboard(config.keyboard)
            updateURL(config.hash)
            setCurrentConfigHash(config.hash)
        }
        setShowSavedConfig(false)
    }

    const currentColor = colorOptions.find(opt => opt.id === selectedColor);
    const currentScreenSize = screenSizeOptions.find(opt => opt.id === selectedScreenSize);
    const currentMemory = memoryOptions.find(opt => opt.id === selectedMemory);
    const currentStorage = storageOptions.find(opt => opt.id === selectedStorage);
    const currentPowerAdapter = powerAdapterOptions.find(opt => opt.id === selectedPowerAdapter);
    const currentKeyboard = keyboardOptions.find(opt => opt.id === selectedKeyboard);
    const currentImage = `/images/${selectedScreenSize}/${selectedColor}.jpg`;

    const BASE_PRICE = 1099;

    const calculateTotalPrice = () => {
        const screenPrice = screenSizeOptions.find(opt => opt.id === selectedScreenSize)?.price || 0
        const colorPrice = colorOptions.find(opt => opt.id === selectedColor)?.price || 0
        const memoryPrice = memoryOptions.find(opt => opt.id === selectedMemory)?.price || 0
        const storagePrice = storageOptions.find(opt => opt.id === selectedStorage)?.price || 0
        const powerAdapterPrice = powerAdapterOptions.find(opt => opt.id === selectedPowerAdapter)?.price || 0
        const keyboardPrice = keyboardOptions.find(opt => opt.id === selectedKeyboard)?.price || 0

        return BASE_PRICE + screenPrice + colorPrice + memoryPrice + storagePrice + powerAdapterPrice + keyboardPrice;
    }

    const totalPrice = calculateTotalPrice()

    return (
    <>
        <div className="container grid grid--product product">  
            <div className="grid__item">
                <div className="product-image">
                    <img 
                        src={currentImage} 
                        alt={`MacBook Air ${selectedScreenSize} in ${selectedColor}`}
                        key={`${selectedScreenSize}-${selectedColor}`}
                    />
                </div>
            </div>
            <div className="grid__item">
                <h2>Customize your MacBook Air - {currentColor?.name}</h2>
                <ul className="description">
                    <li>Apple M4 chip with 10-core CPU, 10-core GPU, 16-core Neural Engine</li>
                    <li>{currentMemory?.name} unified memory</li>
                    <li>{currentStorage?.name} SSD storage</li>
                    <li>{currentScreenSize?.value}-inch Liquid Retina display with True Tone²</li>
                    <li>12MP Center Stage camera</li>
                    <li>MagSafe 3 charging port</li>
                    <li>Two Thunderbolt 4 ports</li>
                    <li>{currentPowerAdapter?.name}</li>
                    <li>{currentKeyboard?.name}</li>
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
                    label="Screen size"
                    options={screenSizeOptions} 
                    selected={selectedScreenSize}
                    onSelect={setSelectedScreenSize}
                    variant="screenSize"
                    selectedName={currentScreenSize?.name}
                />

                <ProductOption 
                    label="Memory" 
                    options={memoryOptions}
                    selected={selectedMemory}
                    onSelect={setSelectedMemory}
                    variant="memory"
                    helpText="How much memory is right for you?"
                    helpHeader="Memory"
                    helpContent={
                        <div>
                            <p>Your Mac relies on memory to keep the files and apps you’re running open and available. Memory stores data temporarily, providing much faster access to your apps and files than storage.</p>

                            <p>M-series chips include unified memory, which is more efficient than traditional RAM. This single pool of high-performance memory allows apps to efficiently share data between the CPU, GPU, and Neural Engine — so everything you do is fast and fluid. This means you can do more with unified memory than you could with the same amount of traditional RAM.</p>

                            <p> The amount of memory that’s right for you depends on how you will use your Mac. The more memory you choose, the more apps you can run simultaneously and the better they will perform.</p>

                            <h4>16GB</h4>
                            <p>Ideal for browsing online, streaming movies, editing photos and video, gaming, and running multiple everyday productivity apps.</p>

                            <h4>24GB</h4>
                            <p>Recommended if you will be multitasking across a large number of memory-intensive apps, including audio and high-resolution video editing.</p>

                            <h4>32GB</h4>
                            <p>Best if you typically work on advanced projects that require enormous files and content libraries.</p>

                            <p>Note: Unified memory is not user accessible. If you think you’ll need additional memory, it’s a good idea to upgrade now.</p>
                        </div>
                    }
                />

                <ProductOption 
                    label="Storage" 
                    options={storageOptions}
                    selected={selectedStorage}
                    onSelect={setSelectedStorage}
                    variant="storage"
                    helpText="How much storage is right for you?"
                    helpHeader="Storage"
                    helpContent={
                        <div>
                            <p>Mac uses fast SSD storage¹ to store your apps, documents, photos, movies, music, and other files and libraries.</p>
                            <p>How much storage you need depends on how you use your Mac. The more storage you have, the more files your Mac can hold and the faster it can access them when needed.</p>
                            <p>A good way to figure out your storage needs is to check how much storage you’re using on your current computer. On a Mac, go to System Settings > General > Storage. If you’re nearing your limit, it’s a good idea to consider a larger capacity.</p>
                            <p>Note: Storage is not user accessible. If you think you’ll need more internal storage in the future, you’ll want to select your capacity with that in mind now.</p>

                            <small>1. 1GB = 1 billion bytes and 1TB = 1 trillion bytes; actual formatted capacity less.</small>
                        </div>
                    }
                />

                <ProductOption 
                    label="Power Adapter" 
                    options={powerAdapterOptions}
                    selected={selectedPowerAdapter}
                    onSelect={setSelectedPowerAdapter}
                    variant="powerAdapter"
                    helpText="Which power adapter is right for you?"
                    helpHeader="Power Adapter"
                    helpContent={
                        <div>
                            <p>Two power adapter options are available with this MacBook Air.</p>
                            <h4>35W Dual USB-C Port Compact Power Adapter</h4>
                            <p>With a convenient compact size and folding prongs, this adapter features two USB-C ports so you can charge two devices at once.</p>
                            <h4>70W USB-C Power Adapter</h4>
                            <p>Choose this adapter if you want to fast-charge your MacBook Air, charging your battery up to 50 percent in 35 minutes.³</p>
                            <small>3. Testing conducted by Apple in January 2025 using preproduction 13-inch MacBook Air systems with Apple M4, 10-core CPU, and 8-core GPU, and preproduction 15-inch MacBook Air systems with Apple M4, 10-core CPU, and 10-core GPU, all configured with 16GB of RAM and 256GB SSD. Tested with Apple 70W USB-C Power Adapter (Model A2743) with USB-C to MagSafe 3 Cable (Model A2363). Fast-charge testing conducted with drained MacBook Air units. Times measured from the beginning of wake from hibernate, or from the appearance of the Apple logo as the unit started up. Charge time varies with settings and environmental factors; actual results will vary.</small>
                        </div>
                    }
                />

                <ProductOption 
                    label="Keyboard Language"
                    options={keyboardOptions}
                    selected={selectedKeyboard}
                    onSelect={setSelectedKeyboard}
                    variant="keyboard"
                    selectedName={currentKeyboard?.name}
                    helpText="Learn more"
                    helpHeader="Keyboard Language"
                    helpContent={
                        <div>
                            <p>You can configure your Mac with one of the keyboard languages listed.</p>
                            <p>macOS lets you choose your preferred language for use throughout the operating system, including apps, menu bar, dialog boxes, and for reading and writing text. Select any of the languages supported by macOS during the setup process or at any time using System Settings.</p>
                            <p>Your Mac comes with documentation appropriate for the country where it was purchased.</p>
                        </div>
                    }
                />
            </div>
        </div>

        <ProductActions 
            totalPrice={totalPrice}
            onAddToCart={() => console.log('Added to cart')}
            onSave={handleSave}
            onDelete={handleDelete}
            onShare={handleShare}
            onViewSaved={() => setShowSavedConfig(true)}
            currentConfigHash={currentConfigHash}
        />

        <SavedConfigModal 
            isOpen={showSavedConfig}
            onClose={() => setShowSavedConfig(false)}
            onLoadConfig={handleLoadSaved}
            powerAdapterOptions={powerAdapterOptions}  // Add this
            keyboardOptions={keyboardOptions}  // Add this
            colorOptions={colorOptions}  // Add this
        />
    </>
  );
}

export default ProductPage;
