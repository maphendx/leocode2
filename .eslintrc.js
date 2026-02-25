module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error', // Keep it as error by default
  },
  overrides: [
    // Add an override for specific files if needed
    {
      files: ['src/app/api/**/*.ts'],
      rules: {
        // Relax the rule for API routes if they need more flexibility
        '@typescript-eslint/no-explicit-any': 'warn', // Downgrade to warning temporarily
      },
    },
    {
      // Apply this rule exception only to the form submission API
      files: ['src/app/api/submit-form/route.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};