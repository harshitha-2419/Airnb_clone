const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner ,validateListing} = require('../middleware.js');
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const {storage} = require('../cloudConfig.js'); // Import cloudinary storage configuration
const upload = multer({ storage }); // Set up multer for file uploads



router.route('/')
    .get(wrapAsync(listingController.index))   //index route
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,
    wrapAsync(listingController.createListing)); //create route
   

//new route aways on top of show route
router.get('/new',isLoggedIn,listingController.renderNewForm );

router.route('/:id')
    .get(wrapAsync(listingController.showListing))  //show route
    .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing , wrapAsync(listingController.updateListing)) //update route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));  //delete route
    

//edit route
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;