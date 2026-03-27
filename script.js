// 1. قائمة المنتجات
const products = [
    { id: 1, name: "حذاء رياضي - أسود ملكي", price: 299, image: "https://images.unsplash.com/photo-1542291026-7ee2c9447dff?w=500", tag: "الأكثر مبيعاً" },
    { id: 2, name: "ساعة كلاسيكية فاخرة", price: 550, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", tag: null },
    { id: 3, name: "نظارات شمسية - موديل 2026", price: 180, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", tag: "خصم 20%" },
    { id: 4, name: "حقيبة ظهر جلدية", price: 420, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", tag: null }
];

let cart = [];

// 2. عرض المنتجات في الصفحة الرئيسية
function displayProducts() {
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = products.map(product => `
            <div class="product-card bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col shadow-sm">
                <div class="relative aspect-square bg-gray-100">
                    <img src="${product.image}" class="w-full h-full object-cover">
                </div>
                <div class="p-6 text-right" dir="rtl">
                    <h3 class="font-bold text-lg">${product.name}</h3>
                    <p class="text-xl font-black text-blue-600 my-4">${product.price} د.ج</p>
                    <button onclick="addToCart(${product.id})" class="w-full bg-black text-white py-4 rounded-2xl transition active:scale-95">أضف للسلة 🛒</button>
                </div>
            </div>
        `).join('');
    }
}

// 3. إدارة السلة (إضافة، حذف، تحديث)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    alert(`تمت إضافة ${product.name} ✅`);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    if (cart.length === 0) {
        closeModal();
    } else {
        openOrderModal(); // إعادة تحديث القائمة داخل النافذة
    }
}

// 4. التحكم في النوافذ (Modals)
function openOrderModal() {
    if (cart.length === 0) return alert("السلة فارغة!");

    const modal = document.getElementById('order-modal');
    const itemsListContainer = document.getElementById('cart-items-list');
    
    // حساب المجموع وعرض المنتجات مع زر الحذف
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    if (itemsListContainer) {
        itemsListContainer.innerHTML = `
            <p class="text-sm font-bold mb-3 text-gray-500">المنتجات المختارة:</p>
            ${cart.map((item, index) => `
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-xl mb-2 border border-gray-100" dir="rtl">
                    <span class="text-sm font-medium">${item.name} (${item.price} د.ج)</span>
                    <button onclick="removeFromCart(${index})" class="text-red-500 text-xs font-bold border border-red-100 px-2 py-1 rounded-lg hover:bg-red-50">حذف</button>
                </div>
            `).join('')}
            <div class="border-t mt-4 pt-3 flex justify-between font-bold text-blue-600">
                <span>المجموع الإجمالي:</span>
                <span>${total} د.ج</span>
            </div>
        `;
    }
    
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('order-modal').classList.add('hidden');
}

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
}

// 5. إرسال البيانات لجوجل شيت عند تحميل الصفحة
window.onload = function() {
    displayProducts();
    const form = document.getElementById('customer-form');

    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerText = "جاري الحفظ...⏳";
            submitBtn.disabled = true;

            const data = {
                name: document.getElementById('full-name').value,
                phone: document.getElementById('phone').value,
                state: document.getElementById('state').value,
                items: cart.map(item => item.name).join(' + '),
                total: cart.reduce((sum, item) => sum + item.price, 0) + " د.ج"
            };

            const scriptURL = 'https://script.google.com/macros/s/AKfycbxvdJn4nIRjs9Cql3_jk-ESU27SOE6kdim-bMnDNfGWyDTdgafcpRnBmqgStzJje-NP/exec';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            })
            .then(() => {
                alert("شكراً لك! تم استلام طلبك بنجاح ✅");
                cart = [];
                updateCartCount();
                closeModal();
                form.reset();
                submitBtn.innerText = "تأكيد الطلب";
                submitBtn.disabled = false;
            })
            .catch(() => {
                alert("عذراً، حدث خطأ أثناء الإرسال.");
                submitBtn.disabled = false;
            });
        };
    }
};
