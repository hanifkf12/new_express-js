module.exports = (app) => {
    const barangs = require('../controllers/barang.controller');

    app.post('/barangs', barangs.create);
    app.get('/barangs', barangs.read);
}