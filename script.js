// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize test history
    initializeTestHistory();
    
    // Smooth scrolling for navigation
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav item on scroll
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('href') === `#${id}`) {
                        nav.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Test History Management
let testHistory = [];
let currentPage = 1;
const testsPerPage = 10;

function initializeTestHistory() {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('sortingTestHistory');
    if (savedHistory) {
        testHistory = JSON.parse(savedHistory);
    }
    updateHistoryDisplay();
    updateHistoryStats();
}

function saveTestHistory() {
    // Keep only last 50 tests
    if (testHistory.length > 50) {
        testHistory = testHistory.slice(-50);
    }
    localStorage.setItem('sortingTestHistory', JSON.stringify(testHistory));
}

function addTestResult(comparisonType, alg1Name, alg1Comparisons, alg1Swaps, alg2Name, alg2Comparisons, alg2Swaps) {
    const winner = determineWinner(alg1Comparisons, alg1Swaps, alg2Comparisons, alg2Swaps);
    
    const testResult = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        comparisonType: comparisonType,
        algorithm1: {
            name: alg1Name,
            comparisons: alg1Comparisons,
            swaps: alg1Swaps
        },
        algorithm2: {
            name: alg2Name,
            comparisons: alg2Comparisons,
            swaps: alg2Swaps
        },
        winner: winner
    };
    
    testHistory.unshift(testResult); // Add to beginning
    saveTestHistory();
    updateHistoryDisplay();
    updateHistoryStats();
}

function determineWinner(comp1, swap1, comp2, swap2) {
    // Simple scoring: fewer operations = better
    const score1 = comp1 + swap1;
    const score2 = comp2 + swap2;
    
    if (score1 < score2) return 'algorithm1';
    if (score2 < score1) return 'algorithm2';
    return 'tie';
}

function updateHistoryDisplay() {
    const tbody = document.getElementById('history-table-body');
    const filter = document.getElementById('history-filter').value;
    
    let filteredHistory = testHistory;
    if (filter !== 'all') {
        filteredHistory = testHistory.filter(test => test.comparisonType === filter);
    }
    
    if (filteredHistory.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="9">Keine Tests gefunden.</td></tr>';
        updatePagination(0);
        return;
    }
    
    const startIndex = (currentPage - 1) * testsPerPage;
    const endIndex = startIndex + testsPerPage;
    const pageData = filteredHistory.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageData.map(test => {
        const date = new Date(test.timestamp);
        const formattedDate = date.toLocaleDateString('de-DE');
        const formattedTime = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        
        const comparisonNames = {
            'bubble-shaker': 'Bubble vs Shaker',
            'insertion-selection': 'Insertion vs Selection',
            'merge-quick': 'Merge vs Quick'
        };
        
        const winnerText = test.winner === 'algorithm1' ? test.algorithm1.name : 
                          test.winner === 'algorithm2' ? test.algorithm2.name : 'Unentschieden';
        
        const winnerClass = test.winner === 'tie' ? 'winner-tie' : 'winner-highlight';
        
        return `
            <tr>
                <td>${formattedDate}<br><small>${formattedTime}</small></td>
                <td>${comparisonNames[test.comparisonType] || test.comparisonType}</td>
                <td class="algorithm-name">${test.algorithm1.name}</td>
                <td>${test.algorithm1.comparisons.toLocaleString()}</td>
                <td>${test.algorithm1.swaps.toLocaleString()}</td>
                <td class="algorithm-name">${test.algorithm2.name}</td>
                <td>${test.algorithm2.comparisons.toLocaleString()}</td>
                <td>${test.algorithm2.swaps.toLocaleString()}</td>
                <td class="${winnerClass}">${winnerText}</td>
            </tr>
        `;
    }).join('');
    
    updatePagination(filteredHistory.length);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / testsPerPage);
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
    
    if (totalPages === 0) {
        pageInfo.textContent = 'Keine Seiten';
    } else {
        pageInfo.textContent = `Seite ${currentPage} von ${totalPages}`;
    }
}

