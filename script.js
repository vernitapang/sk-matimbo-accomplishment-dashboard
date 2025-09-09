// Global variables to store loaded data
let projectsData = [];
let partnershipsData = [];
let financialData = [];
let awardsData = [];
let committeesData = [];

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Load all data when page loads
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize mobile menu
    initMobileMenu();
    try {
        // Load projects data
        const projectsResponse = await fetch('./data/projects.json');
        projectsData = await projectsResponse.json();
        
        // Load partnerships data
        const partnershipsResponse = await fetch('./data/partnerships.json');
        partnershipsData = await partnershipsResponse.json();
        
        // Load financial data
        const financialResponse = await fetch('./data/financial.json');
        financialData = await financialResponse.json();
        
        // Load awards data
        const awardsResponse = await fetch('./data/awards.json');
        awardsData = await awardsResponse.json();
        
        // Load committees data
        const committeesResponse = await fetch('./data/committees.json');
        committeesData = await committeesResponse.json();
        
        // Initialize dashboard
        updateDashboardStats();
        loadProjects();
        loadPartnerships();
        loadFinancialData();
        loadAwards();
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

// Navigation functions
function showDashboard() {
    document.querySelector('.dashboard-tiles').style.display = 'grid';
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('partnerships-section').style.display = 'none';
    document.getElementById('financial-section').style.display = 'none';
    document.getElementById('awards-section').style.display = 'none';
}

function showProjects() {
    document.querySelector('.dashboard-tiles').style.display = 'none';
    document.getElementById('projects-section').style.display = 'block';
    document.getElementById('partnerships-section').style.display = 'none';
    document.getElementById('financial-section').style.display = 'none';
    document.getElementById('awards-section').style.display = 'none';
    loadProjects();
}

function showPartnerships() {
    document.querySelector('.dashboard-tiles').style.display = 'none';
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('partnerships-section').style.display = 'block';
    document.getElementById('financial-section').style.display = 'none';
    document.getElementById('awards-section').style.display = 'none';
    loadPartnerships();
}

function showFinancial() {
    document.querySelector('.dashboard-tiles').style.display = 'none';
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('partnerships-section').style.display = 'none';
    document.getElementById('financial-section').style.display = 'block';
    document.getElementById('awards-section').style.display = 'none';
    loadFinancialData();
}

function showAwards() {
    document.querySelector('.dashboard-tiles').style.display = 'none';
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('partnerships-section').style.display = 'none';
    document.getElementById('financial-section').style.display = 'none';
    document.getElementById('awards-section').style.display = 'block';
    loadAwards();
}

// Load projects into the grid
function loadProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.onclick = () => openProjectDetail(project.id);
        
        // Get committee info
        const committee = committeesData[project.committeeId];
        const committeeColor = committee.committeeColor;
        const committeeName = committee.committeeSlug;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.thumbnail}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h4 class="project-title">${project.title}</h4>
                </div>
                <p class="project-description">${project.description.substring(0, 120)}...</p>
                <div class="project-meta">
                    <div class="attendees">
                        <i class="fas fa-users"></i>
                        <span>${project.attendees} attendees</span>
                    </div>
                    <div class="committee-badge" style="background-color: ${committeeColor}; color: white;" title="${committee.name}">
                        ${committeeName}
                    </div>
                    <div class="project-status-icon ${project.status.toLowerCase()}" title="${project.status}">
                        <i class="fas ${project.status.toLowerCase() === 'completed' ? 'fa-check-circle' : 'fa-clock'}"></i>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(projectCard);
    });
}

// Load partnerships
function loadPartnerships() {
    const container = document.getElementById('partnerships-container');
    container.innerHTML = '';
    
    partnershipsData.forEach(partnership => {
        const partnershipItem = document.createElement('div');
        partnershipItem.className = 'partnership-item';
        
        partnershipItem.innerHTML = `
            <div class="partnership-info">
                <h4>${partnership.name}</h4>
                <p>${partnership.description}</p>
                <small>${partnership.type}</small>
            </div>
            <div class="partnership-status status-${partnership.status.toLowerCase()}">
                ${partnership.status}
            </div>
        `;
        
        container.appendChild(partnershipItem);
    });
}

// Load financial data
function loadFinancialData() {
    const container = document.getElementById('financial-container');
    container.innerHTML = '';
    
    // Add summary header and chart container
    const summaryHeader = document.createElement('div');
    summaryHeader.innerHTML = `
        <h4 style="margin-bottom: 1.5rem; color: #2c3e50; font-size: 1.5rem;">Budget Allocation Summary</h4>
        <p style="margin-bottom: 2rem; color: #7f8c8d;">Total Budget: ₱2,500,000 for FY 2024</p>
        
        <div class="chart-section" style="margin-bottom: 3rem;">
            <div class="chart-container">
                <canvas id="budgetPieChart" width="400" height="400"></canvas>
            </div>
        </div>
    `;
    container.appendChild(summaryHeader);
    
    // Create pie chart
    createBudgetPieChart();
    
    financialData.forEach(item => {
        const financialItem = document.createElement('div');
        financialItem.className = 'financial-item';
        
        financialItem.innerHTML = `
            <div class="financial-info">
                <h4>${item.category}</h4>
                <p>${item.description}</p>
            </div>
            <div class="financial-amount" style="text-align: right;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #27ae60;">${item.amount}</div>
                <div style="font-size: 0.9rem; color: #7f8c8d;">${item.percentage} of total</div>
            </div>
        `;
        
        container.appendChild(financialItem);
    });
}

