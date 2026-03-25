// بيانات المنتجات التجريبية
const products = [
    {
        id: 1,
        name: "حذاء رياضي - أسود ملكي",
        price: 299,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        tag: "الأكثر مبيعاً"
    },
    {
        id: 2,
        name: "ساعة كلاسيكية فاخرة",
        price: 550,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        tag: null
    },
    {
        id: 3,
        name: "نظارات شمسية - موديل 2026",
        price: 180,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        tag: "خصم 20%"
    },
    {
        id: 4,
        name: "حقيبة ظهر جلدية",
        price: 420,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
        tag: null
    }
];

// وظيفة عرض المنتجات
function displayProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col">
            <div class="relative aspect-square overflow-hidden bg-gray-100">
                ${product.tag ? `<span class="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">${product.tag}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                <p class="text-xl font-black mb-6">${product.price} ر.س</p>
                <button onclick="addToCart()" class="btn-add-cart mt-auto w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition flex justify-center items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    أضف للسلة
                </button>
            </div>
        </div>
    `).join('');
}

// وظيفة إضافة للسلة (محاكاة)
let count = 0;
function addToCart() {
    count++;
    document.getElementById('cart-count').innerText = count;
    
    // تأثير بصري بسيط عند الإضافة
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.classList.add('scale-125', 'text-blue-600');
    setTimeout(() => {
        cartIcon.classList.remove('scale-125', 'text-blue-600');
    }, 200);
}

// تشغيل الوظائف عند تحميل الصفحة
window.onload = displayProducts;
