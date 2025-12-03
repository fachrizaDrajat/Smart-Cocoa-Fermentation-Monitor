const fermentationData = {
    days: ['Hari 1', 'Hari 2', 'Hari 3', 'Hari 4', 'Hari 5', 'Hari 6', 'Hari 7'],
    temperatures: {
        base: [41.98, 42.07, 42.02, 41.93, 41.97, 41.95, 42.11],
        peak: [44.96, 48.51, 55.36, 52.76, 48.43, 44.47, 44.59],
        spikes: [2.99, 6.44, 13.95, 10.83, 6.45, 2.51, 2.48]
    },
    quality: {
        scores: [91.51, 90.83, 71.63, 81.61, 90.98, 91.27, 91.19],
        grades: ['A+', 'A', 'B', 'A', 'A', 'A+', 'A+']
    }
};

const sensorData = {
    temperature: { current: 45.52, target: 38.53, min: 28.5, max: 52.0 },
    humidity: { current: 80.10, optimal: 75, min: 70, max: 85 },
    ph: { current: 5.87, optimal: 5.5, min: 4.5, max: 6.5 },
    oxygen: { current: 20.03, optimal: 20, min: 18, max: 21 }
};

let temperatureChart;
let spikeChart;

function initializeCharts() {
    const tempCtx = document.getElementById('temperatureChart').getContext('2d');
    const spikeCtx = document.getElementById('spikeChart').getContext('2d');

    temperatureChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: fermentationData.days,
            datasets: [
                {
                    label: 'Suhu Puncak (°C)',
                    data: fermentationData.temperatures.peak,
                    borderColor: '#D32F2F',
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#D32F2F',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Suhu Dasar (°C)',
                    data: fermentationData.temperatures.base,
                    borderColor: '#1976D2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#1976D2',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Skor Kualitas (x)',
                    data: fermentationData.quality.scores.map(s => s * 1),
                    borderColor: '#388E3C',
                    backgroundColor: 'rgba(56, 142, 60, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#388E3C',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Tren Suhu dan Kualitas Selama Fermentasi',
                    font: { size: 16, weight: 'bold' },
                    color: '#8B4513'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    callbacks: {
                        afterLabel: function(context) {
                            if (context.datasetIndex === 2) {
                                const dayIndex = context.dataIndex;
                                return `Grade: ${fermentationData.quality.grades[dayIndex]}`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Suhu (°C)',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Skor Kualitas',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    spikeChart = new Chart(spikeCtx, {
        type: 'bar',
        data: {
            labels: fermentationData.days,
            datasets: [{
                label: 'Lonjakan Suhu (°C)',
                data: fermentationData.temperatures.spikes,
                backgroundColor: fermentationData.temperatures.spikes.map((spike, index) => {
                    if (index === 2) return 'rgba(211, 47, 47, 0.8)';
                    return 'rgba(25, 118, 210, 0.6)';
                }),
                borderColor: fermentationData.temperatures.spikes.map((spike, index) => {
                    if (index === 2) return '#D32F2F';
                    return '#1976D2';
                }),
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: fermentationData.temperatures.spikes.map((spike, index) => {
                    if (index === 2) return 'rgba(211, 47, 47, 1)';
                    return 'rgba(25, 118, 210, 0.8)';
                })
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Perbandingan Lonjakan Suhu Per Hari',
                    font: { size: 16, weight: 'bold' },
                    color: '#8B4513'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    callbacks: {
                        afterLabel: function(context) {
                            const dayIndex = context.dataIndex;
                            return `Grade: ${fermentationData.quality.grades[dayIndex]}\nSkor: ${fermentationData.quality.scores[dayIndex]}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Lonjakan Suhu (°C)',
                        font: { size: 14, weight: 'bold' }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        }
    });
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

function simulateRealtimeData() {
    const variance = 0.5;

    sensorData.temperature.current += (Math.random() - 0.5) * variance;
    sensorData.humidity.current += (Math.random() - 0.5) * variance * 0.5;
    sensorData.ph.current += (Math.random() - 0.5) * variance * 0.05;
    sensorData.oxygen.current += (Math.random() - 0.5) * variance * 0.3;

    sensorData.temperature.current = Math.max(sensorData.temperature.min,
        Math.min(sensorData.temperature.max, sensorData.temperature.current));
    sensorData.humidity.current = Math.max(sensorData.humidity.min,
        Math.min(sensorData.humidity.max, sensorData.humidity.current));
    sensorData.ph.current = Math.max(sensorData.ph.min,
        Math.min(sensorData.ph.max, sensorData.ph.current));
    sensorData.oxygen.current = Math.max(sensorData.oxygen.min,
        Math.min(sensorData.oxygen.max, sensorData.oxygen.current));
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const isPercentage = element.textContent.includes('%');
    const isCelsius = element.textContent.includes('°C');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;

        let displayValue = current.toFixed(2);
        if (isPercentage) displayValue += '%';
        if (isCelsius) displayValue += '°C';

        element.textContent = displayValue;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function updateSensorReadings() {
    simulateRealtimeData();

    const tempElement = document.getElementById('currentTemp');
    const humidityElement = document.getElementById('currentHumidity');
    const phElement = document.getElementById('currentPH');
    const oxygenElement = document.getElementById('currentOxygen');

    const prevTemp = parseFloat(tempElement.textContent);
    const prevHumidity = parseFloat(humidityElement.textContent);
    const prevPH = parseFloat(phElement.textContent);
    const prevOxygen = parseFloat(oxygenElement.textContent);

    animateValue(tempElement, prevTemp, sensorData.temperature.current, 1000);
    animateValue(humidityElement, prevHumidity, sensorData.humidity.current, 1000);
    animateValue(phElement, prevPH, sensorData.ph.current, 1000);
    animateValue(oxygenElement, prevOxygen, sensorData.oxygen.current, 1000);

    updateLastUpdateTime();
}

function addCardInteractivity() {
    const readingCards = document.querySelectorAll('.reading-card');

    readingCards.forEach(card => {
        card.addEventListener('click', function() {
            readingCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            const param = this.dataset.param;
            highlightChartData(param);
        });
    });
}

function highlightChartData(param) {
    console.log(`Highlighting data for: ${param}`);
}

function addRecommendationInteractivity() {
    const recCards = document.querySelectorAll('.recommendation-card');

    recCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '8px solid #9C27B0';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = '4px solid #9C27B0';
        });
    });
}

function addQualityCardInteractivity() {
    const qualityCards = document.querySelectorAll('.quality-card');

    qualityCards.forEach(card => {
        card.addEventListener('click', function() {
            qualityCards.forEach(c => c.style.transform = 'scale(1)');
            this.style.transform = 'scale(1.05)';

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const navLink = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLink.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    updateActiveNavLink();
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();

    const tempChart = document.getElementById('temperatureChart');
    const spikeChartElement = document.getElementById('spikeChart');

    if (tempChart) {
        initializeCharts();
        updateLastUpdateTime();
        addCardInteractivity();
        addRecommendationInteractivity();
        addQualityCardInteractivity();
        initializeAnimations();

        setInterval(updateSensorReadings, 5000);

        const criticalDay = document.getElementById('criticalDay');
        if (criticalDay) {
            setInterval(() => {
                criticalDay.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    criticalDay.style.transform = 'scale(1)';
                }, 500);
            }, 3000);
        }
    }
});

window.addEventListener('resize', function() {
    if (temperatureChart) temperatureChart.resize();
    if (spikeChart) spikeChart.resize();
});