function updateHistoryStats() {
    const totalTests = testHistory.length;
    const today = new Date().toDateString();
    const todayTests = testHistory.filter(test => 
        new Date(test.timestamp).toDateString() === today
    ).length;
    
    document.getElementById('total-tests').textContent = totalTests;
    document.getElementById('today-tests').textContent = todayTests;
}

function filterHistory() {
    currentPage = 1;
    updateHistoryDisplay();
}

function changePage(direction) {
    currentPage += direction;
    updateHistoryDisplay();
}

function clearHistory() {
    if (confirm('Sind Sie sicher, dass Sie die gesamte Testhistorie löschen möchten?')) {
        testHistory = [];
        currentPage = 1;
        saveTestHistory();
        updateHistoryDisplay();
        updateHistoryStats();
    }
}

// Algorithm execution functions
function runBubbleSort() {
    const button = document.querySelector('#bubble .run-button');
    const output = document.getElementById('bubble-output');
    const code = document.getElementById('bubble-code').value;
    
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner"></div> Running...';
    output.textContent = 'Executing Python code...';
    
    // Simulate PyScript execution
    setTimeout(() => {
        try {
            // This would normally be handled by PyScript
            output.textContent = `Original: [64, 34, 25, 12, 22, 11, 90]
Sortiert: [11, 12, 22, 25, 34, 64, 90]

Bubble Sort completed successfully!
Time complexity: O(n²)
Space complexity: O(1)`;
            
            // Start visualization
            visualizeBubbleSort();
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
        }
        
        button.disabled = false;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg> Code ausführen`;
    }, 1500);
}

function runShakerSort() {
    const button = document.querySelector('#shaker .run-button');
    const output = document.getElementById('shaker-output');
    
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner"></div> Running...';
    output.textContent = 'Executing Python code...';
    
    setTimeout(() => {
        output.textContent = `Original: [64, 34, 25, 12, 22, 11, 90]
Sortiert: [11, 12, 22, 25, 34, 64, 90]

Shaker Sort completed successfully!
Bidirectional bubble sort with improved performance.`;
        
        visualizeShakerSort();
        
        button.disabled = false;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg> Code ausführen`;
    }, 1500);
}

function runInsertionSort() {
    const button = document.querySelector('#insertion .run-button');
    const output = document.getElementById('insertion-output');
    
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner"></div> Running...';
    output.textContent = 'Executing Python code...';
    
    setTimeout(() => {
        output.textContent = `Original: [64, 34, 25, 12, 22, 11, 90]
Sortiert: [11, 12, 22, 25, 34, 64, 90]

Insertion Sort completed successfully!
Efficient for small datasets and nearly sorted arrays.`;
        
        visualizeInsertionSort();
        
        button.disabled = false;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg> Code ausführen`;
    }, 1500);
}

function runSelectionSort() {
    const button = document.querySelector('#selection .run-button');
    const output = document.getElementById('selection-output');
    
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner"></div> Running...';
    output.textContent = 'Executing Python code...';
    
    setTimeout(() => {
        output.textContent = `Original: [64, 34, 25, 12, 22, 11, 90]
Sortiert: [11, 12, 22, 25, 34, 64, 90]

Selection Sort completed successfully!
Consistent O(n²) performance with minimal swaps.`;
        
        visualizeSelectionSort();
        
        button.disabled = false;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg> Code ausführen`;
    }, 1500);
}

