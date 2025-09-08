// Council members data
let councilMembersData = [];

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

// Load council members data when page loads
async function loadCouncilMembers() {
    try {
        const response = await fetch('./data/council-members.json');
        councilMembersData = await response.json();
        displayCouncilMembers();
    } catch (error) {
        console.error('Error loading council members:', error);
    }
}

// Display council members dynamically
function displayCouncilMembers() {
    // Find chairman
    const chairman = councilMembersData.find(member => member.role === 'chairman');
    
    // Find councilors
    const councilors = councilMembersData.filter(member => member.role === 'councilor');
    
    // Find officers (secretary and treasurer)
    const officers = councilMembersData.filter(member => member.role === 'secretary' || member.role === 'treasurer');
    
    // Display chairman
    if (chairman) {
        displayChairman(chairman);
    }
    
    // Display councilors
    displayCouncilors(councilors);
    
    // Display officers
    displayOfficers(officers);
}

function displayChairman(chairman) {
    const chairmanContainer = document.querySelector('.chairman-card');
    if (chairmanContainer) {
        chairmanContainer.innerHTML = `
            <div class="member-photo-placeholder">
                <i class="fas fa-user"></i>
                <span>Photo Coming Soon</span>
            </div>
            <div class="member-info">
                <h3>${chairman.name}</h3>
                <p class="member-title">${chairman.position}</p>
                <p class="member-committee">${chairman.committee}</p>
                <p class="member-description">Leading the Sangguniang Kabataan ng Matimbo with dedication and vision for youth empowerment and community development.</p>
            </div>
        `;
    }
}

function displayCouncilors(councilors) {
    const councilGrid = document.querySelector('.council-grid');
    if (councilGrid) {
        councilGrid.innerHTML = '';
        
        councilors.forEach(councilor => {
            const councilCard = document.createElement('div');
            councilCard.className = 'member-card';
            
            councilCard.innerHTML = `
                <div class="member-photo-placeholder">
                    <i class="fas fa-user"></i>
                    <span>Photo Coming Soon</span>
                </div>
                <div class="member-info">
                    <h4>${councilor.name}</h4>
                    <p class="member-title">${councilor.position}</p>
                    <p class="member-committee">${councilor.committee}</p>
                </div>
            `;
            
            councilGrid.appendChild(councilCard);
        });
    }
}

function displayOfficers(officers) {
    const officersGrid = document.querySelector('.officers-grid');
    if (officersGrid) {
        officersGrid.innerHTML = '';
        
        officers.forEach(officer => {
            const officerCard = document.createElement('div');
            officerCard.className = 'member-card';
            
            let description = '';
            if (officer.role === 'secretary') {
                description = 'Responsible for maintaining accurate records and documentation of all SK activities and meetings.';
            } else if (officer.role === 'treasurer') {
                description = 'Managing the financial resources and ensuring transparent and accountable use of SK funds.';
            }
            
            officerCard.innerHTML = `
                <div class="member-photo-placeholder">
                    <i class="fas fa-user"></i>
                    <span>Photo Coming Soon</span>
                </div>
                <div class="member-info">
                    <h4>${officer.name}</h4>
                    <p class="member-title">${officer.position}</p>
                    <p class="member-description">${description}</p>
                </div>
            `;
            
            officersGrid.appendChild(officerCard);
        });
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    loadCouncilMembers();
});
