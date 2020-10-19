const mongoose = require('mongoose');
const db = require('./index.js');
const faker = require('faker');

module.exports = {

  // Get all reviews for particular campground by campId, sorted by helpfulness and then date
  getCampgroundReviews: (campId, callback) => {
    db.Review.find({campgroundid: campId}).sort({helpful: 'desc', reviewdate: 'desc'}).exec((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  // Get all reviews for particular campground by campId, but sort only by date
  getCampgroundReviewsByDate: (campId, callback) => {
    db.Review.find({campgroundid: campId}).sort({reviewdate: 'desc'}).exec((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  // Increment or decrement the helpful counter for a specific review
  editReviewHelpful: (data, callback) => {
    console.log(data);
    db.Review.updateOne(
      {id: data.reviewId},
      {$inc: { helpful: data.increment }}
    ).exec((err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  // Post a review to the database by campId
  postReviewByCampId: (campId, review, callback) => {
    let reviewToSave = new db.Review ({
      campgroundid: campId,
      username: review.username,
      bodytext: review.bodyText,
      profilephoto: faker.image.avatar(),
      helpful: 0
    });
    reviewToSave.save(function (err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },

  // Delete a review to the database by reviewId
  deleteReviewByReviewId: (reviewId, callback) => {
    db.Review.deleteOne({_id: reviewId}, (err, result) => {
      if (err) {
        callback(err)
      } else {
        callback(null, result);
      }
    })
  }

};