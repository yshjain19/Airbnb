const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggidn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../Controllers/listings.js");

// ===================== READ ALL LISTINGS =====================
router.get("/", wrapAsync(listingsController.index));

// ===================== SHOW NEW LISTING FORM =====================
router.get("/new", isloggidn, listingsController.renderNewForm);

// ===================== SHOW SINGLE LISTING =====================
router.get("/:id", wrapAsync(listingsController.showListing));

// ===================== CREATE NEW LISTING =====================
router.post("/", isloggidn, validateListing, wrapAsync(listingsController.createListing));

// ===================== SHOW EDIT FORM =====================
router.get("/:id/edit", isloggidn, isOwner, wrapAsync(listingsController.renderEditForm));

// ===================== UPDATE LISTING =====================
router.put("/:id", isloggidn, isOwner, validateListing, wrapAsync(listingsController.updateListing));

// ===================== DELETE LISTING =====================
router.delete("/:id", isloggidn, isOwner, wrapAsync(listingsController.deleteListing));

module.exports = router;