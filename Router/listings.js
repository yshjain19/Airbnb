const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggidn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../Controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage: storage });

// ===================== LISTINGS COLLECTION =====================
router.route("/")
  .get(wrapAsync(listingsController.index))
  .post(isloggidn, upload.single("image"), validateListing, wrapAsync(listingsController.createListing));

// ===================== SHOW NEW LISTING FORM =====================
router.get("/new", isloggidn, listingsController.renderNewForm);

// ===================== INDIVIDUAL LISTING =====================
router.route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(isloggidn, isOwner, upload.single("image"), validateListing, wrapAsync(listingsController.updateListing))
  .delete(isloggidn, isOwner, wrapAsync(listingsController.deleteListing));

// ===================== SHOW EDIT FORM =====================
router.get("/:id/edit", isloggidn, isOwner, wrapAsync(listingsController.renderEditForm));

module.exports = router