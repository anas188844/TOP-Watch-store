/**
 * ==========================================
 * TOP Watch - Main Application Logic
 * ==========================================
 */

// ==================== Sound Manager ====================
const SoundManager = {
    audioContext: null,
    enabled: true,

    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },

    playClick() {
        if (!this.enabled) return;
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1800, now);
        osc1.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain1.gain.setValueAtTime(0.12, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc1.connect(gain1); gain1.connect(ctx.destination);
        osc1.start(now); osc1.stop(now + 0.08);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(2400, now);
        osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.03);
        gain2.gain.setValueAtTime(0.08, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc2.connect(gain2); gain2.connect(ctx.destination);
        osc2.start(now); osc2.stop(now + 0.04);
    },

    playAddToCart() {
        if (!this.enabled) return;
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            gain.gain.setValueAtTime(0.1, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(now + i * 0.1); osc.stop(now + i * 0.1 + 0.2);
        });
    },

    playRemove() {
        if (!this.enabled) return;
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.2);
    },

    playSuccess() {
        if (!this.enabled) return;
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.12);
            gain.gain.setValueAtTime(0.12, now + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(now + i * 0.12); osc.stop(now + i * 0.12 + 0.3);
        });
    },

    playPageChange() {
        if (!this.enabled) return;
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.exponentialRampToValueAtTime(1500, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.15);
    },

    playSearch() {
        if (!this.enabled) return;
        if (!this.audioContext) this.init();
        const ctx = this.audioContext;
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.setValueAtTime(1600, now + 0.04);
        osc.frequency.setValueAtTime(1200, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.1);
    },

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
};

