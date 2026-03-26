// بيانات المنتجات
const products = [
    { id: 1, name: "حذاء رياضي - أسود ملكي", price: 299, image: "https://images.unsplash.com/photo-1542291026-7ee2c9447dff?w=500", tag: "الأكثر مبيعاً" },
    { id: 2, name: "ساعة كلاسيكية فاخرة", price: 550, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", tag: null },
    { id: 3, name: "نظارات شمسية - موديل 2026", price: 180, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", tag: "خصم 20%" },
    { id: 4, name: "حقيبة ظهر جلدية", price: 420, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", tag: null }
];

// وظيفة عرض المنتجات
function displayProducts() {
    const grid = document.getElementById('product-grid');
    if(grid) {
        grid.innerHTML = products.map(product => `
            <div class="product-card bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col">
                <div class="relative aspect-square overflow-hidden bg-gray-100">
                    ${product.tag ? `<span class="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">${product.tag}</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                    <p class="text-xl font-black mb-6">${product.price} د.ج</p>
                    <button onclick="openOrderModal()" class="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition">طلب الآن</button>
                </div>
            </div>
        `).join('');
    }
}

// وظائف النافذة المنبثقة (Modal)
function openOrderModal() { document.getElementById('order-modal').classList.remove('hidden'); }
function closeOrderModal() { document.getElementById('order-modal').classList.add('hidden'); }

// وظيفة فتح وإغلاق قائمة الجوال
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
    } else {
        menu.classList.remove('flex');
        menu.classList.add('hidden');
    }
}

// معالجة إرسال النموذج للواتساب
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    const form = document.getElementById('customer-form');
    if(form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            const name = document.getElementById('full-name').value;
            const phone = document.getElementById('phone').value;
            const state = document.getElementById('state').value;
            const myNumber = "213664603307";
            const message = `طلب جديد من Hermano🛒%0Aالاسم: ${name}%0Aالهاتف: ${phone}%0Aالولاية: ${state}`;
            window.open(`https://wa.me/${myNumber}?text=${message}`, '_blank');
        };
    }
});