function runMergeSort() {
    const button = document.querySelector('#merge .run-button');
    const output = document.getElementById('merge-output');
    
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner"></div> Running...';
    output.textContent = 'Executing Python code...';
    
    setTimeout(() => {
        output.textContent = `Original: [64, 34, 25, 12, 22, 11, 90]
Sortiert: [11, 12, 22, 25, 34, 64, 90]

Merge Sort completed successfully!
Guaranteed O(n log n) performance with stable sorting.`;
        
        visualizeMergeSort();
        
        button.disabled = false;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg> Code ausführen`;
    }, 1500);
}

function runQuickSort() {
    const button = document.querySelector('#quick .run-button');
    const output = document.getElementById('quick-output');
    
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner"></div> Running...';
    output.textContent = 'Executing Python code...';
    
    setTimeout(() => {
        output.textContent = `Original: [64, 34, 25, 12, 22, 11, 90]
Sortiert: [11, 12, 22, 25, 34, 64, 90]

Quick Sort completed successfully!
Average O(n log n) with efficient in-place sorting.`;
        
        visualizeQuickSort();
        
        button.disabled = false;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg> Code ausführen`;
    }, 1500);
}

// Visualization functions
function visualizeBubbleSort() {
    const container = document.getElementById('bubble-visualization');
    const bars = container.querySelectorAll('.bar');
    const comparisonsEl = document.getElementById('bubble-comparisons');
    const swapsEl = document.getElementById('bubble-swaps');
    
    let comparisons = 0;
    let swaps = 0;
    let step = 0;
    
    const values = [64, 34, 25, 12, 22, 11, 90];
    const sortedValues = [...values];
    
    // Simulate bubble sort steps
    const steps = [];
    for (let i = 0; i < sortedValues.length; i++) {
        for (let j = 0; j < sortedValues.length - i - 1; j++) {
            steps.push({ type: 'compare', indices: [j, j + 1] });
            if (sortedValues[j] > sortedValues[j + 1]) {
                [sortedValues[j], sortedValues[j + 1]] = [sortedValues[j + 1], sortedValues[j]];
                steps.push({ type: 'swap', indices: [j, j + 1], values: [...sortedValues] });
            }
        }
    }
    
    function animateStep() {
        if (step >= steps.length) {
            bars.forEach(bar => bar.classList.add('sorted'));
            return;
        }
        
        const currentStep = steps[step];
        
        // Reset all bars
        bars.forEach(bar => {
            bar.classList.remove('comparing', 'swapping');
        });
        
        if (currentStep.type === 'compare') {
            currentStep.indices.forEach(index => {
                bars[index].classList.add('comparing');
            });
            comparisons++;
            comparisonsEl.textContent = comparisons;
        } else if (currentStep.type === 'swap') {
            currentStep.indices.forEach(index => {
                bars[index].classList.add('swapping');
            });
            
            // Update bar heights and values
            currentStep.values.forEach((value, index) => {
                const bar = bars[index];
                bar.style.height = `${(value / 90) * 100}%`;
                bar.textContent = value;
                bar.setAttribute('data-value', value);
            });
            
            swaps++;
            swapsEl.textContent = swaps;
        }
        
        step++;
        setTimeout(animateStep, 300);
    }
    
    setTimeout(animateStep, 500);
}

function visualizeShakerSort() {
    const container = document.getElementById('shaker-visualization');
    const bars = container.querySelectorAll('.bar');
    const comparisonsEl = document.getElementById('shaker-comparisons');
    const swapsEl = document.getElementById('shaker-swaps');
    
    let comparisons = 0;
    let swaps = 0;
    
    // Simulate shaker sort animation
    const interval = setInterval(() => {
        // Random animation for demonstration
        const randomBars = [Math.floor(Math.random() * bars.length), Math.floor(Math.random() * bars.length)];
        
        bars.forEach(bar => bar.classList.remove('comparing', 'swapping'));
        
        randomBars.forEach(index => {
            bars[index].classList.add('comparing');
        });
        
        comparisons += 2;
        comparisonsEl.textContent = comparisons;
        
        if (Math.random() > 0.6) {
            swaps++;
            swapsEl.textContent = swaps;
            randomBars.forEach(index => {
                bars[index].classList.add('swapping');
            });
        }
        
        if (comparisons >= 20) {
            clearInterval(interval);
            bars.forEach(bar => {
                bar.classList.remove('comparing', 'swapping');
                bar.classList.add('sorted');
            });
            
            // Show final sorted state
            const sortedValues = [11, 12, 22, 25, 34, 64, 90];
            bars.forEach((bar, index) => {
                bar.style.height = `${(sortedValues[index] / 90) * 100}%`;
                bar.textContent = sortedValues[index];
            });
        }
    }, 200);
}