// ==================== Main Application ====================
class TOPWatchApp {
    constructor() {
        this.cart = [];
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.quantity = 1;
        this.selectedColor = '';
        this.currentProduct = null;
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 1200);
        });

        this.loadCart();
        this.updateConfig();
        this.renderHome();
        this.updateCartUI();
        this.setupEventListeners();
        this.setupLazyLoading();
        this.setupGlobalClickSound();
    }

    // ==================== Global Sound Setup ====================
    setupGlobalClickSound() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.target.closest('.cart-sidebar')) return;
            SoundManager.playClick();
        });

        const originalAdd = this.addToCart.bind(this);
        this.addToCart = function(productId, fromDetails = false) {
            SoundManager.playAddToCart();
            originalAdd(productId, fromDetails);
        };

        const originalRemove = this.removeFromCart.bind(this);
        this.removeFromCart = function(productId, color = null) {
            SoundManager.playRemove();
            originalRemove(productId, color);
        };

        const originalNavigate = this.navigate.bind(this);
        this.navigate = function(page, params = null) {
            SoundManager.playPageChange();
            originalNavigate(page, params);
        };

        const originalSearch = this.searchProducts.bind(this);
        this.searchProducts = function(query) {
            if (query.length > 0 && query.length % 2 === 0) SoundManager.playSearch();
            originalSearch(query);
        };
    }

    // ==================== Configuration ====================
    updateConfig() {
        const nameEls = document.querySelectorAll('#navStoreName, #footerStoreName');
        nameEls.forEach(el => el.textContent = CONFIG.store.name);

        const waBtn = document.getElementById('whatsappFloat');
        if (waBtn) waBtn.href = `https://wa.me/${CONFIG.store.whatsappNumber}`;

        const phoneEl = document.getElementById('footerPhone');
        if (phoneEl) phoneEl.textContent = CONFIG.store.whatsappNumber.replace('20', '0');
    }

    // ==================== Navigation ====================
    navigate(page, params = null) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        switch(page) {
            case 'home': this.renderHome(); break;
            case 'product': this.renderProductDetails(params); break;
            case 'checkout': this.renderCheckout(); break;
            case 'contact': this.renderContact(); break;
        }
        if (history.pushState) {
            const url = page === 'home' ? '/' : `/${page}${params ? '/' + params : ''}`;
            history.pushState({ page, params }, '', url);
        }
    }

    // ==================== Rendering ====================
    renderHome() {
        const main = document.getElementById('mainContent');
        const filtered = this.getFilteredProducts();

        main.innerHTML = `
            <section class="hero">
                <div class="container">
                    <div class="hero-content">
                        <h1>اكتشف الفخامة في كل ثانية</h1>
                        <p>مجموعتنا الحصرية من الساعات الفاخرة تجمع بين الأناقة والدقة السويسرية</p>
                        <button class="btn btn-primary" onclick="document.getElementById('productsSection').scrollIntoView({behavior: 'smooth'})">
                            تسوق الآن <i class="fas fa-shopping-bag"></i>
                        </button>
                    </div>
                    <div class="hero-image">
                        <img src="https://i.ibb.co/PztgRKvr/rolex1.png" alt="Luxury Watch">
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">تسوق حسب الفئة</h2>
                        <p class="section-subtitle">اختر من مجموعتنا المتنوعة</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                        ${['men-classic', 'men-casual', 'women'].map((cat, i) => {
                            const names = ['رجالي كلاسيك', 'رجالي كاجوال', 'حريمي'];
                            const icons = ['fa-user-tie', 'fa-watch', 'fa-female'];
                            return `
                            <div class="category-card" onclick="app.filterByCategory('${cat}')" style="
                                background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
                                padding: 40px; border-radius: 10px; text-align: center; cursor: pointer;
                                transition: all 0.3s; border: 2px solid transparent;
                            " onmouseover="this.style.borderColor='#D4AF37'; this.style.transform='translateY(-5px)'" 
                               onmouseout="this.style.borderColor='transparent'; this.style.transform='translateY(0)'">
                                <i class="fas ${icons[i]}" style="font-size: 48px; color: #D4AF37; margin-bottom: 20px;"></i>
                                <h3 style="color: white; font-size: 24px; margin-bottom: 10px;">${names[i]}</h3>
                                <p style="color: rgba(255,255,255,0.7);">${['ساعات رسمية أنيقة', 'ساعات يومية عملية', 'ساعات نسائية فاخرة'][i]}</p>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            </section>

            <section class="section" id="productsSection" style="background: white;">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">منتجاتنا المميزة</h2>
                        <p class="section-subtitle">اختر من بين مجموعتنا الحصرية</p>
                    </div>

                    <div class="filter-buttons" style="display: flex; justify-content: center; gap: 15px; margin-bottom: 40px; flex-wrap: wrap;">
                        <button class="btn ${this.currentCategory === 'all' ? 'btn-primary' : 'btn-secondary'}" onclick="app.filterByCategory('all')">الكل</button>
                        <button class="btn ${this.currentCategory === 'men-classic' ? 'btn-primary' : 'btn-secondary'}" onclick="app.filterByCategory('men-classic')">رجالي كلاسيك</button>
                        <button class="btn ${this.currentCategory === 'men-casual' ? 'btn-primary' : 'btn-secondary'}" onclick="app.filterByCategory('men-casual')">رجالي كاجوال</button>
                        <button class="btn ${this.currentCategory === 'women' ? 'btn-primary' : 'btn-secondary'}" onclick="app.filterByCategory('women')">حريمي</button>
                    </div>

                    <div class="products-grid">
                        ${filtered.length > 0 ? filtered.map(p => this.renderProductCard(p)).join('') : `
                            <div class="text-center" style="padding: 60px; grid-column: 1 / -1;">
                                <i class="fas fa-search" style="font-size: 64px; color: #D4AF37; margin-bottom: 20px;"></i>
                                <h3 style="color: #333;">لا توجد منتجات مطابقة</h3>
                            </div>`}
                    </div>
                </div>
            </section>

            <section class="section" style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); color: white;">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title" style="color: #D4AF37;">لماذا تختارنا؟</h2>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px;">
                        ${[
                            ['fa-shipping-fast', 'شحن سريع', 'توصيل لجميع المحافظات خلال 2-4 أيام'],
                            ['fa-undo', 'استرجاع سهل', 'يمكنك استرجاع المنتج خلال 5 أيام'],
                            ['fa-headset', 'دعم 24/7', 'فريق دعم متواجد دائماً لمساعدتك']
                        ].map(([icon, title, desc]) => `
                            <div style="text-align: center;">
                                <i class="fas ${icon}" style="font-size: 48px; color: #D4AF37; margin-bottom: 20px;"></i>
                                <h3 style="margin-bottom: 10px;">${title}</h3>
                                <p style="color: rgba(255,255,255,0.7);">${desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderProductCard(product) {
        const catNames = { 'men-classic': 'رجالي كلاسيك', 'men-casual': 'رجالي كاجوال', 'women': 'حريمي' };
        const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

        return `
            <div class="product-card fade-in">
                ${discount > 0 ? `<span class="product-badge">خصم ${discount}%</span>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" class="lazy-img">
                    <div class="product-actions">
                        <button class="product-action-btn" onclick="app.navigate('product', ${product.id})" title="عرض التفاصيل"><i class="fas fa-eye"></i></button>
                        <button class="product-action-btn" onclick="app.addToCart(${product.id})" title="إضافة للسلة"><i class="fas fa-shopping-bag"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${catNames[product.category]}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">${this.renderStars(product.rating)} <span style="color:#666;margin-right:5px;">(${product.reviews})</span></div>
                    <div class="product-price">
                        <span class="current-price">${product.price} ${CONFIG.store.currencySymbol}</span>
                        ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ${CONFIG.store.currencySymbol}</span>` : ''}
                    </div>
                    <button class="btn btn-primary btn-full" onclick="app.addToCart(${product.id})"><i class="fas fa-shopping-bag"></i> أضف للسلة</button>
                </div>
            </div>`;
    }

    renderStars(rating) {
        let s = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) s += '<i class="fas fa-star"></i>';
            else if (i - 0.5 <= rating) s += '<i class="fas fa-star-half-alt"></i>';
            else s += '<i class="far fa-star"></i>';
        }
        return s;
    }

    renderProductDetails(productId) {
        const product = CONFIG.products.find(p => p.id === productId);
        if (!product) return;
        this.currentProduct = product;
        this.quantity = 1;
        this.selectedColor = product.colors ? product.colors[0] : '';

        const catNames = { 'men-classic': 'رجالي كلاسيك', 'men-casual': 'رجالي كاجوال', 'women': 'حريمي' };

        document.getElementById('mainContent').innerHTML = `
            <div class="product-details">
                <div class="container">
                    <button class="btn btn-secondary mb-20" onclick="app.navigate('home')"><i class="fas fa-arrow-right"></i> العودة للمتجر</button>
                    <div class="product-details-grid">
                        <div class="product-gallery">
                            <div class="main-image"><img src="${product.image}" alt="${product.name}" id="mainProductImage"></div>
                            <div class="thumbnail-images">
                                ${product.images.map((img, i) => `
                                    <div class="thumbnail ${i === 0 ? 'active' : ''}" onclick="app.changeImage('${img}', this)">
                                        <img src="${img}" alt="${product.name}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="product-info-details">
                            <div class="product-category">${catNames[product.category]}</div>
                            <h1>${product.name}</h1>
                            <div class="product-rating" style="margin: 15px 0;">${this.renderStars(product.rating)} <span style="color:#666;margin-right:10px;">(${product.reviews} تقييم)</span></div>
                            <p class="product-description">${product.description}</p>
                            <div class="product-price-details">
                                <div class="price-label">السعر:</div>
                                <div class="price-value">${product.price} ${CONFIG.store.currencySymbol}</div>
                                ${product.oldPrice ? `<div style="text-decoration:line-through;color:#999;margin-top:5px;">${product.oldPrice} ${CONFIG.store.currencySymbol}</div>` : ''}
                            </div>
                            ${product.colors && product.colors.length > 0 ? `
                                <div class="color-selector">
                                    <span class="color-label">اللون:</span>
                                    <div class="color-options">
                                        ${product.colors.map((c, i) => `
                                            <div class="color-option ${i === 0 ? 'active' : ''}" style="background:${this.getColorCode(c)}" onclick="app.selectColor('${c}', this)" title="${c}"></div>
                                        `).join('')}
                                    </div>
                                </div>` : ''}
                            <div class="quantity-selector">
                                <span class="quantity-label">الكمية:</span>
                                <div class="quantity-controls">
                                    <button class="quantity-btn" onclick="app.decreaseQuantity()">-</button>
                                    <span class="quantity-value" id="quantityValue">1</span>
                                    <button class="quantity-btn" onclick="app.increaseQuantity()">+</button>
                                </div>
                            </div>
                            <div style="display:flex;gap:15px;flex-wrap:wrap;">
                                <button class="btn btn-primary" style="flex:1;min-width:200px;" onclick="app.addToCart(${product.id}, true)"><i class="fas fa-shopping-bag"></i> أضف للسلة</button>
                                <button class="btn btn-secondary" onclick="app.buyNow(${product.id})"><i class="fas fa-bolt"></i> شراء الآن</button>
                            </div>
                            <div style="margin-top:30px;padding:20px;background:#f5f5f5;border-radius:10px;">
                                <h4 style="margin-bottom:15px;color:#333;">معلومات المنتج:</h4>
                                <ul style="list-style:none;color:#666;">
                                    <li style="margin-bottom:10px;"><i class="fas fa-check" style="color:#D4AF37;margin-left:10px;"></i> شحن جميع المحافظات</li>
                                    <li><i class="fas fa-check" style="color:#D4AF37;margin-left:10px;"></i> استرجاع خلال 5 ايام</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    renderCheckout() {
        if (this.cart.length === 0) {
            alert('السلة فارغة!');
            this.navigate('home');
            return;
        }
        const total = this.calculateTotal();
        document.getElementById('mainContent').innerHTML = `
            <div class="checkout-page">
                <div class="container">
                    <h1 class="section-title" style="text-align:center;margin-bottom:40px;">إتمام الطلب</h1>
                    <div class="checkout-grid">
                        <div class="checkout-form">
                            <h2 style="margin-bottom:30px;color:#333;">معلومات الشحن</h2>
                            <form id="checkoutForm" onsubmit="app.submitOrder(event)">
                                <div class="form-group"><label class="form-label">الاسم الكامل *</label><input type="text" class="form-input" id="customerName" required placeholder="أدخل اسمك الكامل"></div>
                                <div class="form-group"><label class="form-label">رقم الهاتف *</label><input type="tel" class="form-input" id="customerPhone" required placeholder="01xxxxxxxxx"></div>
                                <div class="form-group"><label class="form-label">المحافظة *</label>
                                    <select class="form-select" id="governorate" required>
                                        <option value="">اختر المحافظة</option>
                                        <option value="القاهرة">القاهرة</option><option value="الجيزة">الجيزة</option>
                                        <option value="الإسكندرية">الإسكندرية</option><option value="الدقهلية">الدقهلية</option>
                                        <option value="الشرقية">الشرقية</option><option value="الغربية">الغربية</option>
                                        <option value="أخرى">أخرى</option>
                                    </select>
                                </div>
                                <div class="form-group"><label class="form-label">العنوان بالتفصيل *</label><textarea class="form-textarea" id="address" required placeholder="الشارع - المنطقة - أقرب معلم"></textarea></div>
                                <div class="form-group"><label class="form-label">ملاحظات إضافية</label><textarea class="form-textarea" id="notes" placeholder="أي ملاحظات خاصة بالطلب"></textarea></div>
                                <h2 style="margin:40px 0 30px;color:#333;">طريقة الدفع</h2>
                                <div class="payment-methods-checkout">
                                    <label class="payment-option active" onclick="app.selectPaymentMethod(this)">
                                        <input type="radio" name="payment" value="cod" checked>
                                        <i class="fas fa-money-bill-wave" style="color:#D4AF37;font-size:24px;"></i>
                                        <div><div style="font-weight:700;">الدفع عند الاستلام</div><div style="font-size:14px;color:#666;">ادفع عند استلام الطلب</div></div>
                                    </label>
                                    <label class="payment-option" onclick="app.selectPaymentMethod(this)">
                                        <input type="radio" name="payment" value="vodafone">
                                        <i class="fas fa-mobile-alt" style="color:#E60000;font-size:24px;"></i>
                                        <div><div style="font-weight:700;">فودافون كاش</div><div style="font-size:14px;color:#666;">010xxxxxxxx</div></div>
                                    </label>
                                    <label class="payment-option" onclick="app.selectPaymentMethod(this)">
                                        <input type="radio" name="payment" value="instapay">
                                        <i class="fas fa-university" style="color:#0066CC;font-size:24px;"></i>
                                        <div><div style="font-weight:700;">إنستاباي</div><div style="font-size:14px;color:#666;">تحويل مباشر</div></div>
                                    </label>
                                </div>
                                <button type="submit" class="btn btn-primary btn-full" style="margin-top:30px;padding:15px;"><i class="fab fa-whatsapp"></i> تأكيد الطلب عبر واتساب</button>
                            </form>
                        </div>
                        <div class="order-summary">
                            <div class="summary-title">ملخص الطلب</div>
                            ${this.cart.map(item => `
                                <div class="summary-item">
                                    <div><div style="font-weight:600;">${item.name}</div><div style="font-size:14px;color:#666;">الكمية: ${item.quantity}</div></div>
                                    <div style="color:#D4AF37;font-weight:600;">${item.price * item.quantity} ${CONFIG.store.currencySymbol}</div>
                                </div>
                            `).join('')}
                            <div class="summary-total"><span>الإجمالي:</span><span>${total} ${CONFIG.store.currencySymbol}</span></div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    renderContact() {
        document.getElementById('mainContent').innerHTML = `
            <div class="section" style="margin-top:80px;min-height:60vh;">
                <div class="container">
                    <div class="section-header"><h2 class="section-title">تواصل معنا</h2><p class="section-subtitle">نحن هنا لمساعدتك</p></div>
                    <div style="max-width:600px;margin:0 auto;background:white;padding:40px;border-radius:10px;box-shadow:var(--shadow);text-align:center;">
                        <i class="fab fa-whatsapp" style="font-size:64px;color:#25D366;margin-bottom:20px;"></i>
                        <h3 style="margin-bottom:10px;">تواصل عبر واتساب</h3>
                        <p style="color:#666;margin-bottom:30px;">للاستفسارات والطلبات</p>
                        <a href="https://wa.me/${CONFIG.store.whatsappNumber}" class="btn btn-primary btn-full" style="margin-bottom:30px;padding:15px;"><i class="fab fa-whatsapp"></i> محادثة على واتساب</a>
                        <div style="border-top:1px solid #eee;padding-top:30px;text-align:right;">
                            <div style="margin-bottom:20px;"><i class="fas fa-phone" style="color:#D4AF37;margin-left:10px;"></i><strong>الهاتف:</strong> ${CONFIG.store.whatsappNumber.replace('20', '0')}</div>
                            <div style="margin-bottom:20px;"><i class="fas fa-envelope" style="color:#D4AF37;margin-left:10px;"></i><strong>البريد:</strong> info@topwatch.com</div>
                            <div><i class="fas fa-clock" style="color:#D4AF37;margin-left:10px;"></i><strong>ساعات العمل:</strong> يومياً من 10 ص حتى 10 م</div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // ==================== Cart Functions ====================
    addToCart(productId, fromDetails = false) {
        const product = CONFIG.products.find(p => p.id === productId);
        if (!product) return;
        const qty = fromDetails ? this.quantity : 1;
        const color = fromDetails ? this.selectedColor : (product.colors ? product.colors[0] : '');
        const existing = this.cart.find(item => item.id === productId && item.color === color);

        if (existing) {
            existing.quantity += qty;
        } else {
            this.cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty, color: color });
        }
        this.saveCart();
        this.updateCartUI();
        this.showNotification('تمت الإضافة للسلة بنجاح!', 'success');
        if (!fromDetails) this.toggleCart();
    }

    removeFromCart(productId, color = null) {
        this.cart = this.cart.filter(item => color ? !(item.id === productId && item.color === color) : item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('تم الحذف من السلة', 'info');
    }

    updateQuantity(productId, color, change) {
        const item = this.cart.find(i => i.id === productId && i.color === color);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) this.removeFromCart(productId, color);
            else { this.saveCart(); this.updateCartUI(); }
        }
    }

    calculateTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    updateCartUI() {
        const countEl = document.getElementById('cartCount');
        const itemsEl = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        const footerEl = document.getElementById('cartFooter');
        const emptyEl = document.getElementById('cartEmpty');

        countEl.textContent = this.cart.reduce((s, i) => s + i.quantity, 0);

        if (this.cart.length === 0) {
            itemsEl.innerHTML = '';
            footerEl.style.display = 'none';
            emptyEl.style.display = 'block';
        } else {
            emptyEl.style.display = 'none';
            footerEl.style.display = 'block';
            itemsEl.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <button class="cart-item-remove" onclick="app.removeFromCart(${item.id}, '${item.color}')"><i class="fas fa-trash"></i></button>
                    <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        ${item.color ? `<div style="font-size:12px;color:#666;">اللون: ${item.color}</div>` : ''}
                        <div class="cart-item-price">${item.price} ${CONFIG.store.currencySymbol}</div>
                        <div class="cart-item-quantity">
                            <button onclick="app.updateQuantity(${item.id}, '${item.color}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="app.updateQuantity(${item.id}, '${item.color}', 1)">+</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        totalEl.textContent = `${this.calculateTotal()} ${CONFIG.store.currencySymbol}`;
    }

    toggleCart() {
        const sb = document.getElementById('cartSidebar');
        sb.classList.toggle('active');
        document.body.style.overflow = sb.classList.contains('active') ? 'hidden' : '';
    }

    saveCart() { localStorage.setItem('topwatch_cart', JSON.stringify(this.cart)); }
    loadCart() {
        const saved = localStorage.getItem('topwatch_cart');
        if (saved) this.cart = JSON.parse(saved);
    }

    // ==================== Product Details Utils ====================
    changeImage(src, thumb) {
        document.getElementById('mainProductImage').src = src;
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    }

    selectColor(color, el) {
        this.selectedColor = color;
        document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
        el.classList.add('active');
    }

    increaseQuantity() {
        this.quantity++;
        document.getElementById('quantityValue').textContent = this.quantity;
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
            document.getElementById('quantityValue').textContent = this.quantity;
        }
    }

    buyNow(productId) {
        this.addToCart(productId, true);
        this.navigate('checkout');
    }

    // ==================== Filtering & Search ====================
    filterByCategory(cat) {
        this.currentCategory = cat;
        this.renderHome();
        setTimeout(() => document.getElementById('productsSection')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }

    searchProducts(q) {
        this.searchQuery = q.toLowerCase();
        this.renderHome();
    }

    getFilteredProducts() {
        return CONFIG.products.filter(p => {
            const matchCat = this.currentCategory === 'all' || p.category === this.currentCategory;
            const matchQ = p.name.toLowerCase().includes(this.searchQuery) || p.description.toLowerCase().includes(this.searchQuery);
            return matchCat && matchQ;
        });
    }

    // ==================== Checkout & WhatsApp ====================
    selectPaymentMethod(el) {
        document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
        el.classList.add('active');
        el.querySelector('input').checked = true;
    }

   submitOrder(e) {
    e.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const gov = document.getElementById('governorate').value;
    const addr = document.getElementById('address').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const pay = document.querySelector('input[name="payment"]:checked').value;

    const payNames = { cod: 'الدفع عند الاستلام', vodafone: 'فودافون كاش', instapay: 'إنستاباي' };
    const total = this.calculateTotal();

    // ✅ حفظ الطلب في LocalStorage للوحة التحكم
    const newOrder = {
        id: Date.now(),
        name, phone, governorate: gov, address: addr, notes, payment: pay,
        items: this.cart.map(i => ({ name: i.name, color: i.color, quantity: i.quantity, price: i.price })),
        total: total,
        status: "pending",
        date: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem("topwatch_orders") || "[]");
    orders.push(newOrder);
    localStorage.setItem("topwatch_orders", JSON.stringify(orders));

    // ✅ إلغاء الواتساب وإظهار رسالة نجاح للمتجر
    SoundManager.playSuccess();
    this.showNotification('✅ تم استلام طلبك بنجاح! سيتم مراجعته والتواصل معك قريباً.', 'success');

    // تفريغ السلة والعودة للرئيسية
    setTimeout(() => {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.navigate('home');
    }, 2000);
}

    // ==================== Utilities ====================
    getColorCode(name) {
        const map = { 'ذهبي': '#D4AF37', 'فضي': '#C0C0C0', 'روز جولد': '#B76E79', 'بني': '#8B4513', 'أسود': '#000', 'أزرق': '#0066CC', 'أحمر': '#CC0000', 'أبيض': '#FFF', 'رمادي': '#808080', 'أخضر': '#228B22', 'برتقالي': '#FF8C00', 'وردي': '#FFB6C1' };
        return map[name] || '#D4AF37';
    }

    showNotification(msg, type = 'info') {
        const el = document.createElement('div');
        el.style.cssText = `position:fixed;top:100px;left:50%;transform:translateX(-50%);background:${type === 'success' ? '#25D366' : '#D4AF37'};color:white;padding:15px 30px;border-radius:5px;box-shadow:0 5px 20px rgba(0,0,0,0.2);z-index:9999;animation:slideDown 0.3s ease;font-weight:600;`;
        el.textContent = msg;
        document.body.appendChild(el);
        setTimeout(() => { el.style.animation = 'slideUp 0.3s ease'; setTimeout(() => el.remove(), 300); }, 3000);
    }

    toggleMobileMenu() {
        document.getElementById('mobileMenu').classList.toggle('active');
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => {
            document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
        });
        window.addEventListener('popstate', e => {
            if (e.state) this.navigate(e.state.page, e.state.params);
        });
    }

    setupLazyLoading() {
        const imgs = document.querySelectorAll('img[data-src]');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    en.target.src = en.target.dataset.src;
                    en.target.classList.add('loaded');
                    obs.unobserve(en.target);
                }
            });
        });
        imgs.forEach(img => obs.observe(img));
    }
}

// ==================== Initialize App ====================
const app = new TOPWatchApp();

// ==================== Global Sound Toggle ====================
function toggleSound() {
    const on = SoundManager.toggle();
    document.getElementById('soundIcon').className = on ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    document.getElementById('soundToggleBtn').classList.toggle('muted', !on);
    localStorage.setItem('topwatch_sound', on ? 'on' : 'off');
    if (on) SoundManager.playClick();
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('topwatch_sound') === 'off') {
        SoundManager.enabled = false;
        document.getElementById('soundIcon').className = 'fas fa-volume-mute';
        document.getElementById('soundToggleBtn').classList.add('muted');
    }
});