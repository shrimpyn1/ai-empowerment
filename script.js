/**
 * AI Empowerment - Enhanced Interactive Scripts
 * =============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // Loader Animation
    // ===================================
    const loader = document.querySelector('.loader');

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 1800);

    // ===================================
    // Progress Bar
    // ===================================
    const progressBar = document.getElementById('progress-bar');

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // ===================================
    // Floating Particles
    // ===================================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100 + 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }

    // ===================================
    // Scroll Reveal Observer
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger specific animations based on element
                if (entry.target.classList.contains('terminal-window') && !entry.target.dataset.typed) {
                    typeTerminal();
                    entry.target.dataset.typed = 'true';
                }

                // Trigger count-up animation for stat cards
                if (entry.target.classList.contains('stat-card') && !entry.target.dataset.counted) {
                    animateCountUp(entry.target);
                    entry.target.dataset.counted = 'true';
                }

                // Trigger chart animations
                if (entry.target.classList.contains('chart-container') && !entry.target.dataset.animated) {
                    animateBarChart();
                    entry.target.dataset.animated = 'true';
                }

                // Trigger donut chart animation
                if (entry.target.classList.contains('donut-chart-container') && !entry.target.dataset.animated) {
                    animateDonutChart();
                    animateAdoptionBars();
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // ===================================
    // Count Up Animation
    // ===================================
    function animateCountUp(card) {
        const numberEl = card.querySelector('.stat-number');
        const targetValue = parseFloat(card.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = targetValue * easeOutQuart;

            if (Number.isInteger(targetValue)) {
                numberEl.textContent = Math.round(currentValue);
            } else {
                numberEl.textContent = currentValue.toFixed(1);
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    }

    // ===================================
    // Bar Chart Animation
    // ===================================
    function animateBarChart() {
        const bars = document.querySelectorAll('.bar-chart .bar-item');

        bars.forEach((item, index) => {
            setTimeout(() => {
                const value = parseInt(item.dataset.value);
                const bar = item.querySelector('.bar');
                const maxWidth = Math.abs(value);
                bar.style.width = `${maxWidth}%`;
            }, index * 150);
        });
    }

    // ===================================
    // Donut Chart Animation
    // ===================================
    function animateDonutChart() {
        const segment = document.querySelector('.donut-segment');
        if (!segment) return;

        const percent = parseInt(segment.dataset.percent);
        const circumference = 2 * Math.PI * 80; // r = 80
        const dashArray = (percent / 100) * circumference;

        setTimeout(() => {
            segment.style.strokeDasharray = `${dashArray} ${circumference}`;
        }, 300);
    }

    // ===================================
    // Adoption Bars Animation
    // ===================================
    function animateAdoptionBars() {
        const bars = document.querySelectorAll('.adoption-bar');

        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.dataset.width;
                const fill = bar.querySelector('.adoption-fill');
                fill.style.width = `${width}%`;
            }, 300 + index * 200);
        });
    }

    // ===================================
    // Terminal Typing Effect
    // ===================================
    let typingInProgress = false;

    function typeTerminal() {
        if (typingInProgress) return;
        typingInProgress = true;

        const terminalBody = document.getElementById('typing-text');
        terminalBody.innerHTML = '';

        const lines = [
            { text: '$ agent --task "市场研究与竞品分析"', class: 'command', delay: 0 },
            { text: '正在初始化 AI Agent...', class: 'info', delay: 800 },
            { text: '连接知识库... ✓', class: 'info', delay: 1500 },
            { text: '扫描数据源: arXiv, 行业报告, 新闻媒体...', class: 'info', delay: 2200 },
            { text: '>>> 已处理 1,847,293 条数据', class: 'info', delay: 3000 },
            { text: '正在识别关键趋势和模式...', class: 'info', delay: 3800 },
            { text: '>>> 洞察: 非技术背景人才需求 ↑ 340%', class: 'success', delay: 4600 },
            { text: '>>> 洞察: AI辅助决策采用率 ↑ 89%', class: 'success', delay: 5400 },
            { text: '生成可视化报告中...', class: 'info', delay: 6200 },
            { text: '✓ 任务完成。报告已保存至 /output/report.pdf', class: 'success', delay: 7000 }
        ];

        let currentLine = 0;

        function processLine() {
            if (currentLine >= lines.length) {
                typingInProgress = false;
                return;
            }

            const lineData = lines[currentLine];
            const lineEl = document.createElement('div');
            lineEl.className = lineData.class || '';
            terminalBody.appendChild(lineEl);

            let charIndex = 0;
            const text = lineData.text;

            function typeChar() {
                if (charIndex < text.length) {
                    lineEl.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 25);
                } else {
                    currentLine++;
                    if (currentLine < lines.length) {
                        setTimeout(processLine, lines[currentLine].delay - (lines[currentLine - 1]?.delay || 0));
                    } else {
                        typingInProgress = false;
                    }
                }
            }

            typeChar();
        }

        processLine();
    }

    // ===================================
    // Terminal Replay Button
    // ===================================
    const replayBtn = document.getElementById('replay-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            if (!typingInProgress) {
                typeTerminal();
            }
        });
    }

    // ===================================
    // Parallax Effect for Images
    // ===================================
    const parallaxImages = document.querySelectorAll('.parallax-image');

    window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const translateY = (scrollProgress - 0.5) * 30;
                img.style.transform = `translateY(${translateY}px) scale(1.05)`;
            }
        });
    });

    // ===================================
    // Hero Background Parallax
    // ===================================
    const heroBg = document.querySelector('.hero .bg-image');

    window.addEventListener('scroll', () => {
        if (heroBg) {
            const scrolled = window.scrollY;
            const speed = 0.3;
            heroBg.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
        }
    });

    // ===================================
    // Smooth Scroll for CTA Button
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===================================
    // Interactive Hover Sound Effect (Optional)
    // ===================================
    const interactiveElements = document.querySelectorAll('.stat-card, .feature-card, .cta-button');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ===================================
    // Intersection Observer for Section Animations
    // ===================================
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // ===================================
    // Mobile Touch Feedback
    // ===================================
    if ('ontouchstart' in window) {
        document.querySelectorAll('.stat-card, .feature-card, .cta-button').forEach(el => {
            el.addEventListener('touchstart', () => {
                el.style.transform = 'scale(0.98)';
            });

            el.addEventListener('touchend', () => {
                el.style.transform = '';
            });
        });
    }

    // ===================================
    // Keyboard Navigation Enhancement
    // ===================================
    document.addEventListener('keydown', (e) => {
        // Space or Enter to scroll to next section
        if (e.code === 'Space' && !e.target.matches('input, textarea, button')) {
            e.preventDefault();
            const sections = document.querySelectorAll('section');
            const currentScroll = window.scrollY + window.innerHeight / 2;

            for (let i = 0; i < sections.length; i++) {
                const sectionTop = sections[i].offsetTop;
                if (sectionTop > currentScroll) {
                    sections[i].scrollIntoView({ behavior: 'smooth' });
                    break;
                }
            }
        }
    });

    // ===================================
    // Performance: Throttle Scroll Events
    // ===================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply throttling to scroll-heavy operations
    const throttledParallax = throttle(() => {
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const translateY = (scrollProgress - 0.5) * 30;
                img.style.transform = `translateY(${translateY}px) scale(1.05)`;
            }
        });
    }, 16);

    window.addEventListener('scroll', throttledParallax);

    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c思维的杠杆 | 智识时代的崛起', 'font-size: 20px; color: #d4af37; font-weight: bold;');
    console.log('%c规则已变。你准备好了吗？', 'font-size: 14px; color: #888;');
});
