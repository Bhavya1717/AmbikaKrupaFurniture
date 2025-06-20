# CraftWood Furniture Website Template

A complete HTML/CSS/JavaScript template for a custom furniture business website with modern animations and responsive design.

## 🚀 Features

- **Responsive Design**: Works perfectly on all devices
- **Modern Animations**: Smooth scroll animations, hover effects, and transitions
- **Interactive Components**: Modals, forms, image galleries, and contact features
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Performance Optimized**: Fast loading with optimized assets
- **Cross-browser Compatible**: Works on all modern browsers

## 📁 File Structure

```
Template/
├── index.html          # Home page
├── about.html          # About us page
├── products.html       # Products catalog
├── gallery.html        # Project gallery
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js          # Main JavaScript file
├── products.js        # Products page functionality
├── gallery.js         # Gallery page functionality
├── contact.js         # Contact page functionality
└── README.md          # This file
```

## 🎨 Design Features

### Color Scheme
- Primary Brown: `#8B4513`
- Secondary Brown: `#D2691E`
- Light Brown: `#F5E6D3`
- Dark Brown: `#5D2F02`
- Cream: `#FFF8DC`

### Typography
- Font Family: Inter (Google Fonts)
- Responsive text sizing
- Clear hierarchy with proper headings

### Animations
- GSAP-powered animations
- Scroll-triggered animations
- Hover effects and transitions
- Loading animations
- Smooth scrolling

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: Professional animations library
- **Font Awesome**: Icon library
- **Google Fonts**: Typography

## 📱 Pages Overview

### 1. Home Page (index.html)
- Hero section with call-to-action
- Featured products showcase
- Gallery preview
- About section
- Contact information
- Statistics counters

### 2. Products Page (products.html)
- Product filtering system
- Detailed product cards
- Pricing information
- Customization options
- Interactive product showcase

### 3. Gallery Page (gallery.html)
- Project portfolio
- Category filtering
- Modal viewer
- Project details
- Before/after showcases

### 4. About Page (about.html)
- Company story
- Team members
- Values and mission
- Statistics and achievements
- Call-to-action sections

### 5. Contact Page (contact.html)
- Contact form
- Multiple contact methods
- Showroom information
- FAQ section
- Interactive elements

## 🚀 Getting Started

1. **Download/Clone the template**
   ```bash
   git clone [repository-url]
   cd Template
   ```

2. **Open in a web server**
   - Use Live Server extension in VS Code
   - Or use Python: `python -m http.server 8000`
   - Or use Node.js: `npx http-server`

3. **Customize the content**
   - Update contact information
   - Replace images with your own
   - Modify colors in `styles.css`
   - Update product data in `products.js`
   - Update gallery data in `gallery.js`

## 📞 Contact Information

Update these throughout the files:
- Phone: `+91 98765 43210`
- Email: `info@craftwood.com`
- Address: `123 Craftsman Lane, Furniture District, City 560001`
- WhatsApp: `https://wa.me/919876543210`

## 🎯 Customization Guide

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --brown-primary: #8B4513;
    --brown-secondary: #D2691E;
    --brown-light: #F5E6D3;
    --brown-dark: #5D2F02;
    --cream: #FFF8DC;
}
```

### Adding Products
Edit the products array in `products.js`:
```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: "₹25,000",
        category: "beds",
        image: "image-url",
        description: "Product description",
        // ... more properties
    }
];
```

### Adding Gallery Items
Edit the galleryProjects array in `gallery.js`:
```javascript
const galleryProjects = [
    {
        id: 1,
        title: "Project Title",
        category: "Bedroom",
        image: "image-url",
        description: "Project description",
        // ... more properties
    }
];
```

## 📊 Performance Features

- Optimized images with lazy loading
- Minified CSS and JavaScript (in production)
- Efficient animations with GSAP
- Responsive images for different screen sizes
- Fast-loading external libraries via CDN

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📈 SEO Features

- Semantic HTML structure
- Meta descriptions and titles
- Open Graph tags ready
- Schema markup ready
- Clean URL structure
- Fast loading times

## 🎨 Animation Details

### Scroll Animations
- Fade in from different directions
- Scale animations
- Staggered animations
- Intersection Observer API

### Hover Effects
- Smooth transitions
- Scale and transform effects
- Color transitions
- Shadow effects

### Interactive Elements
- Form validations
- Modal animations
- Button hover states
- Navigation effects

## 🔒 Security Features

- Form validation
- Input sanitization
- XSS protection ready
- Safe external links

## 📱 Mobile Optimization

- Responsive design
- Touch-friendly interfaces
- Mobile-optimized animations
- Fast mobile loading

## 🎵 Migration Tips

This template is designed for easy migration to other technologies:

1. **React/Vue**: Component structure is already logical
2. **WordPress**: Easy to convert to PHP templates
3. **CMS Integration**: Clean HTML structure for any CMS
4. **E-commerce**: Ready for shopping cart integration

## 📝 License

This template is provided as-is for educational and commercial use. Please attribute the original source when possible.

## 🆘 Support

For customization help or technical support:
- Review the code comments
- Check browser console for errors
- Ensure all external libraries are loading
- Test on multiple devices and browsers

## 🔄 Updates

To stay updated with the latest features:
- Check for newer versions of external libraries
- Monitor browser compatibility
- Update contact information as needed
- Refresh images and content regularly

---

**Ready to use!** Simply open `index.html` in a web browser to see the complete website in action.