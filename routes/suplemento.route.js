const express = require('express');
const app = express();
const suplementoRoutes = express.Router();

let Suplemento = require('../model/Suplemento');

// api to add suplemento
suplementoRoutes.route('/add').post(function (req, res) {
  let suplemento = new Suplemento(req.body);
  suplemento.save()
  .then(suplemento => {
    res.status(200).json({'status': 'success','mssg': 'suplemento added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get suplementos
suplementoRoutes.route('/').get(function (req, res) {
  Suplemento.find(function (err, suplementos){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','suplementos': suplementos});
    }
  });
});

// api to get suplemento
suplementoRoutes.route('/suplemento/:id').get(function (req, res) {
  let id = req.params.id;
  Suplemento.findById(id, function (err, suplemento){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','suplemento': suplemento});
    }
  });
});

// api to update route
suplementoRoutes.route('/update/:id').put(function (req, res) {
    Suplemento.findById(req.params.id, function(err, suplemento) {
    if (!suplemento){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        suplemento.name = req.body.name;
        suplemento.marca = req.body.marca;
        suplemento.notaQualidade = req.body.notaQualidade;

        suplemento.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
suplementoRoutes.route('/delete/:id').delete(function (req, res) {
  Suplemento.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = suplementoRoutes;