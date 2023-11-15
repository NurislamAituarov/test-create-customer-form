const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/test-create-customer-form/' : '/',
  transpileDependencies: true,
});