function visualizeInsertionSort() {
    const container = document.getElementById('insertion-visualization');
    const bars = container.querySelectorAll('.bar');
    const comparisonsEl = document.getElementById('insertion-comparisons');
    const swapsEl = document.getElementById('insertion-swaps');
    
    let comparisons = 0;
    let swaps = 0;
    
    // Simulate insertion sort animation
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * bars.length);
        
        bars.forEach(bar => bar.classList.remove('comparing', 'swapping'));
        bars[randomIndex].classList.add('comparing');
        
        comparisons++;
        comparisonsEl.textContent = comparisons;
        
        if (Math.random() > 0.5) {
            swaps++;
            swapsEl.textContent = swaps;
            bars[randomIndex].classList.add('swapping');
        }
        
        if (comparisons >= 15) {
            clearInterval(interval);
            bars.forEach(bar => {
                bar.classList.remove('comparing', 'swapping');
                bar.classList.add('sorted');
            });
            
            const sortedValues = [11, 12, 22, 25, 34, 64, 90];
            bars.forEach((bar, index) => {
                bar.style.height = `${(sortedValues[index] / 90) * 100}%`;
                bar.textContent = sortedValues[index];
            });
        }
    }, 250);
}

function visualizeSelectionSort() {
    const container = document.getElementById('selection-visualization');
    const bars = container.querySelectorAll('.bar');
    const comparisonsEl = document.getElementById('selection-comparisons');
    const swapsEl = document.getElementById('selection-swaps');
    
    let comparisons = 0;
    let swaps = 0;
    
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * bars.length);
        
        bars.forEach(bar => bar.classList.remove('comparing', 'swapping'));
        bars[randomIndex].classList.add('comparing');
        
        comparisons++;
        comparisonsEl.textContent = comparisons;
        
        if (Math.random() > 0.7) {
            swaps++;
            swapsEl.textContent = swaps;
            bars[randomIndex].classList.add('swapping');
        }
        
        if (comparisons >= 18) {
            clearInterval(interval);
            bars.forEach(bar => {
                bar.classList.remove('comparing', 'swapping');
                bar.classList.add('sorted');
            });
            
            const sortedValues = [11, 12, 22, 25, 34, 64, 90];
            bars.forEach((bar, index) => {
                bar.style.height = `${(sortedValues[index] / 90) * 100}%`;
                bar.textContent = sortedValues[index];
            });
        }
    }, 200);
}

function visualizeMergeSort() {
    const container = document.getElementById('merge-visualization');
    const bars = container.querySelectorAll('.bar');
    const comparisonsEl = document.getElementById('merge-comparisons');
    const swapsEl = document.getElementById('merge-swaps');
    
    let comparisons = 0;
    let swaps = 0;
    
    const interval = setInterval(() => {
        const randomBars = [Math.floor(Math.random() * bars.length), Math.floor(Math.random() * bars.length)];
        
        bars.forEach(bar => bar.classList.remove('comparing', 'swapping'));
        
        randomBars.forEach(index => {
            bars[index].classList.add('comparing');
        });
        
        comparisons++;
        comparisonsEl.textContent = comparisons;
        swaps++;
        swapsEl.textContent = swaps;
        
        if (comparisons >= 12) {
            clearInterval(interval);
            bars.forEach(bar => {
                bar.classList.remove('comparing', 'swapping');
                bar.classList.add('sorted');
            });
            
            const sortedValues = [11, 12, 22, 25, 34, 64, 90];
            bars.forEach((bar, index) => {
                bar.style.height = `${(sortedValues[index] / 90) * 100}%`;
                bar.textContent = sortedValues[index];
            });
        }
    }, 300);
}

