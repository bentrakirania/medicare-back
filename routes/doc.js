const express = require('express');

const router = express.Router();

const Doctor = require('../models/doctor.js');

const multer = require('multer');

let filename = '';
const mystorage = multer.diskStorage(
    {
        destination: './upload',
        filename:( req , file , cb )=>{
            let date = Date.now();
            //53453535345.jpg
            // image/png
            // [ 'image', 'png' ]
            let fl = date + '.' + file.mimetype.split('/')[1];
            cb(null, fl);
            filename = fl;
        } 
    }
);

const upload = multer({ storage: mystorage })

// ajout avec upload
router.post( '/create' , upload.any('image') , ( req , res )=>{
    let dataFromPostman = req.body;
    let doctor = new Doctor( dataFromPostman );
    doctor.image = filename;
    doctor.save()
          .then(
              (savedDoctor)=>{
                  filename = '';
                  console.log(savedDoctor);
                  res.send(savedDoctor);
              }
          )
          .catch(
              (error)=>{
                  console.log(error);
                  res.send(error)
              }
          )
  } );
 
  router.get( '/getdoctor' , (req, res)=>{
     
    Doctor.find()
        .then(
            (alldoctor)=>{
                res.send(alldoctor);
            }
        )
        .catch(
            (error)=>{
                res.send(error);
            }
        )

} )
router.delete( '/delete/:id' , (req , res)=>{
    let id = req.params.id;
    
    Doctor.findByIdAndDelete( { _id: id } )
       .then(
           (deletedDoctor)=>{
               res.send(deletedDoctor);
           }
       )
       .catch(
           (err)=>{
               res.send(err);
           }
       )

} )
router.put( '/updoctor/:id' , (req , res)=>{
    let id = req.params.id;
    let newData = req.body;
    console.log(newData);

    Doctor.findOneAndUpdate( 
        { _id: id },
        newData
 
    ) .then(
        (updateddoctor)=>{
            res.send(updateddoctor)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }

    )
} )
router.get('/getdoctorbyid/:id' , (req, res)=>{
  
    let myid = req.params.id;

    Doctor.findOne({ _id: myid })
                .then(
                    (art)=>{
                        res.send(art);
                    }
                )
                .catch(
                    (err)=>{
                        res.send(err)
                    }
                )

})
module.exports = router;