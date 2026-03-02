document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progress = document.querySelector('.progress');

    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            showWelcomeMessage();
        } else {
            width += Math.random() * 20;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
        }
    }, 300);

    function showWelcomeMessage() {
        // Hide pencil and progress bar when done
        const pencil = document.querySelector('.pencil');
        const loadingBar = document.querySelector('.loading-bar');

        if (pencil) pencil.style.opacity = '0';
        if (loadingBar) loadingBar.style.opacity = '0';

        // Show logo, title and subtitle
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.classList.add('show-welcome');
        }

        // Wait a few seconds for user to read the message, then enter site
        setTimeout(completeLoading, 2500);
    }

    function completeLoading() {
        loadingScreen.style.transform = 'translateY(-100%)';
        mainContent.classList.remove('hidden');

        // Add reveal animations for main content elements
        setTimeout(() => {
            revealContent();
        }, 300);
    }

    function revealContent() {
        const elements = [
            '.nav-logo',
            '.nav-actions',
            '.hero-tag',
            '.hero-title',
            '.hero-image',
            '.hero-footer',
            '.breadcrumb',
            '.sidebar',
            '.products-grid'
        ];

        elements.forEach((selector, index) => {
            const el = document.querySelector(selector);
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;

                requestAnimationFrame(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }
        });
    }

    // Interactive elements
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('mousedown', () => {
            ctaBtn.style.transform = 'scale(0.95)';
        });
        ctaBtn.addEventListener('mouseup', () => {
            ctaBtn.style.transform = 'scale(1)';
        });
    }

    // Scroll parallax effect for hero image
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-image img');
        if (heroImg) {
            heroImg.style.transform = `rotate(${-15 + scrolled * 0.05}deg) translateY(${scrolled * 0.2}px)`;
        }
    });

    // --- New Functionality: Auth Modal & Price Explorer ---

    // Auth Modal Elements
    const authModal = document.getElementById('auth-modal');
    const authContainer = document.querySelector('.auth-container');
    const profileBtn = document.getElementById('profile-btn');
    const authClose = document.getElementById('auth-close');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');

    function updateProfileState() {
        if (localStorage.getItem('currentUser')) {
            profileBtn.innerHTML = `<i class='bx bxs-user-check' style="font-size: 24px; color: #8d6e63;"></i>`;
        } else {
            profileBtn.innerHTML = `<i class='bx bxs-user-circle' style="font-size: 24px;"></i>`;
        }
    }

    updateProfileState();

    // Toggle Modal and Handle Logout
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            if (localStorage.getItem('currentUser')) {
                if (confirm('Are you sure you want to log out?')) {
                    localStorage.removeItem('currentUser');
                    updateProfileState();
                }
            } else {
                authModal.style.display = 'flex';
                setTimeout(() => authModal.classList.add('active'), 10);
            }
        });
    }

    // Handle Login/Register Forms
    const authForms = document.querySelectorAll('.form-box form');
    authForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = form.querySelector('input[type="text"]');
            if (usernameInput && usernameInput.value) {
                localStorage.setItem('currentUser', usernameInput.value);
                updateProfileState();

                // Hide modal gracefully
                authModal.classList.remove('active');
                setTimeout(() => authModal.style.display = 'none', 500);
            }
        });
    });

    if (authClose) {
        authClose.addEventListener('click', () => {
            authModal.classList.remove('active');
            setTimeout(() => authModal.style.display = 'none', 500);
        });
    }

    // Toggle Login/Register inside modal
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            authContainer.classList.add('active');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            authContainer.classList.remove('active');
        });
    }

    // --- Product Catalog + Search ---
    const productsGrid = document.getElementById('products-grid');
    const productSearchInput = document.getElementById('product-search');
    const brandFilterInputs = document.querySelectorAll('.brand-filter');
    const priceFilterInputs = document.querySelectorAll('.price-filter');

    const shoeImageUrls = [
        "https://i.postimg.cc/fb31w01w/img1.jpg",
        "https://i.postimg.cc/jSSGF1XQ/img101.jpg",
        "https://i.postimg.cc/3xxPcqBZ/img104.jpg",
        "https://i.postimg.cc/qvD9VGbC/img107.jpg",
        "https://i.postimg.cc/q7tWkCWM/img11.jpg",
        "https://i.postimg.cc/sgHtdJ6W/img110.jpg",
        "https://i.postimg.cc/mgp0fSXH/img113.jpg",
        "https://i.postimg.cc/qvD9VGbQ/img129.jpg",
        "https://i.postimg.cc/Bn7d9CYh/img132.jpg",
        "https://i.postimg.cc/FHC25xWg/img135.jpg",
        "https://i.postimg.cc/GmgZwj7K/img138.jpg",
        "https://i.postimg.cc/wBtn6sn7/img14.jpg",
        "https://i.postimg.cc/HkvfDtZ6/img141.jpg",
        "https://i.postimg.cc/T3NZMc77/img144.jpg",
        "https://i.postimg.cc/6pbDJhjb/img147.jpg",
        "https://i.postimg.cc/Bn7d9CYk/img150.jpg",
        "https://i.postimg.cc/mgp0fSXn/img153.jpg",
        "https://i.postimg.cc/0j1TX2Wx/img156.jpg",
        "https://i.postimg.cc/cCGpk49d/img160.jpg",
        "https://i.postimg.cc/6qxkb5j9/img163.jpg",
        "https://i.postimg.cc/4yRD2NLf/img166.jpg",
        "https://i.postimg.cc/mkWvp2XZ/img169.jpg",
        "https://i.postimg.cc/C5p3rLPx/img172.jpg",
        "https://i.postimg.cc/d3cbNtH1/img175.jpg",
        "https://i.postimg.cc/GtPZWwVd/img178.jpg",
        "https://i.postimg.cc/kGNk03z5/img181.jpg",
        "https://i.postimg.cc/mk30vfJk/img184.jpg",
        "https://i.postimg.cc/GtPZWwV9/img187.jpg",
        "https://i.postimg.cc/8khQJMcs/img191.jpg",
        "https://i.postimg.cc/SQWF2CRz/img194.jpg",
        "https://i.postimg.cc/MZy2MVHR/img197.jpg",
        "https://i.postimg.cc/qqc9PVS8/img200.jpg",
        "https://i.postimg.cc/DfqkJL0Z/img203.jpg",
        "https://i.postimg.cc/DfqkJL01/img206.jpg",
        "https://i.postimg.cc/RCc56KhK/img209.jpg",
        "https://i.postimg.cc/xTnrK8Ns/img212.jpg",
        "https://i.postimg.cc/TYf8r15r/img215.jpg",
        "https://i.postimg.cc/rFM6SsRN/img218.jpg",
        "https://i.postimg.cc/15sxpXV0/img222.jpg",
        "https://i.postimg.cc/Nf43btRJ/img231.jpg",
        "https://i.postimg.cc/WbnBSVM2/img240.jpg",
        "https://i.postimg.cc/CLN3J0jM/img243.jpg",
        "https://i.postimg.cc/V6tyFbFD/img246.jpg",
        "https://i.postimg.cc/qRKfGCGQ/img249.jpg",
        "https://i.postimg.cc/76zvNTNK/img253.jpg",
        "https://i.postimg.cc/wvNKkskf/img256.jpg",
        "https://i.postimg.cc/Twb8cWcH/img259.jpg",
        "https://i.postimg.cc/XJ5Mgygz/img262.jpg",
        "https://i.postimg.cc/63ZshGhb/img265.jpg",
        "https://i.postimg.cc/Twb8cWcF/img268.jpg",
        "https://i.postimg.cc/Qt7LqWqv/img271.jpg",
        "https://i.postimg.cc/DZGVcbct/img274.jpg",
        "https://i.postimg.cc/Ss90GzGB/img277.jpg",
        "https://i.postimg.cc/MTBkYjD2/img280.jpg",
        "https://i.postimg.cc/Bbfr7QhY/img284.jpg",
        "https://i.postimg.cc/ZnzGsKff/img287.jpg",
        "https://i.postimg.cc/K8pdS5q6/img29.jpg",
        "https://i.postimg.cc/3NQsfJLq/img290.jpg",
        "https://i.postimg.cc/gjbCtkMf/img296.jpg",
        "https://i.postimg.cc/PJngVr6g/img299.jpg",
        "https://i.postimg.cc/Kjh6pvqS/img302.jpg",
        "https://i.postimg.cc/VvPxZLGP/img305.jpg",
        "https://i.postimg.cc/WzcBYbWv/img308.jpg",
        "https://i.postimg.cc/SKJbJPY0/img311.jpg",
        "https://i.postimg.cc/YShBhPLK/img315.jpg",
        "https://i.postimg.cc/nLCfCW9J/img318.jpg",
        "https://i.postimg.cc/vZ2pFv2R/img32.jpg",
        "https://i.postimg.cc/R0NxNYJz/img321.jpg",
        "https://i.postimg.cc/7LfrfRJr/img324.jpg",
        "https://i.postimg.cc/cJrGrztZ/img327.jpg",
        "https://i.postimg.cc/9frHrkwX/img330.jpg",
        "https://i.postimg.cc/k5BPBHRX/img333.jpg",
        "https://i.postimg.cc/VNdPdh0k/img336.jpg",
        "https://i.postimg.cc/3wdQdq0w/img339.jpg",
        "https://i.postimg.cc/QMwG5qcZ/img342.jpg",
        "https://i.postimg.cc/QMwG5qcr/img346.jpg",
        "https://i.postimg.cc/fbpnXvYs/img349.jpg",
        "https://i.postimg.cc/tgwQPzFC/img352.jpg",
        "https://i.postimg.cc/43qkt1pJ/img355.jpg",
        "https://i.postimg.cc/xdhDHPLj/img358.jpg",
        "https://i.postimg.cc/RZpj5Tp5/img36.jpg",
        "https://i.postimg.cc/25MRvxnS/img361.jpg",
        "https://i.postimg.cc/25MRvxny/img364.jpg",
        "https://i.postimg.cc/GpVwYjv4/img367.jpg",
        "https://i.postimg.cc/Bvk9DC2L/img371.jpg",
        "https://i.postimg.cc/DzHksc11/img374.jpg",
        "https://i.postimg.cc/JhvVJQjZ/img378.jpg",
        "https://i.postimg.cc/JhvVJQjc/img381.jpg",
        "https://i.postimg.cc/zf6ZWkTF/img384.jpg",
        "https://i.postimg.cc/gJh9K6K6/img387.jpg",
        "https://i.postimg.cc/HLJFp7RS/img39.jpg",
        "https://i.postimg.cc/G2D0jsjG/img390.jpg",
        "https://i.postimg.cc/fLd4v0vx/img393.jpg",
        "https://i.postimg.cc/B6FWC1CT/img396.jpg",
        "https://i.postimg.cc/hjmF070r/img399.jpg",
        "https://i.postimg.cc/rwhLyTm5/img402.jpg",
        "https://i.postimg.cc/HkSCWmxz/img405.jpg",
        "https://i.postimg.cc/RZPzCmF1/img409.jpg",
        "https://i.postimg.cc/L8yM4SXT/img412.jpg",
        "https://i.postimg.cc/pL0tVvTY/img415.jpg",
        "https://i.postimg.cc/8zyVkG5K/img418.jpg",
        "https://i.postimg.cc/wBtn6sZb/img42.jpg",
        "https://i.postimg.cc/XY20NWJz/img421.jpg",
        "https://i.postimg.cc/0ytq5vQ3/img424.jpg",
        "https://i.postimg.cc/wB7Y7ryQ/img427.jpg",
        "https://i.postimg.cc/vmcwcKgP/img430.jpg",
        "https://i.postimg.cc/mrtWtnz8/img433.jpg",
        "https://i.postimg.cc/mrtWtnzV/img436.jpg",
        "https://i.postimg.cc/Dz838NJx/img440.jpg",
        "https://i.postimg.cc/k5BPBH6h/img443.jpg",
        "https://i.postimg.cc/s2vCvLQN/img446.jpg",
        "https://i.postimg.cc/q7zHzFhS/img449.jpg",
        "https://i.postimg.cc/pd932n46/img45.jpg",
        "https://i.postimg.cc/25VNVtbP/img452.jpg",
        "https://i.postimg.cc/W4Dx2JCQ/img48.jpg",
        "https://i.postimg.cc/FKfw9JwF/img5.jpg",
        "https://i.postimg.cc/rpd78t3B/img57.jpg",
        "https://i.postimg.cc/pd932n3t/img63.jpg",
        "https://i.postimg.cc/yNJ2VS2K/img67.jpg",
        "https://i.postimg.cc/7LCjxTjw/img70.jpg",
        "https://i.postimg.cc/SxxwvPrj/img73.jpg",
        "https://i.postimg.cc/MKDCtwyG/img76.jpg",
        "https://i.postimg.cc/httH5YrD/img79.jpg",
        "https://i.postimg.cc/q7tWkCWJ/img8.jpg",
        "https://i.postimg.cc/cLLVbzmv/img82.jpg",
        "https://i.postimg.cc/6ppDmP0y/img85.jpg",
        "https://i.postimg.cc/Z551MQcB/img88.jpg",
        "https://i.postimg.cc/HkkfhN2y/img91.jpg",
        "https://i.postimg.cc/MpphFLD7/img94.jpg",
        "https://i.postimg.cc/7ZZpWRVg/img98.jpg"
    ];

    // Remove known non-shoe/wrong images from the product feed.
    const blockedImageUrls = new Set([
        "https://i.postimg.cc/Bvk9DC2L/img371.jpg"
    ]);

    const cleanShoeImageUrls = shoeImageUrls.filter((url) => !blockedImageUrls.has(url));

    const brands = ['ENV Creations', 'Nike', 'Adidas', 'Puma'];

    const shoeCatalog = cleanShoeImageUrls.map((image, index) => {
        const salePrice = 599 + ((index * 73) % 2100);

        if (index === 0) {
            return {
                name: 'adidas samba atoms',
                brand: 'Adidas',
                image,
                salePrice: 1199,
                originalPrice: 1599
            };
        }

        if (index === 1) {
            return {
                name: 'boots',
                brand: 'boots',
                image,
                salePrice: 1599,
                originalPrice: 1999
            };
        }

        const generatedName = `Malabar Kicks ${String(index + 1).padStart(3, '0')}`;

        const targetNames = [
            'Malabar Kicks 090', 'Malabar Kicks 005', 'Malabar Kicks 123',
            'Malabar Kicks 067', 'Malabar Kicks 012', 'Malabar Kicks 101',
            'Malabar Kicks 112', 'Malabar Kicks 114', 'Malabar Kicks 057',
            'Malabar Kicks 116', 'Malabar Kicks 081'
        ];

        if (targetNames.includes(generatedName)) {
            return {
                name: 'NEW BALANCE 9060',
                brand: 'New Balance',
                image,
                salePrice: 1599,
                originalPrice: 1999
            };
        }

        const nb1699TargetNames = [
            'Malabar Kicks 026', 'Malabar Kicks 027', 'Malabar Kicks 028',
            'Malabar Kicks 029', 'Malabar Kicks 030', 'Malabar Kicks 031'
        ];

        if (nb1699TargetNames.includes(generatedName)) {
            return {
                name: 'NEW BALANCE 1699',
                brand: 'New Balance',
                image,
                salePrice: 1699,
                originalPrice: 1999
            };
        }

        const converse90TargetNames = [
            'Malabar Kicks 055', 'Malabar Kicks 056', 'Malabar Kicks 059',
            'Malabar Kicks 060', 'Malabar Kicks 063'
        ];

        if (converse90TargetNames.includes(generatedName)) {
            return {
                name: 'converse 90',
                brand: 'Converse',
                image,
                salePrice: 1999,
                originalPrice: 2499
            };
        }

        const nikeVomeroTargetNames = [
            'Malabar Kicks 061', 'Malabar Kicks 062', 'Malabar Kicks 064',
            'Malabar Kicks 066', 'Malabar Kicks 086', 'Malabar Kicks 087',
            'Malabar Kicks 088'
        ];

        if (nikeVomeroTargetNames.includes(generatedName)) {
            return {
                name: 'nike VOMERO',
                brand: 'Nike',
                image,
                salePrice: 1999,
                originalPrice: 2499
            };
        }

        const nb9060v2TargetNames = [
            'Malabar Kicks 089', 'Malabar Kicks 091', 'Malabar Kicks 092',
            'Malabar Kicks 093', 'Malabar Kicks 065', 'Malabar Kicks 094',
            'Malabar Kicks 095', 'Malabar Kicks 070'
        ];

        if (nb9060v2TargetNames.includes(generatedName)) {
            return {
                name: 'NEW BALANCE 9060',
                brand: 'New Balance',
                image,
                salePrice: 1799,
                originalPrice: 2199
            };
        }

        const nikeSBTargetNames = ['Malabar Kicks 117', 'Malabar Kicks 118'];
        if (nikeSBTargetNames.includes(generatedName)) {
            return {
                name: 'Nike sb dunk derby',
                brand: 'Nike',
                image,
                salePrice: 2499,
                originalPrice: 2999
            };
        }

        const adidasSambaTargetNames = ['Malabar Kicks 115'];
        if (adidasSambaTargetNames.includes(generatedName)) {
            return {
                name: 'adidas samba atoms',
                brand: 'Adidas',
                image,
                salePrice: 1199,
                originalPrice: 1599
            };
        }

        const onitsukaTigerTargetNames = [
            'Malabar Kicks 003', 'Malabar Kicks 124', 'Malabar Kicks 125',
            'Malabar Kicks 126', 'Malabar Kicks 127', 'Malabar Kicks 075',
            'Malabar Kicks 076'
        ];

        if (onitsukaTigerTargetNames.includes(generatedName)) {
            return {
                name: 'Onitsuka Tiger',
                brand: 'Onitsuka Tiger',
                image,
                salePrice: 1599,
                originalPrice: 1999
            };
        }

        const pumaSpeedCatTargetNames = [
            'Malabar Kicks 004', 'Malabar Kicks 006', 'Malabar Kicks 007',
            'Malabar Kicks 128'
        ];

        if (pumaSpeedCatTargetNames.includes(generatedName)) {
            return {
                name: 'puma speed cat',
                brand: 'Puma',
                image,
                salePrice: 1599,
                originalPrice: 1999
            };
        }

        const adidasSambaBasicTargetNames = ['Malabar Kicks 119', 'Malabar Kicks 120'];
        if (adidasSambaBasicTargetNames.includes(generatedName)) {
            return {
                name: 'adidas samba basic',
                brand: 'Adidas',
                image,
                salePrice: 1699,
                originalPrice: 1999
            };
        }

        const pumaNewTargetNames = ['Malabar Kicks 121', 'Malabar Kicks 122'];
        if (pumaNewTargetNames.includes(generatedName)) {
            return {
                name: 'puma',
                brand: 'Puma',
                image,
                salePrice: 2499,
                originalPrice: 2999
            };
        }

        const nikeStussyTargetNames = ['Malabar Kicks 008', 'Malabar Kicks 009'];
        if (nikeStussyTargetNames.includes(generatedName)) {
            return {
                name: 'nike sb dunk STUSSY',
                brand: 'Nike',
                image,
                salePrice: 999,
                originalPrice: 1499
            };
        }

        const nikeSbDunkTargetNames = [
            'Malabar Kicks 010', 'Malabar Kicks 011', 'Malabar Kicks 013',
            'Malabar Kicks 014', 'Malabar Kicks 017'
        ];
        if (nikeSbDunkTargetNames.includes(generatedName)) {
            return {
                name: 'Nike sb dunk',
                brand: 'Nike',
                image,
                salePrice: 1399,
                originalPrice: 1799
            };
        }

        const nikeP6000TargetNames = [
            'Malabar Kicks 032', 'Malabar Kicks 033', 'Malabar Kicks 034',
            'Malabar Kicks 035', 'Malabar Kicks 036', 'Malabar Kicks 037',
            'Malabar Kicks 038'
        ];
        if (nikeP6000TargetNames.includes(generatedName)) {
            return {
                name: 'nike p6000',
                brand: 'Nike',
                image,
                salePrice: 1699,
                originalPrice: 2099
            };
        }

        const bootsTargetNames = ['Malabar Kicks 129'];
        if (bootsTargetNames.includes(generatedName)) {
            return {
                name: 'boots',
                brand: 'boots',
                image,
                salePrice: 1599,
                originalPrice: 1999
            };
        }

        const nikeBlackStussyTargetNames = ['Malabar Kicks 039', 'Malabar Kicks 068', 'Malabar Kicks 069'];
        if (nikeBlackStussyTargetNames.includes(generatedName)) {
            return {
                name: 'nike black STUSSY',
                brand: 'Nike',
                image,
                salePrice: 999,
                originalPrice: 1499
            };
        }

        return {
            name: generatedName,
            brand: brands[index % brands.length],
            image,
            salePrice,
            originalPrice: salePrice + 400
        };
    });

    function formatINR(amount) {
        return `₹${Number(amount).toLocaleString('en-IN')}`;
    }

    function renderProducts(products) {
        if (!productsGrid) return;

        if (!products.length) {
            productsGrid.innerHTML = `
                <p style="grid-column: 1 / -1; text-align:center; color:#777; padding: 28px 0;">
                    No shoes added yet. Upload the PDF file here and I will add every shoe from it.
                </p>
            `;
            return;
        }

        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p class="product-brand">Brand: ${product.brand}</p>
                    <div class="price-row">
                        <span class="sale-price">${formatINR(product.salePrice)}</span>
                        <span class="original-price">${formatINR(product.originalPrice)}</span>
                    </div>
                    <div class="product-actions">
                        <button class="cta-btn buy-now-btn">Buy Now</button>
                        <button class="add-to-cart-btn"><i class='bx bx-cart-add'></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function getCheckedValues(inputs) {
        return Array.from(inputs)
            .filter((input) => input.checked)
            .map((input) => input.value);
    }

    function matchesPriceFilters(price, selectedRanges) {
        if (!selectedRanges.length) return true;

        return selectedRanges.some((range) => {
            if (range === 'below-500') return price < 500;
            if (range === '500-1000') return price >= 500 && price <= 1000;
            if (range === '1000-1500') return price >= 1000 && price <= 1500;
            if (range === '1500-2000') return price >= 1500 && price <= 2000;
            if (range === 'above-2000') return price > 2000;
            return false;
        });
    }

    function filterProducts(query) {
        const cleanedQuery = query.trim().toLowerCase();
        const selectedBrands = getCheckedValues(brandFilterInputs).map((value) => value.toLowerCase());
        const selectedPriceRanges = getCheckedValues(priceFilterInputs);

        return shoeCatalog.filter((product) => {
            const name = product.name.toLowerCase();
            const brand = product.brand.toLowerCase();
            const sale = String(product.salePrice);
            const original = String(product.originalPrice);
            const matchesSearch = !cleanedQuery || (
                name.includes(cleanedQuery) ||
                brand.includes(cleanedQuery) ||
                sale.includes(cleanedQuery) ||
                original.includes(cleanedQuery)
            );
            const matchesBrand = !selectedBrands.length || selectedBrands.includes(brand);
            const matchesPrice = matchesPriceFilters(product.salePrice, selectedPriceRanges);

            return matchesSearch && matchesBrand && matchesPrice;
        });
    }

    function applyCatalogFilters() {
        const query = productSearchInput ? productSearchInput.value : '';
        const filtered = filterProducts(query)
            .slice()
            .sort((a, b) => a.salePrice - b.salePrice);
        renderProducts(filtered);
    }

    if (productSearchInput) {
        productSearchInput.addEventListener('input', applyCatalogFilters);
    }

    brandFilterInputs.forEach((input) => {
        input.addEventListener('change', applyCatalogFilters);
    });

    priceFilterInputs.forEach((input) => {
        input.addEventListener('change', applyCatalogFilters);
    });

    applyCatalogFilters();

    // Close modal on outside click (Auth Modal)
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
            setTimeout(() => authModal.style.display = 'none', 500);
        }
    });

    // --- New Functionality: Order Modal & GSAP Truck Button ---
    const orderModal = document.getElementById('order-modal');
    const orderClose = document.getElementById('order-close');
    const orderForm = document.getElementById('order-form');
    const orderShoeNameInput = document.getElementById('order-shoe-name');

    // Open order modal when clicking Buy Now (supports dynamically rendered cards)
    document.addEventListener('click', (e) => {
        const buyBtn = e.target.closest('.buy-now-btn, .hero .cta-btn');
        if (!buyBtn) return;

        e.preventDefault();
        let shoeName = "Featured Excellence Collection";
        const productCard = buyBtn.closest('.product-card');
        if (productCard) {
            shoeName = productCard.querySelector('h4').textContent;
        } else if (buyBtn.closest('.hero')) {
            shoeName = "New Season Excellence Shoe";
        }

        orderShoeNameInput.value = shoeName;
        orderModal.style.display = 'flex';
        setTimeout(() => orderModal.classList.add('active'), 10);
    });

    if (orderClose) {
        orderClose.addEventListener('click', () => {
            orderModal.classList.remove('active');
            setTimeout(() => orderModal.style.display = 'none', 500);
        });
    }

    // Close order modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
            setTimeout(() => orderModal.style.display = 'none', 500);
        }
    });

    // Handle GSAP Truck Animation & WhatsApp Redirect
    const truckButtons = document.querySelectorAll('.truck-button');
    truckButtons.forEach(button => {
        button.addEventListener('click', e => {
            // Check if form is valid before animating
            if (!orderForm.checkValidity()) {
                orderForm.reportValidity();
                return;
            }
            e.preventDefault();

            let box = button.querySelector('.box'),
                truck = button.querySelector('.truck');

            if (!button.classList.contains('done')) {
                if (!button.classList.contains('animation')) {
                    button.classList.add('animation');

                    gsap.to(button, {
                        '--box-s': 1,
                        '--box-o': 1,
                        duration: .3,
                        delay: .5
                    });

                    gsap.to(box, {
                        x: 0,
                        duration: .4,
                        delay: .7
                    });

                    gsap.to(button, {
                        '--hx': -5,
                        '--bx': 50,
                        duration: .18,
                        delay: .92
                    });

                    gsap.to(box, {
                        y: 0,
                        duration: .1,
                        delay: 1.15
                    });

                    gsap.set(button, {
                        '--truck-y': 0,
                        '--truck-y-n': -26
                    });

                    gsap.to(button, {
                        '--truck-y': 1,
                        '--truck-y-n': -25,
                        duration: .2,
                        delay: 1.25,
                        onComplete() {
                            gsap.timeline({
                                onComplete() {
                                    button.classList.add('done');
                                    // Send to WhatsApp when animation finishes
                                    sendToWhatsApp();
                                }
                            }).to(truck, {
                                x: 0,
                                duration: .4
                            }).to(truck, {
                                x: 40,
                                duration: 1
                            }).to(truck, {
                                x: 20,
                                duration: .6
                            }).to(truck, {
                                x: 96,
                                duration: .4
                            });
                            gsap.to(button, {
                                '--progress': 1,
                                duration: 2.4,
                                ease: "power2.in"
                            });
                        }
                    });
                }
            } else {
                button.classList.remove('animation', 'done');
                gsap.set(truck, { x: 4 });
                gsap.set(button, {
                    '--progress': 0,
                    '--hx': 0,
                    '--bx': 0,
                    '--box-s': .5,
                    '--box-o': 0,
                    '--truck-y': 0,
                    '--truck-y-n': -26
                });
                gsap.set(box, { x: -24, y: -6 });
            }
        });
    });

    function sendToWhatsApp() {
        const name = document.getElementById('order-name').value;
        const shoeName = document.getElementById('order-shoe-name').value;
        const phone1 = document.getElementById('order-phone1').value;
        const phone2 = document.getElementById('order-phone2').value;
        const qty = document.getElementById('order-qty').value;
        const size = document.getElementById('order-size').value;
        const address1 = document.getElementById('order-address1').value;
        const address2 = document.getElementById('order-address2').value;
        const pincode = document.getElementById('order-pincode').value;
        const city = document.getElementById('order-city').value;
        const state = document.getElementById('order-state').value;

        let message = `*New Order Placed!*\n\n`;
        message += `*Customer Details*\n`;
        message += `Name: ${name}\n`;
        message += `Phone 1: ${phone1}\n`;
        if (phone2) message += `Phone 2: ${phone2}\n`;

        message += `\n*Order Details*\n`;
        message += `Shoe: ${shoeName}\n`;
        message += `Size: ${size}\n`;
        message += `Quantity: ${qty}\n`;

        message += `\n*Shipping Address*\n`;
        message += `${address1}\n`;
        message += `${address2}\n`;
        message += `${city}, ${state} - ${pincode}\n\n`;
        message += `*Please send the picture of the selected shoe below this message.*`;

        const encodedMessage = encodeURIComponent(message);

        // Wait a tiny bit after the truck animation says "Order Placed"
        setTimeout(() => {
            window.open(`https://wa.me/919544856505?text=${encodedMessage}`, '_blank');
            // Reset the form
            orderForm.reset();
            const btn = document.querySelector('.truck-button');
            if (btn) btn.click(); // Reset btn state
            setTimeout(() => orderModal.style.display = 'none', 500);
        }, 1500);
    }

    // --- Cart Logic ---
    let cart = [];
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalDisplay = document.getElementById('cart-total-price');
    const cartCountBadge = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountBadge.textContent = totalItems;
        cartCountBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }

    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // Add to cart event listeners
    document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            const card = addBtn.closest('.product-card');
            const name = card.querySelector('h4').textContent;
            const priceText = card.querySelector('.sale-price').textContent;
            const price = parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0;
            const image = card.querySelector('.product-img-container img').src;

            addToCart({ name, price, image });

            // Subtle animation for the cart icon
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
        }
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        renderCart();
        updateCartBadge();

        // Open cart sidebar on add
        if (!cartSidebar.classList.contains('active')) toggleCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888; margin-top:50px;">Your cart is empty</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price * item.qty;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${formatINR(item.price)}</p>
                        <div class="cart-item-qty">
                            <button onclick="changeQty(${index}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${index}, 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeItem(${index})"><i class='bx bx-trash'></i></button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }
        cartTotalDisplay.textContent = formatINR(total);
    }

    // Global functions for inline onclick
    window.changeQty = (index, delta) => {
        cart[index].qty += delta;
        if (cart[index].qty < 1) {
            cart.splice(index, 1);
        }
        renderCart();
        updateCartBadge();
    };

    window.removeItem = (index) => {
        cart.splice(index, 1);
        renderCart();
        updateCartBadge();
    };

    // Checkout from cart
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            // Construct a message with all items
            let itemsSummary = cart.map(item => `${item.name} (x${item.qty})`).join(', ');
            orderShoeNameInput.value = itemsSummary;

            toggleCart();
            orderModal.style.display = 'flex';
            setTimeout(() => orderModal.classList.add('active'), 10);
        });
    }

    // Initialize
    updateCartBadge();
});