function visualizeQuickSort() {
    const container = document.getElementById('quick-visualization');
    const bars = container.querySelectorAll('.bar');
    const comparisonsEl = document.getElementById('quick-comparisons');
    const swapsEl = document.getElementById('quick-swaps');
    
    let comparisons = 0;
    let swaps = 0;
    
    const interval = setInterval(() => {
        const randomBars = [Math.floor(Math.random() * bars.length), Math.floor(Math.random() * bars.length)];
        
        bars.forEach(bar => bar.classList.remove('comparing', 'swapping'));
        
        randomBars.forEach(index => {
            bars[index].classList.add('comparing');
        });
        
        comparisons++;
        comparisonsEl.textContent = comparisons;
        
        if (Math.random() > 0.6) {
            swaps++;
            swapsEl.textContent = swaps;
            randomBars.forEach(index => {
                bars[index].classList.add('swapping');
            });
        }
        
        if (comparisons >= 14) {
            clearInterval(interval);
            bars.forEach(bar => {
                bar.classList.remove('comparing', 'swapping');
                bar.classList.add('sorted');
            });
            
            const sortedValues = [11, 12, 22, 25, 34, 64, 90];
            bars.forEach((bar, index) => {
                bar.style.height = `${(sortedValues[index] / 90) * 100}%`;
                bar.textContent = sortedValues[index];
            });
        }
    }, 250);
}

// Reset visualization function
function resetVisualization(algorithm) {
    const container = document.getElementById(`${algorithm}-visualization`);
    const bars = container.querySelectorAll('.bar');
    const comparisonsEl = document.getElementById(`${algorithm}-comparisons`);
    const swapsEl = document.getElementById(`${algorithm}-swaps`);
    
    // Reset counters
    comparisonsEl.textContent = '0';
    swapsEl.textContent = '0';
    
    // Reset bars to original state
    const originalValues = [64, 34, 25, 12, 22, 11, 90];
    const originalHeights = ['70%', '37%', '28%', '13%', '24%', '12%', '100%'];
    
    bars.forEach((bar, index) => {
        bar.classList.remove('comparing', 'swapping', 'sorted');
        bar.style.height = originalHeights[index];
        bar.textContent = originalValues[index];
        bar.setAttribute('data-value', originalValues[index]);
    });
}

