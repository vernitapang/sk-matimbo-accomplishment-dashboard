# Sangguniang Kabataan Accomplishment Dashboard

A modern, responsive web dashboard for tracking Sangguniang Kabataan projects, partnerships, and financial transparency. Built with a sustainable development goals (SDG) inspired design.

## Features

### 🎯 Main Dashboard
- **SDG-style tiles** displaying key metrics
- **Projects counter** showing active community initiatives
- **Partnerships counter** tracking collaborative relationships
- **Financial transparency** with budget allocation overview
- **Interactive navigation** with smooth transitions

### 📊 Projects Section
- **Project grid view** with visual cards
- **Detailed project information** including:
  - Project title and description
  - Number of attendees
  - Project status (Active/Completed/Pending)
  - Visual representations with emojis
- **Clickable project cards** leading to detailed project pages

### 🤝 Partnerships Section
- **Partnership listings** with organization details
- **Partnership types** (Government, Private Sector, NGO, Academic)
- **Status indicators** showing active/pending partnerships
- **Collaborative relationship descriptions**

### 💰 Financial Transparency
- **Budget breakdown** by category
- **Percentage allocations** for each spending area
- **Total budget overview** (₱2.5M for FY 2024)
- **Detailed spending descriptions**

### 📱 Individual Project Pages
- **Comprehensive project details** including:
  - Full project description
  - Number of attendees
  - Project duration and budget
  - Location information
  - Project status
- **Interactive image gallery** with modal view
- **Project impact metrics**
- **Responsive design** for all devices

### 👥 About Page
- **SK Council members display** with roles and positions
- **Chairman showcase** with dedicated section
- **Council member profiles** in grid layout
- **Committee assignments** and responsibilities
- **Awards and achievements** display

## Technology Stack

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - Dynamic content loading and interactions
- **Font Awesome** - Icon library for visual elements
- **Google Fonts (Inter)** - Modern typography

## File Structure

```
sk-matimbo-accomplishment-dashboard/
├── data/                   # JSON data files
│   ├── projects/           # Individual project data folders
│   │   ├── 1/             # Project 1 assets
│   │   └── 2/             # Project 2 assets
│   ├── awards.json        # Awards and achievements data
│   ├── committees.json    # Committee information
│   ├── council-members.json # Council member profiles
│   ├── financial.json     # Financial transparency data
│   ├── partnerships.json  # Partnership information
│   ├── projects.json      # Projects listing and details
│   └── sdg.json          # SDG goals and metrics
├── index.html             # Main dashboard page
├── about.html            # About the council page
├── project-detail.html   # Individual project detail page
├── styles.css            # Main stylesheet with responsive design
├── script.js             # Main JavaScript functionality
├── about.js              # About page functionality
├── project-detail.js     # Project detail page functionality
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. Navigate through the dashboard using the interactive tiles

### Usage

#### Main Dashboard
1. **View Overview**: See total projects, partnerships, and budget at a glance
2. **Navigate Sections**: Click on any tile to explore detailed information
3. **Return to Dashboard**: Use the "Back to Dashboard" button from any section

#### Exploring Projects
1. **Browse Projects**: Click the "Projects" tile to view all initiatives
2. **View Details**: Click any project card to see comprehensive information
3. **Gallery Interaction**: Click gallery images for enlarged modal view

#### Financial Transparency
1. **Budget Overview**: Click "Financial Transparency" to see spending breakdown
2. **Category Details**: Review allocation percentages and descriptions
3. **Total Budget**: View complete financial summary

#### About the Council
1. **Access About Page**: Navigate through the dashboard or direct link
2. **View Chairman Profile**: See the SK Chairman's information and vision
3. **Browse Council Members**: Explore council member profiles and roles
4. **Committee Information**: Learn about different committees and their functions
5. **Awards & Achievements**: View recognitions received by the council

## Design Features

### Color Scheme (SDG-Inspired)
- **Projects**: Red gradient (#e74c3c to #c0392b)
- **Partnerships**: Orange gradient (#f39c12 to #e67e22)
- **Financial**: Green gradient (#27ae60 to #229954)
- **Background**: Purple gradient (#667eea to #764ba2)

### Responsive Design
- **Desktop**: Full grid layout with hover effects
- **Tablet**: Adapted grid with optimized spacing
- **Mobile**: Single column layout with touch-friendly interactions

### User Experience
- **Smooth animations** and transitions
- **Loading states** for better perceived performance
- **Hover effects** for interactive feedback
- **Modal galleries** for image viewing
- **Keyboard navigation** support (ESC to close modals)

## Customization

### Data Management

All data is stored in JSON files within the `data/` directory for easy maintenance and updates:

#### Adding New Projects
1. Edit `data/projects.json`
2. Add new project objects with required fields:
   - id, title, description, attendees, status, date, images
3. Create a corresponding folder in `data/projects/` for project assets

#### Modifying Partnerships
1. Edit `data/partnerships.json`
2. Update partnership information, type, and status

#### Updating Financial Data
1. Modify `data/financial.json`
2. Ensure percentages add up to 100%
3. Update total budget and category allocations

#### Managing Council Members
1. Edit `data/council-members.json`
2. Update member profiles, positions, and committees

#### Adding Awards
1. Update `data/awards.json`
2. Include award title, date, and description

#### SDG Goals
1. Modify `data/sdg.json`
2. Update SDG alignments and impact metrics

### Styling Changes
1. Edit `styles.css` for visual modifications
2. Update CSS custom properties for color scheme changes
3. Modify responsive breakpoints as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers
5. Submit a pull request

## Contact

For questions or support regarding the Sangguniang Kabataan Accomplishment Dashboard, please contact [verni.tapang@gmail.com](mailto:verni.tapang@gmail.com)

---

**Built with ❤️ for transparent governance and community development**
