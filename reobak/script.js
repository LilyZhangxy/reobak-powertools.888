document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    
    languageToggle.addEventListener('click', function() {
        const currentLang = this.getAttribute('data-current-lang');
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        setLanguage(newLang);
        this.setAttribute('data-current-lang', newLang);
        this.textContent = newLang === 'zh' ? '中文 / English' : 'English / 中文';
    });

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-en]').forEach(elem => {
            if (lang === 'en') {
                elem.dataset.zh = elem.innerText;
                elem.innerText = elem.dataset.en;
            } else {
                elem.innerText = elem.dataset.zh || elem.innerText;
            }
        });

        document.querySelectorAll('[data-en-placeholder]').forEach(elem => {
            if (lang === 'en') {
                elem.dataset.zhPlaceholder = elem.placeholder;
                elem.placeholder = elem.dataset.enPlaceholder;
            } else {
                elem.placeholder = elem.dataset.zhPlaceholder || elem.placeholder;
            }
        });

        document.querySelectorAll('[data-en-alt]').forEach(elem => {
            if (lang === 'en') {
                elem.dataset.zhAlt = elem.alt;
                elem.alt = elem.dataset.enAlt;
            } else {
                elem.alt = elem.dataset.zhAlt || elem.alt;
            }
        });

        // 更新页面标题
        const title = document.querySelector('title');
        if (title) {
            if (lang === 'en') {
                title.dataset.zh = title.textContent;
                title.textContent = title.dataset.en;
            } else {
                title.textContent = title.dataset.zh || title.textContent;
            }
        }

        // 更新产品数据
        if (typeof productData !== 'undefined') {
            for (let id in productData) {
                let product = productData[id];
                if (lang === 'en') {
                    product.name = product.name.replace('力扳王', 'Reobak ');
                    product.description = `Detailed description of ${product.name}...`;
                    // 翻译规格参数
                    product.specs = product.specs.map(spec => {
                        return spec
                            .replace('电池电压：', 'Battery Voltage: ')
                            .replace('电池容量：', 'Battery Capacity: ')
                            .replace('无负载转速：', 'No-load Speed: ')
                            .replace('最大扭力：', 'Maximum Torque: ')
                            .replace('砂轮尺寸：', 'Wheel Size: ')
                            .replace('切割片直径：', 'Cutting Disc Diameter: ')
                            .replace('导板长度：', 'Guide Bar Length: ')
                            .replace('链环数：', 'Chain Links: ')
                            .replace('冲击频率：', 'Impact Frequency: ')
                            .replace('最大钻孔直径：', 'Maximum Drilling Diameter: ');
                    });
                } else {
                    product.name = product.name.replace('Reobak ', '力扳王');
                    product.description = `${product.name}的详细描述...`;
                    // 翻译回中文
                    product.specs = product.specs.map(spec => {
                        return spec
                            .replace('Battery Voltage: ', '电池电压：')
                            .replace('Battery Capacity: ', '电池容量：')
                            .replace('No-load Speed: ', '无负载转速：')
                            .replace('Maximum Torque: ', '最大扭力：')
                            .replace('Wheel Size: ', '砂轮尺寸：')
                            .replace('Cutting Disc Diameter: ', '切割片直径：')
                            .replace('Guide Bar Length: ', '导板长度：')
                            .replace('Chain Links: ', '链环数：')
                            .replace('Impact Frequency: ', '冲击频率：')
                            .replace('Maximum Drilling Diameter: ', '最大钻孔直径：');
                    });
                }
            }
            // 如果当前页面是产品详情页，重新加载产品信息
            if (typeof loadProductDetails === 'function' && typeof productId !== 'undefined') {
                loadProductDetails(productId);
            }
        }

        // 更新产品列表页面
        document.querySelectorAll('.product-card h3').forEach(elem => {
            if (lang === 'en') {
                elem.textContent = elem.textContent.replace('力扳王', 'Reobak ');
            } else {
                elem.textContent = elem.textContent.replace('Reobak ', '力扳王');
            }
        });
    }
});
