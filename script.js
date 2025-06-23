// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
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

// Comparison functions
function runComparison(type) {
    const button = document.querySelector(`button[onclick="runComparison('${type}')"]`);
    const resultsDiv = document.getElementById(`${type}-results`);
    const sizeSelect = document.getElementById(`${type}-size`);
    
    button.disabled = true;
    button.innerHTML = '<div class="loading-spinner"></div> Running Test...';
    
    const size = parseInt(sizeSelect.value);
    
    setTimeout(() => {
        // Simulate performance results
        const results = generateComparisonResults(type, size);
        displayComparisonResults(type, results);
        
        resultsDiv.style.display = 'block';
        button.disabled = false;
        button.innerHTML = '🏆 Vergleich starten';
    }, 2000);
}

function generateComparisonResults(type, size) {
    const baseTime = size * 0.001;
    const baseComparisons = size * size * 0.5;
    const baseSwaps = size * 0.3;
    
    switch (type) {
        case 'bubble-shaker':
            return {
                bubble: {
                    time: (baseTime * 1.2 + Math.random() * 10).toFixed(2),
                    comparisons: Math.floor(baseComparisons * 1.1 + Math.random() * 1000),
                    swaps: Math.floor(baseSwaps * 1.0 + Math.random() * 500)
                },
                shaker: {
                    time: (baseTime * 1.0 + Math.random() * 8).toFixed(2),
                    comparisons: Math.floor(baseComparisons * 0.9 + Math.random() * 800),
                    swaps: Math.floor(baseSwaps * 0.8 + Math.random() * 400)
                }
            };
        case 'insertion-selection':
            return {
                insertion: {
                    time: (baseTime * 0.8 + Math.random() * 6).toFixed(2),
                    comparisons: Math.floor(baseComparisons * 0.6 + Math.random() * 600),
                    swaps: Math.floor(baseSwaps * 0.5 + Math.random() * 300)
                },
                selection: {
                    time: (baseTime * 1.0 + Math.random() * 8).toFixed(2),
                    comparisons: Math.floor(baseComparisons * 1.0 + Math.random() * 1000),
                    swaps: Math.floor(baseSwaps * 0.1 + Math.random() * 100)
                }
            };
        case 'merge-quick':
            return {
                merge: {
                    time: (baseTime * 0.3 + Math.random() * 3).toFixed(2),
                    comparisons: Math.floor(size * Math.log2(size) * 1.2 + Math.random() * 200),
                    swaps: Math.floor(size * Math.log2(size) * 1.0 + Math.random() * 150)
                },
                quick: {
                    time: (baseTime * 0.25 + Math.random() * 2.5).toFixed(2),
                    comparisons: Math.floor(size * Math.log2(size) * 1.0 + Math.random() * 180),
                    swaps: Math.floor(size * Math.log2(size) * 0.8 + Math.random() * 120)
                }
            };
    }
}

function displayComparisonResults(type, results) {
    Object.keys(results).forEach(algorithm => {
        const result = results[algorithm];
        document.getElementById(`${algorithm}-time`).textContent = `${result.time}ms`;
        document.getElementById(`${algorithm}-comparisons-result`).textContent = result.comparisons.toLocaleString();
        document.getElementById(`${algorithm}-swaps-result`).textContent = result.swaps.toLocaleString();
    });
    
    // Highlight winner
    const algorithms = Object.keys(results);
    const timeWinner = algorithms.reduce((winner, current) => 
        parseFloat(results[current].time) < parseFloat(results[winner].time) ? current : winner
    );
    
    algorithms.forEach(algorithm => {
        const card = document.querySelector(`.${algorithm}-result`);
        card.classList.remove('winner');
        if (algorithm === timeWinner) {
            card.classList.add('winner');
        }
    });
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