# Contributing Guide

Thank you for considering contributing to this project! This guide will help you get started.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/google-sheets-crud.git
   cd google-sheets-crud
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Workflow

### 1. Make Your Changes

- Follow the existing code style
- Write clear, descriptive commit messages
- Add comments for complex logic
- Keep changes focused and atomic

### 2. Code Style

This project uses:
- **React functional components** with hooks
- **Tailwind CSS** for styling
- **ESLint** for code linting
- **Prettier** for code formatting (optional)

### 3. File Structure

When adding new features:

```
src/
  components/     # Reusable UI components
  pages/          # Page components (routes)
  services/       # API and external services
  hooks/          # Custom React hooks
  utils/          # Utility functions
  styles/         # Global styles
```

### 4. Component Guidelines

**Good Component Example:**

```jsx
import React, { useState } from 'react';
import Button from '../components/Button';

const MyComponent = ({ title, onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold">{title}</h2>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        className="form-input"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default MyComponent;
```

### 5. Testing

Before submitting:

```bash
# Run the dev server
npm run dev

# Build for production
npm run build

# Test the production build
npm run preview
```

Test your changes:
- [ ] All pages load correctly
- [ ] Forms validate properly
- [ ] CRUD operations work
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors

## 📋 Pull Request Process

1. **Update documentation** if needed
2. **Add screenshots** for UI changes
3. **Create a Pull Request** with:
   - Clear title
   - Description of changes
   - Related issue numbers (if applicable)
4. **Wait for review**

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All features work as expected
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Fixes #(issue number)
```

## 🐛 Bug Reports

When reporting bugs, include:

1. **Description** - Clear description of the bug
2. **Steps to Reproduce** - Detailed steps
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment** - Browser, OS, Node version
6. **Screenshots** - If applicable
7. **Console Errors** - Any error messages

## 💡 Feature Requests

For new features, include:

1. **Use Case** - Why is this needed?
2. **Proposed Solution** - How should it work?
3. **Alternatives** - Other approaches considered
4. **Additional Context** - Any other relevant info

## 🎨 Style Guide

### JavaScript/React

- Use functional components with hooks
- Use arrow functions for components
- Destructure props
- Use meaningful variable names
- Keep functions small and focused

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Use existing design tokens
- Keep custom CSS minimal

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.js`)
- **Utils**: camelCase (e.g., `formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

## 🔍 Code Review Guidelines

When reviewing PRs:

- Be constructive and respectful
- Explain the "why" behind suggestions
- Approve changes that improve the codebase
- Request changes for critical issues

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Vite Documentation](https://vitejs.dev)

## 🎯 Areas for Contribution

Looking for ideas? Consider:

- [ ] Add unit tests
- [ ] Improve accessibility (a11y)
- [ ] Add dark mode
- [ ] Implement search/filter functionality
- [ ] Add export to CSV feature
- [ ] Improve error handling
- [ ] Add loading skeletons
- [ ] Implement pagination
- [ ] Add sorting capabilities
- [ ] Improve mobile UX
- [ ] Add keyboard shortcuts
- [ ] Implement undo/redo
- [ ] Add batch operations
- [ ] Improve documentation

## 📞 Questions?

If you have questions:
- Open an issue with the "question" label
- Check existing issues first
- Be clear and specific

## 🎉 Thank You!

Your contributions make this project better for everyone!

---

**Happy Coding! 🚀**
