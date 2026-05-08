/**
 * ==========================================
 * TOP Watch - Configuration File
 * ==========================================
 */

const CONFIG = {
    store: {
        name: "TOP Watch",
        logo: "logo.png",
        whatsappNumber: "201101526995",
        currency: "ج.م",
        currencySymbol: "ج.م"
    },

    colors: {
        primary: "#D4AF37",
        secondary: "#1a1a1a",
        accent: "#ffffff",
        text: "#333333",
        textLight: "#666666",
        background: "#f5f5f5",
        gold: "#D4AF37",
        darkGold: "#B8941F"
    },

    products: [
        {
            id: 1,
            name: "Rolex Datejust",
            category: "men-classic",
            price: 550,
            oldPrice: 750,
            image: "images/rolex1.jpg",
            images: [
                "images/rolex1.jpg",
                "https://i.ibb.co/RTGhD4nr/rolex2.png",
                "https://i.ibb.co/2Y5fKMsn/rolex3.png"
            ],
            description:"رولكس ديت جست",
            colors: ["ازرق", "فضي","أسود"],
            inStock: true,
            rating: 4.8,
            reviews: 124
        },
        {
            id: 2,
            name: "Patek Philippe Nautilus",
            category: "men-classic",
            price: 450,
            oldPrice: 650,
            image: "https://i.ibb.co/tpSqKGVw/patek4.png",
            images: [
                "https://i.ibb.co/tpSqKGVw/patek4.png",
                "https://i.ibb.co/KzDfWJck/patek3.png",
                "https://i.ibb.co/tMvV637j/patek2.png"
            ],
            description: "ساعه كلاسيكيه بسوار معدني",
            colors: ["زيتي", "أسود", "أبيض"],
            inStock: true,
            rating: 4.6,
            reviews: 89
        },
        {
            id: 3,
            name: "Patek Philippe Nautilus",
            category: "men-classic",
            price: 500,
            oldPrice: 600,
            image: "https://i.ibb.co/5W6PVz0N/patek1.png",
            images: [
                "https://i.ibb.co/5W6PVz0N/patek1.png",
                            ],
            description: "ساعة كلاسيك بسوار جلد طبيعي",
            colors: ["بني", "أسود"],
            inStock: true,
            rating: 4.9,
            reviews: 156
        },
        {
            id: 4,
            name: "Cartier Santos",
            category: "men-casual",
            price: 450,
            oldPrice: 650,
            image: "https://i.ibb.co/Gf5pRKc5/carter3.png",
            images: [
                "https://i.ibb.co/Gf5pRKc5/carter3.png",
                "https://i.ibb.co/h1VXhbsg/carter5.png",
                "https://i.ibb.co/gMf2xqXr/carter4.png"
            ],
            description: "ساعة كلاسيك معدن",
            colors: ["أبيض", "أزرق", "أسود"],
            inStock: true,
            rating: 4.5,
            reviews: 203
        },
        {
            id: 5,
            name: "Cartier tank",
            category: "men-casual",
            price: 350,
            oldPrice: 550,
            image: "https://i.ibb.co/Rkv73B2v/carter2.png",
            images: [
                "https://i.ibb.co/Rkv73B2v/carter2.png",
                "https://i.ibb.co/jkN2xprF/carter1.png"
            ],
            description: "ساعه كلاسيك جلد",
            colors: ["بني", "أسود"],
            inStock: true,
            rating: 4.4,
            reviews: 167
        },
       
    ],

    settings: {
        itemsPerPage: 5,
        animationDuration: 300,
        lazyLoadThreshold: 100
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}