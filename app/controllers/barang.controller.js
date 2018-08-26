const Barang = require('../models/barang.model');

exports.create = (req, res) => {
    if (!req.body.nama) {
        return res.status(400).send({
            message: "Note content can create"
        });
    }

    const barang = new Barang({
        nama: req.body.nama|| "Untitled Nothing",
        harga: req.body.harga
    });

    barang.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some eror"
            });
        });
};