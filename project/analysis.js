// ----------------------
// ANALISIS KORELASI
// ----------------------
const correlationCtx = document.createElement("canvas");
document.querySelectorAll(".analysis-card")[0].appendChild(correlationCtx);

new Chart(correlationCtx, {
    type: "scatter",
    data: {
        datasets: [{
            label: "Korelasi Suhu vs Skor Kualitas",
            data: [
                { x: 32.1, y: 7.2 },
                { x: 40.3, y: 8.5 },
                { x: 50.8, y: 6.8 },
                { x: 49.2, y: 7.9 },
                { x: 48.5, y: 8.8 },
                { x: 46.3, y: 9.1 },
                { x: 42.8, y: 8.9 }
            ],
            pointRadius: 6
        }]
    },
    options: {
        plugins: { title: { display: true, text: "Korelasi Suhu Puncak dengan Skor Kualitas" } },
        scales: {
            x: { title: { display: true, text: "Suhu Puncak (°C)" } },
            y: { title: { display: true, text: "Skor Kualitas" }, min: 5, max: 10 }
        }
    }
});

// ----------------------
// DATA STATISTIK
// ----------------------
const statisticsCtx = document.createElement("canvas");
document.querySelectorAll(".analysis-card")[1].appendChild(statisticsCtx);

new Chart(statisticsCtx, {
    type: "bar",
    data: {
        labels: ["Suhu Puncak", "Suhu Dasar", "Lonjakan Suhu", "Kelembaban", "pH", "Oksigen"],
        datasets: [{
            label: "Rata-rata Parameter",
            data: [44.23, 36.07, 6.43, 80.15, 5.84, 20.02]
        }]
    },
    options: {
        plugins: { title: { display: true, text: "Statistik Rata-Rata Parameter Fermentasi" } }
    }
});

// ----------------------
// PREDIKSI KUALITAS
// ----------------------
const predictionCtx = document.createElement("canvas");
document.querySelectorAll(".analysis-card")[2].appendChild(predictionCtx);

new Chart(predictionCtx, {
    type: "line",
    data: {
        labels: ["Hari 1", "Hari 2", "Hari 3", "Hari 4", "Hari 5", "Hari 6", "Hari 7"],
        datasets: [{
            label: "Prediksi Skor Hari Berikutnya",
            data: [7.5, 8.7, 7.0, 8.2, 9.0, 9.3, 9.1],
            tension: 0.4
        }]
    },
    options: {
        plugins: { title: { display: true, text: "Prediksi Kualitas Berdasarkan Tren Parameter" } },
        scales: {
            y: { min: 6, max: 10 }
        }
    }
});

// ----------------------
// PERBANDINGAN BATCH
// ----------------------
const batchCtx = document.createElement("canvas");
document.querySelectorAll(".analysis-card")[3].appendChild(batchCtx);

new Chart(batchCtx, {
    type: "radar",
    data: {
        labels: ["Suhu", "Kelembaban", "pH", "Oksigen", "Skor"],
        datasets: [
            {
                label: "Batch A",
                data: [90, 80, 70, 50, 88]
            },
            {
                label: "Batch B",
                data: [85, 77, 75, 52, 81]
            }
        ]
    },
    options: {
        plugins: { title: { display: true, text: "Perbandingan Kualitas Antar Batch" } }
    }
});