// Load awards
function loadAwards() {
    const container = document.getElementById('awards-container');
    container.innerHTML = '';
    
    awardsData.forEach(award => {
        const awardItem = document.createElement('div');
        awardItem.className = 'award-item';
        
        // Add click handler only on mobile devices
        if (award.link && window.innerWidth <= 768) {
            awardItem.style.cursor = 'pointer';
            awardItem.onclick = () => window.open(award.link, '_blank');
            awardItem.className += ' award-clickable';
        }
        
        awardItem.innerHTML = `
            <div class="award-icon">
                ${award.icon}
            </div>
            <div class="award-info">
                <h4>
                    ${award.title}
                    ${award.link ? `<i class="fas fa-arrow-right award-link-icon" onclick="event.stopPropagation(); window.open('${award.link}', '_blank')" title="View award details"></i>` : ''}
                </h4>
                <p class="award-organization">${award.organization}</p>
                <p class="award-description">${award.description}</p>
                <div class="award-meta">
                    <span class="award-category">${award.category}</span>
                    <span class="award-year">${award.year}</span>
                </div>
            </div>
        `;
        
        container.appendChild(awardItem);
    });
}

// Create pie chart for budget allocation
function createBudgetPieChart() {
    const ctx = document.getElementById('budgetPieChart').getContext('2d');
    
    // Extract data for chart
    const labels = financialData.map(item => item.category);
    const data = financialData.map(item => parseFloat(item.percentage.replace('%', '')));
    const colors = [
        '#e74c3c', // Education Programs - Red
        '#f39c12', // Infrastructure Projects - Orange
        '#27ae60', // Health & Wellness - Green
        '#3498db', // Environmental Initiatives - Blue
        '#9b59b6'  // Administrative Costs - Purple
    ];
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverBorderWidth: 4,
                hoverBorderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '500'
                        },
                        color: '#2c3e50',
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#ffffff',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const category = context.label;
                            const percentage = context.parsed;
                            const amount = financialData[context.dataIndex].amount;
                            return `${category}: ${percentage}% (${amount})`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeOutQuart'
            },
            elements: {
                arc: {
                    borderWidth: 3,
                    hoverBorderWidth: 4
                }
            }
        }
    });
}

// Open project detail page
function openProjectDetail(projectId) {
    // Find the project to get its slug
    const project = projectsData.find(p => p.id === projectId);
    if (project && project.projectSlug) {
        // Use hash routing for compatibility with GitHub Pages
        window.location.href = `project.html#/${project.projectSlug}`;
    } else {
        // Fallback to localStorage method
        localStorage.setItem('selectedProjectId', projectId);
        window.location.href = 'project.html';
    }
}

// Update dashboard stats
function updateDashboardStats() {
    document.getElementById('projects-count').textContent = projectsData.length;
    document.getElementById('partnerships-count').textContent = partnershipsData.length;
    document.getElementById('awards-count').textContent = awardsData.length;
    
    // Calculate total budget
    const totalBudget = financialData.reduce((sum, item) => {
        const amount = parseFloat(item.amount.replace('₱', '').replace(',', ''));
        return sum + amount;
    }, 0);
    
    document.getElementById('budget-amount').textContent = `${(totalBudget / 1000000).toFixed(1)}M`;
}

// Add smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading animation for better UX
function showLoading(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #7f8c8d;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem;"></i>
            <p>Loading...</p>
        </div>
    `;
}

// Enhanced navigation with loading states
const originalShowProjects = showProjects;
const originalShowPartnerships = showPartnerships;
const originalShowFinancial = showFinancial;

showProjects = function() {
    document.querySelector('.dashboard-tiles').style.display = 'none';
    document.getElementById('projects-section').style.display = 'block';
    document.getElementById('partnerships-section').style.display = 'none';
    document.getElementById('financial-section').style.display = 'none';
    
    const container = document.getElementById('projects-container');
    showLoading(container);
    setTimeout(() => loadProjects(), 300);
};

showPartnerships = function() {
    document.querySelector('.dashboard-tiles').style.display = 'none';
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('partnerships-section').style.display = 'block';
    document.getElementById('financial-section').style.display = 'none';
    
    const container = document.getElementById('partnerships-container');
    showLoading(container);
    setTimeout(() => loadPartnerships(), 300);
};

showFinancial = function() {
    document.querySelector('.dashboard-tiles').style.display = 'none';
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('partnerships-section').style.display = 'none';
    document.getElementById('financial-section').style.display = 'block';
    
    const container = document.getElementById('financial-container');
    showLoading(container);
    setTimeout(() => loadFinancialData(), 300);
};
