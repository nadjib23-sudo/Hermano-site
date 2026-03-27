// 1. مصفوفة المنتجات
const products = [
    { id: 1, name: "حذاء رياضي - أسود ملكي", price: 299, image: "https://images.unsplash.com/photo-1542291026-7ee2c9447dff?w=500", tag: "الأكثر مبيعاً" },
    { id: 2, name: "ساعة كلاسيكية فاخرة", price: 550, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", tag: null },
    { id: 3, name: "نظارات شمسية - موديل 2026", price: 180, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", tag: "خصم 20%" },
    { id: 4, name: "حقيبة ظهر جلدية", price: 420, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", tag: null }
];

// 2. مخزن السلة
let cart = [];

// 3. عرض المنتجات
function displayProducts() {
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = products.map(product => `
            <div class="product-card bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col shadow-sm">
                <div class="relative aspect-square overflow-hidden bg-gray-100">
                    ${product.tag ? `<span class="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">${product.tag}</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
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

// 4. إضافة للسلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cart.length;
    alert(`تم إضافة ${product.name} إلى السلة ✅`);
}

// 5. وظائف النافذة والقائمة
function openOrderModal() {
    if (cart.length === 0) { alert("سلتك فارغة!"); return; }
    document.getElementById('order-modal').classList.remove('hidden');
}

function closeModal() { document.getElementById('order-modal').classList.add('hidden'); }

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    }
}

// 6. تشغيل الكود عند التحميل ومعالجة إرسال البيانات لجوجل شيت
window.onload = function() {
    displayProducts();

    const form = document.getElementById('customer-form');
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "جاري تأكيد الطلب...⏳";
            submitBtn.disabled = true;

            const name = document.getElementById('full-name').value;
            const phone = document.getElementById('phone').value;
            const state = document.getElementById('state').value;
            const itemsList = cart.map(item => item.name).join(' + ');
            const total = cart.reduce((sum, item) => sum + item.price, 0);

            const data = {
                name: name,
                phone: phone,
                state: state,
                items: itemsList,
                total: total + " د.ج"
            };

            // رابط Google Script الخاص بك
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxvdJn4nIRjs9Cql3_jk-ESU27SOE6kdim-bMnDNfGWyDTdgafcpRnBmqgStzJje-NP/exec';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            })
            .then(() => {
                alert("تم استلام طلبك بنجاح! ستجده في جدول البيانات الخاص بك ✅");
                cart = [];
                document.getElementById('cart-count').innerText = "0";
                closeModal();
                form.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("حدث خطأ في الإرسال");
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        };
    }
};
