const express = require('express');
const router = express.Router();
const Patient= require('../models/patient');

// Route pour l'inscription
router.post('/addpatient', async (req, res) => {
  try {
    const { firstname, familyname,  email,phone,age,date } = req.body;
    const patient = new Patient({ firstname, familyname,  email,phone,age,date });
    await patient .save();
    res.status(201).json({ message: 'patient registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get( '/getpatient' , (req, res)=>{
     
    Patient.find()
        .then(
            (allpatient)=>{
                res.send(allpatient);
            }
        )
        .catch(
            (error)=>{
                res.send(error);
            }
        )

} )
router.delete( '/supprimer/:id' , (req , res)=>{
    let id = req.params.id;
    
    Patient.findByIdAndDelete( { _id: id } )
       .then(
           (deletedPatient)=>{
               res.send(deletedPatient);
           }
       )
       .catch(
           (err)=>{
               res.send(err);
           }
       )

} )
router.put( '/update/:id' , (req , res)=>{
    let id = req.params.id;
    let newData = req.body;
    Patient.findOneAndUpdate( 
        { _id: id },
        newData
    ) .then(
        (updatedpatient)=>{
            res.send(updatedpatient)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }

    )
} )
router.get('/getbyid/:id' , (req, res)=>{
  
    let myid = req.params.id;

    Patient.findOne({ _id: myid })
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