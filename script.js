// 1. قاعدة بيانات المنتجات (يمكنك تغيير الأسماء والأسعار والصور هنا)
const products = [
    { id: 1, name: "حذاء رياضي - أسود ملكي", price: 299, image: "https://images.unsplash.com/photo-1542291026-7ee2c9447dff?w=500", tag: "الأكثر مبيعاً" },
    { id: 2, name: "ساعة كلاسيكية فاخرة", price: 550, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", tag: null },
    { id: 3, name: "نظارات شمسية - موديل 2026", price: 180, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", tag: "خصم 20%" },
    { id: 4, name: "حقيبة ظهر جلدية", price: 420, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", tag: null }
];

let cart = [];

// 2. وظيفة عرض المنتجات في الواجهة الرئيسية
function displayProducts() {
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = products.map(product => `
            <div class="product-card bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col shadow-sm transform transition hover:shadow-md">
                <div class="relative aspect-square bg-gray-100 overflow-hidden">
                    ${product.tag ? `<span class="absolute top-4 right-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">${product.tag}</span>` : ''}
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform hover:scale-105 transition duration-500">
                </div>
                <div class="p-6 text-right" dir="rtl">
                    <h3 class="font-bold text-lg text-gray-800">${product.name}</h3>
                    <p class="text-xl font-black text-blue-600 my-4">${product.price} د.ج</p>
                    <button onclick="addToCart(${product.id})" class="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition active:scale-95 shadow-lg shadow-gray-200">أضف للسلة 🛒</button>
                </div>
            </div>
        `).join('');
    }
}

// 3. إدارة عمليات السلة (إضافة، حذف، تحديث العداد)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
    
    // تأثير بصري بسيط للأيقونة
    const icon = document.getElementById('cart-icon');
    icon.classList.add('scale-125');
    setTimeout(() => icon.classList.remove('scale-125'), 200);
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    if (cart.length === 0) {
        closeModal();
        alert("السلة فارغة الآن 🛒");
    } else {
        openOrderModal(); // لتحديث القائمة فوراً بعد الحذف
    }
}

// 4. وظيفة فتح نافذة الطلب وعرض المحتويات
function openOrderModal() {
    if (cart.length === 0) {
        alert("سلتك فارغة! أضف منتجات لتتمكن من رؤيتها 🛒");
        return;
    }

    const modal = document.getElementById('order-modal');
    const listContainer = document.getElementById('cart-items-list');
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    if (listContainer) {
        listContainer.innerHTML = `
            <p class="text-sm font-bold text-gray-400 mb-3 text-right">محتويات سلتك:</p>
            ${cart.map((item, index) => `
                <div class="flex justify-between items-center bg-gray-50 p-3 rounded-2xl mb-2 border border-gray-100" dir="rtl">
                    <div class="flex flex-col">
                        <span class="text-sm font-bold text-gray-800">${item.name}</span>
                        <span class="text-xs text-blue-600">${item.price} د.ج</span>
                    </div>
                    <button onclick="removeFromCart(${index})" class="text-red-500 p-2 hover:bg-red-50 rounded-xl transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            `).join('')}
            <div class="mt-4 pt-3 border-t-2 border-dashed border-gray-100 flex justify-between font-black text-gray-800 px-1">
                <span>الإجمالي الكلي:</span>
                <span class="text-blue-600">${total} د.ج</span>
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

// 5. معالجة إرسال البيانات إلى Google Sheets
window.onload = function() {
    displayProducts();
    const form = document.getElementById('customer-form');

    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerText = "جاري تأكيد الطلب...⏳";
            submitBtn.disabled = true;

            const data = {
                name: document.getElementById('full-name').value,
                phone: document.getElementById('phone').value,
                state: document.getElementById('state').value,
                items: cart.map(item => item.name).join(' + '),
                total: cart.reduce((sum, item) => sum + item.price, 0) + " د.ج"
            };

            // رابط Google Script الخاص بك (تأكد من أنه الرابط الصحيح)
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxvdJn4nIRjs9Cql3_jk-ESU27SOE6kdim-bMnDNfGWyDTdgafcpRnBmqgStzJje-NP/exec';

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data)
            })
            .then(() => {
                alert("تم استلام طلبك بنجاح! شكراً لثقتكم بمجر Hermano ✅");
                cart = [];
                updateCartUI();
                closeModal();
                form.reset();
                submitBtn.innerText = "تأكيد الطلب";
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("عذراً، حدث خطأ. حاول مرة أخرى.");
                submitBtn.disabled = false;
                submitBtn.innerText = "تأكيد الطلب";
            });
        };
    }
};
