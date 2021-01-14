const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

let User = require('../models/user.model')
let Hangtag = require('../models/hangtag.model')
let Batch = require('../models/batch.model')

router.post('/createbatch', passport.authenticate('bearer', { session: false }), (req, res) => {
    if (req.user.type === 'admin') {
        const newBatch = new Batch(req.body)
        
        newBatch.save()
        .then(batch => {
            let Hangtags = []
            for (let i=0; i<req.body.quantity;i++) {
                Hangtags.push({
                    batchId: batch._id
                })
            }
            Hangtag.insertMany(Hangtags, (err, hangtags) => {
                if (!err) res.send('Batch add successful!')
                else console.log(err)
            })
        })
    } else res.status('401').send({message: 'Access is denied'})
})

router.post('/deletebatch', passport.authenticate('bearer', { session: false }), (req, res) => {
    if (req.user.type === 'admin') {
        Promise.all([
            Batch.deleteMany({_id: req.body.batchId}),
            Hangtag.deleteMany({batchId:req.body.batchId})
        ])
        .then(results => res.send('Successfully deleted batch!'))
        .catch(err => console.log(err))
    } else res.status('401').send({message: 'Access is denied'})
})

router.get('/', passport.authenticate('bearer', { session: false }), (req, res) => {
    if (req.user.type === 'admin') {
        let opt = []
        Batch.find({})
        .then(batches => {
            if (batches.length > 0) {
                let flag= false
                batches.map((batch, i) => {
                    opt[i] = {}
                    opt[i]['id'] = batch._id
                    opt[i]['name'] =batch.name
                    opt[i]['quantity'] = batch.quantity
                    opt[i]['createdAt'] = batch.createdAt
                    opt[i]['discountPercentage'] = batch.discountPercentage
                    opt[i]['discountValue'] = batch.discountValue
                    if (i == batches.length-1) res.send(opt)
                })
            } else res.send(opt)
        })
    } else res.status('401').send({message: 'Access is denied'})
})

router.get('/view', (req, res) => {
    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
        Hangtag.findById(req.query.id)
        .then((hangtag)=> {
            if (!hangtag)  res.status('404').send({message: 'ID not found'})
            Batch.findById(hangtag.batchId)
            .then((batch) => {
                if (!batch)  res.status('404').send({message: 'Batch not found'})
                res.send({hangtag, batch})
            })
        })
    } else res.status('422').send({message: 'Invalid input'})
})

router.get('/setownership', passport.authenticate('bearer', { session: false }), (req, res) => {
    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
        Hangtag.findById(req.query.id)
        .then((hangtag)=> {
            if (!hangtag)  res.status('404').send({message: 'ID not found'})
            else if (hangtag.ownerId) res.status('409').send({message: 'Invalid input'})
            else {
                hangtag.ownerId = req.user._id

                hangtag.save()
                .then((response)=>{
                    Batch.findById(hangtag.batchId)
                    .then(batch => {
                        if (!batch)  res.status('404').send({message: 'Batch not found'})

                        req.user.ownedHangTags.push(req.query.id)
                        req.user.discountValueWallet += batch.discountValue
                        req.user.discountPercentageWallet += batch.discountPercentage
                        req.user.save()
                        .then(() => res.send('Successful'))
                    })
                })
            }
        })
    } else res.status('422').send({message: 'Invalid input'})
})

router.get('/bybatch?', passport.authenticate('bearer', { session: false }), (req, res) => {
    if (req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
        Hangtag.find({batchId: req.query.id})
        .then((hangtags) => {
            res.send(hangtags)
        })
    }
})
module.exports = router