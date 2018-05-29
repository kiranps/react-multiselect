module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactMultiSelect',
      externals: {
        react: 'React'
      }
    }
  }
}
