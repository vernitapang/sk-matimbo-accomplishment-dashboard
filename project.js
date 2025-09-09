// Global variables to store loaded data
let projectsData = [];
let committeesData = [];
let sdgData = [];

// Load all data when page loads
document.addEventListener('DOMContentLoaded', async function() {
    try {
        console.log('Loading data files...');
        
        // Load projects data
        const projectsResponse = await fetch('./data/projects.json');
        if (!projectsResponse.ok) throw new Error(`Failed to load projects: ${projectsResponse.status}`);
        projectsData = await projectsResponse.json();
        console.log('Projects loaded:', projectsData.length);
        
        // Load committees data
        const committeesResponse = await fetch('./data/committees.json');
        if (!committeesResponse.ok) throw new Error(`Failed to load committees: ${committeesResponse.status}`);
        committeesData = await committeesResponse.json();
        
        // Load SDG data
        const sdgResponse = await fetch('./data/sdg.json');
        if (!sdgResponse.ok) throw new Error(`Failed to load SDG data: ${sdgResponse.status}`);
        sdgData = await sdgResponse.json();
        
        console.log('All data loaded successfully');
        
        // Load project details
        loadProjectDetail();
        
        // Initialize additional features
        addStatusStyles();
        initializeKeyboardNavigation();
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('project-detail').innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #7f8c8d;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #f39c12;"></i>
                <h3>Error Loading Data</h3>
                <p>${error.message}</p>
                <button class="back-btn" onclick="window.location.href='index.html'" style="margin-top: 1rem;">
                    <i class="fas fa-arrow-left"></i> Back to Dashboard
                </button>
            </div>
        `;
    }
});

// Helper function to get committee by ID
function getCommitteeById(committeeId) {
    return committeesData[committeeId];
}

// Helper function to get SDG by ID
function getSdgById(sdgId) {
    return sdgData[sdgId.toString()];
}


// Load project details based on URL hash or localStorage
function loadProjectDetail() {
    let project = null;
    
    // Try to get project from hash URL first
    const hash = window.location.hash;
    console.log('Current hash:', hash);
    
    if (hash && hash.startsWith('#/')) {
        // Extract slug from hash (e.g., #/project-slug)
        const projectSlug = decodeURIComponent(hash.substring(2)); // Remove '#/' prefix and decode URL
        console.log('Looking for project with slug:', projectSlug);
        console.log('Available projects:', projectsData.map(p => p.projectSlug));
        
        if (projectSlug) {
            project = projectsData.find(p => p.projectSlug === projectSlug);
            console.log('Found project:', project ? project.title : 'Not found');
        }
    }
    
    // Fallback to localStorage if no hash route
    if (!project) {
        const projectId = parseInt(localStorage.getItem('selectedProjectId'));
        console.log('Fallback to localStorage ID:', projectId);
        project = projectsData.find(p => p.id === projectId);
    }
    
    if (!project) {
        document.getElementById('project-detail').innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #7f8c8d;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #f39c12;"></i>
                <h3>Project Not Found</h3>
                <p>The requested project could not be found.</p>
                <button class="back-btn" onclick="window.location.href='index.html'" style="margin-top: 1rem;">
                    <i class="fas fa-arrow-left"></i> Back to Dashboard
                </button>
            </div>
        `;
        return;
    }
    
    const projectDetailHtml = `
        <div class="project-detail-header">
            <h1 class="project-detail-title">${project.title}</h1>
        </div>

        <div class="project-details-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
            <div class="detail-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                <div class="detail-label" style="font-weight: 600; margin-bottom: 0.25rem;">Location</div>
                <div class="detail-value">${project.location}</div>
            </div>
            <div class="detail-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                <div class="detail-label" style="font-weight: 600; margin-bottom: 0.25rem;">Attendees</div>
                <div class="detail-value">${project.attendees} participants</div>
            </div>
            <div class="detail-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                <div class="detail-label" style="font-weight: 600; margin-bottom: 0.25rem;">Budget</div>
                <div class="detail-value">${project.budget}</div>
            </div>
            <div class="detail-card" style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                <div class="detail-label" style="font-weight: 600; margin-bottom: 0.25rem;">Status</div>
                <div class="detail-value" style="padding: 0.25rem 0.75rem; border-radius: 20px; display: inline-block; font-weight: 600; ${project.status.toLowerCase() === 'completed' ? 'background: #d5f4e6; color: #27ae60;' : 'background: #fef9e7; color: #f39c12;'}">${project.status}</div>
            </div>
        </div>

        <div class="project-detail-description" style="margin: 2rem 0;">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">Project Description</h3>
            <p>${project.description}</p>
        </div>
        
        <div class="project-sdgs" style="margin: 2rem 0;">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">Sustainable Development Goals</h3>
            <div class="sdg-grid">
                ${project.sdgs.map(sdgId => {
                    const sdg = getSdgById(sdgId);
                    return `
                        <div class="sdg-badge" style="background: white; border: 2px solid ${sdg.color};">
                            <img src="${sdg.image}" alt="SDG ${sdgId}: ${sdg.name}" class="sdg-image" />
                            <div class="sdg-name" style="color: ${sdg.color};">${sdg.name}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #ecf0f1;">
            <h4 style="margin-bottom: 1rem; color: #2c3e50;">Project Impact</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #e74c3c; margin-bottom: 0.5rem;">${project.attendees}</div>
                    <div style="color: #7f8c8d; font-size: 0.9rem;">People Reached</div>
                </div>
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #27ae60; margin-bottom: 0.5rem;">${project.budget}</div>
                    <div style="color: #7f8c8d; font-size: 0.9rem;">Budget Allocated</div>
                </div>
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: #3498db; margin-bottom: 0.5rem;">${project.duration}</div>
                    <div style="color: #7f8c8d; font-size: 0.9rem;">Project Duration</div>
                </div>
            </div>
        </div>
        
        <div class="project-committee" style="margin: 2rem 0;">
            <div class="committee-header" style="background: background-color: #7f8c8d; color: black; padding: 1rem 1.5rem; border-radius: 8px 8px 0 0; margin-bottom: 0;">
                <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem;">
                    <i class="fas fa-sitemap"></i> ${committeesData[project.committeeId].name}
                </h4>
            </div>
            <div class="committee-structure" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; background: #f8f9fa; padding: 1.5rem; border-radius: 0 0 8px 8px;">
                <div class="committee-leadership" style="background: white; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #e74c3c;">
                    <h4 style="color: #e74c3c; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-crown"></i> Committee Leadership
                    </h4>
                    <div class="leader-item" style="margin-bottom: 1rem;">
                        <div style="font-weight: 600; color: #2c3e50; margin-bottom: 0.25rem;">
                            <i class="fas fa-user-tie" style="color: #e74c3c; margin-right: 0.5rem;"></i>
                            Chairperson
                        </div>
                        <div style="color: #7f8c8d; padding-left: 1.5rem;">${committeesData[project.committeeId].chairperson}</div>
                    </div>
                    <div class="leader-item">
                        <div style="font-weight: 600; color: #2c3e50; margin-bottom: 0.25rem;">
                            <i class="fas fa-user-friends" style="color: #f39c12; margin-right: 0.5rem;"></i>
                            Co-Chairperson
                        </div>
                        <div style="color: #7f8c8d; padding-left: 1.5rem;">${committeesData[project.committeeId].coChairperson}</div>
                    </div>
                </div>
                
                <div class="committee-members" style="background: white; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3498db;">
                    <h4 style="color: #3498db; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-users"></i> Committee Members
                    </h4>
                    <div class="members-list">
                        ${committeesData[project.committeeId].members.map(member => `
                            <div class="member-item" style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; padding: 0.5rem; background: #f8f9fa; border-radius: 6px;">
                                <i class="fas fa-user" style="color: #3498db; font-size: 0.9rem;"></i>
                                <span style="color: #2c3e50; font-weight: 500;">${member}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        
        ${project.images && project.images.length > 0 ? `
            <div class="project-gallery">
                <h4>Project Gallery</h4>
                <div class="gallery-grid">
                    ${project.images.map((image, index) => `
                        <div class="gallery-item" onclick="openImageModal('${image}', '${project.title}', ${index + 1})" style="position: relative; cursor: pointer; border-radius: 8px; overflow: hidden;">
                            <img src="${image}" alt="${project.title} - Image ${index + 1}" style="width: 100%; height: 200px; object-fit: cover;">
                            <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                                ${index + 1}/${project.images.length}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
    
    document.getElementById('project-detail').innerHTML = projectDetailHtml;
    
    // Update page title
    document.title = `${project.title} - Sangguniang Kabataan ng Matimbo`;
}

// Open image modal (placeholder function for future enhancement)
function openImageModal(image, projectTitle, imageNumber) {
    // Create a simple modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    modal.innerHTML = `
        <div style="text-align: center; color: white; max-width: 90vw; max-height: 90vh;">
            <img src="${image}" alt="${projectTitle}" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px;">
            <h3 style="margin-top: 1rem;">${projectTitle}</h3>
            <p>Image ${imageNumber}</p>
            <p style="font-size: 0.9rem; opacity: 0.7; margin-top: 1rem;">Click anywhere to close</p>
        </div>
    `;
    
    modal.onclick = () => document.body.removeChild(modal);
    document.body.appendChild(modal);
}

// Add status badge styles
function addStatusStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .status-active {
            background: #d5f4e6;
            color: #27ae60;
        }
        
        .status-completed {
            background: #e8f4fd;
            color: #3498db;
        }
        
        .status-pending {
            background: #fef9e7;
            color: #f39c12;
        }
        
        .gallery-item {
            position: relative;
        }
    `;
    document.head.appendChild(style);
}

// Add keyboard navigation for modals
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('[style*="position: fixed"]');
            modals.forEach(modal => {
                if (modal.style.zIndex === '1000') {
                    document.body.removeChild(modal);
                }
            });
        }
    });
}
