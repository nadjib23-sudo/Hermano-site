// 1. مصفوفة المنتجات
const products = [
    { id: 1, name: "حذاء رياضي - أسود ملكي", price: 299, image: "https://images.unsplash.com/photo-1542291026-7ee2c9447dff?w=500", tag: "الأكثر مبيعاً" },
    { id: 2, name: "ساعة كلاسيكية فاخرة", price: 550, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", tag: null },
    { id: 3, name: "نظارات شمسية - موديل 2026", price: 180, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", tag: "خصم 20%" },
    { id: 4, name: "حقيبة ظهر جلدية", price: 420, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", tag: null }
];

// 2. متغير السلة
let cart = [];

// 3. وظيفة عرض المنتجات في الصفحة
function displayProducts() {
    const grid = document.getElementById('product-grid');
    if(grid) {
        grid.innerHTML = products.map(product => `
            <div class="product-card bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col shadow-sm hover:shadow-xl transition-all">
                <div class="relative aspect-square overflow-hidden bg-gray-100">
                    ${product.tag ? `<span class="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">${product.tag}</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform hover:scale-110 transition duration-500">
                </div>
                <div class="p-6 flex flex-col flex-grow text-right" dir="rtl">
                    <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                    <p class="text-xl font-black mb-6 text-blue-600">${product.price} د.ج</p>
                    <button onclick="addToCart(${product.id})" class="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition active:scale-95">أضف للسلة 🛒</button>
                </div>
            </div>
        `).join('');
    }
}

// 4. وظيفة إضافة منتج للسلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    // إظهار تنبيه بسيط
    alert(`تم إضافة ${product.name} للسلة`);
}

// 5. تحديث واجهة السلة (العداد)
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = cart.length;
}

// 6. وظائف النوافذ (Modal)
function openOrderModal() {
    if(cart.length === 0) {
        alert("سلتك فارغة! أضف بعض المنتجات أولاً.");
        return;
    }
    document.getElementById('order-modal').classList.remove('hidden');
}

function closeOrderModal() {
    document.getElementById('order-modal').classList.add('hidden');
}

// 7. إرسال الطلب (يشمل محتوى السلة)
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    const form = document.getElementById('customer-form');
    if(form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const name = document.getElementById('full-name').value;
            const phone = document.getElementById('phone').value;
            const state = document.getElementById('state').value;
            
            // تجميع محتوى السلة في نص
            const cartItems = cart.map(item => `- ${item.name} (${item.price} د.ج)`).join('%0A');
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            
            const message = `طلب جديد من Hermano 🛒%0A%0A` +
                            `👤 الاسم: ${name}%0A` +
                            `📞 الهاتف: ${phone}%0A` +
                            `📍 الولاية: ${state}%0A%0A` +
                            `📦 الطلبية:%0A${cartItems}%0A%0A` +
                            `💰 الإجمالي: ${total} د.ج`;
            
            window.open(`https://wa.me/213664603307?text=${message}`, '_blank');
        };
    }
});

// وظيفة القائمة الجانبية
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}