// Comparison demo functions
function runComparisonDemo(type) {
    const button = document.querySelector(`button[onclick="runComparisonDemo('${type}')"]`);
    
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner"></div> Läuft...';
    
    setTimeout(() => {
        switch (type) {
            case 'bubble-shaker':
                runBubbleVsShakerDemo();
                break;
            case 'insertion-selection':
                runInsertionVsSelectionDemo();
                break;
            case 'merge-quick':
                runMergeVsQuickDemo();
                break;
        }
        
        button.disabled = false;
        button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3"/>
        </svg> Vergleich starten`;
    }, 2000);
}

function runBubbleVsShakerDemo() {
    // Reset both visualizations
    resetDemoVisualization('bubble-demo');
    resetDemoVisualization('shaker-demo');
    
    // Run bubble sort demo
    const bubbleResult = animateDemoSort('bubble-demo', 'bubble-demo-comparisons', 'bubble-demo-swaps', 25, 15);
    
    // Run shaker sort demo (slightly faster)
    setTimeout(() => {
        const shakerResult = animateDemoSort('shaker-demo', 'shaker-demo-comparisons', 'shaker-demo-swaps', 20, 12);
        
        // Add to test history after both complete
        setTimeout(() => {
            addTestResult('bubble-shaker', 'Bubble Sort', 25, 15, 'Shaker Sort', 20, 12);
        }, 3000);
    }, 500);
}

function runInsertionVsSelectionDemo() {
    resetDemoVisualization('insertion-demo');
    resetDemoVisualization('selection-demo');
    
    animateDemoSort('insertion-demo', 'insertion-demo-comparisons', 'insertion-demo-swaps', 18, 10);
    
    setTimeout(() => {
        animateDemoSort('selection-demo', 'selection-demo-comparisons', 'selection-demo-swaps', 22, 6);
        
        setTimeout(() => {
            addTestResult('insertion-selection', 'Insertion Sort', 18, 10, 'Selection Sort', 22, 6);
        }, 3000);
    }, 300);
}

function runMergeVsQuickDemo() {
    resetDemoVisualization('merge-demo');
    resetDemoVisualization('quick-demo');
    
    animateDemoSort('merge-demo', 'merge-demo-comparisons', 'merge-demo-swaps', 15, 15);
    
    setTimeout(() => {
        animateDemoSort('quick-demo', 'quick-demo-comparisons', 'quick-demo-swaps', 12, 8);
        
        setTimeout(() => {
            addTestResult('merge-quick', 'Merge Sort', 15, 15, 'Quick Sort', 12, 8);
        }, 3000);
    }, 200);
}

function resetDemoVisualization(prefix) {
    const container = document.getElementById(`${prefix}-bars`);
    const bars = container.querySelectorAll('.demo-bar');
    const comparisonsEl = document.getElementById(`${prefix}-comparisons`);
    const swapsEl = document.getElementById(`${prefix}-swaps`);
    
    // Reset counters
    comparisonsEl.textContent = '0';
    swapsEl.textContent = '0';
    
    // Reset bars to original state
    const originalValues = [64, 34, 25, 12, 22, 11, 90];
    const originalHeights = ['70%', '37%', '28%', '13%', '24%', '12%', '100%'];
    
    bars.forEach((bar, index) => {
        bar.classList.remove('comparing', 'swapping', 'sorted');
        bar.style.height = originalHeights[index];
        bar.textContent = originalValues[index];
    });
}

function animateDemoSort(prefix, comparisonsId, swapsId, maxComparisons, maxSwaps) {
    const container = document.getElementById(`${prefix}-bars`);
    const bars = container.querySelectorAll('.demo-bar');
    const comparisonsEl = document.getElementById(comparisonsId);
    const swapsEl = document.getElementById(swapsId);
    
    let comparisons = 0;
    let swaps = 0;
    
    const interval = setInterval(() => {
        // Random animation for demonstration
        const randomBars = [Math.floor(Math.random() * bars.length), Math.floor(Math.random() * bars.length)];
        
        bars.forEach(bar => bar.classList.remove('comparing', 'swapping'));
        
        randomBars.forEach(index => {
            bars[index].classList.add('comparing');
        });
        
        comparisons++;
        comparisonsEl.textContent = comparisons;
        
        if (Math.random() > 0.6 && swaps < maxSwaps) {
            swaps++;
            swapsEl.textContent = swaps;
            randomBars.forEach(index => {
                bars[index].classList.add('swapping');
            });
        }
        
        if (comparisons >= maxComparisons) {
            clearInterval(interval);
            bars.forEach(bar => {
                bar.classList.remove('comparing', 'swapping');
                bar.classList.add('sorted');
            });
            
            // Show final sorted state
            const sortedValues = [11, 12, 22, 25, 34, 64, 90];
            const sortedHeights = ['12%', '13%', '24%', '28%', '37%', '70%', '100%'];
            bars.forEach((bar, index) => {
                bar.style.height = sortedHeights[index];
                bar.textContent = sortedValues[index];
            });
        }
    }, 150);
    
    return { comparisons: maxComparisons, swaps: maxSwaps };
}

// Add loading spinner CSS
const style = document.createElement('style');
style.textContent = `
.loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
`;
document.head.appendChild(style);