const express = require("express");

const router = express.Router();
const axios = require("axios");
const locs = require("../public/data/country-codes-lat-long-alpha3.json");

router.get("/artistSearch", async (req, res) => {
  const { artist } = req.query;
  const countries = [];
  const requests = artist.map((item) =>
    axios.get(
      `https://theaudiodb.com/api/v1/json/1/search.php?s=${encodeURI(item)}`
    )
  );

  Promise.allSettled(requests)
    .then((results) => {
      results.forEach((element) => {
        countries.push(element.value.data?.artists?.[0]?.strCountryCode);
      });
      res.send(
        countries
          .filter((item) => Boolean(item))
          .map((country) => {
            switch (country) {
              case "uk":
                country = "GB";
                break;
              default:
                break;
            }
            const locations = locs[country];
            if (locations === undefined) return "Uknown";
            console.log(country);
            locations.country = country;
            console.log(locations);
            return locations;
          })
      );
    })
    .catch((e) => {
      res.status(500).send(e);
      console.log(e);
    });
});

module.exports = router;
