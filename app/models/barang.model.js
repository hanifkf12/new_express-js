const mongoose = require('mongoose');

const BarangSchema = mongoose.Schema({
    nama: String,
    harga: Number
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Barang', BarangSchema);