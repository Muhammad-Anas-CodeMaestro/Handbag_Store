module.exports = {
  plugins: {
    "@tailwindcss/postcss": { config: require.resolve('./tailwind.config.cjs') },
    autoprefixer: {},
  },
}