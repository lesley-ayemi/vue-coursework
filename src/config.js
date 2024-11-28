export const API_BASE_URL = 'http://localhost:4000/api';
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
            },
        },
    },
};
