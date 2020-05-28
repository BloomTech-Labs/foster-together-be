exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("members").then(function() {
    // Inserts seed entries
    return knex("members").insert([
      {
        first_name: "Joseph",
        last_name: "Rodriguez",
        phone: "200-800-7648",
        address: "1245 Wynnstone Dr",
        city_state_zip_id: 1,
        longitude: "-101.821365",
        latitude: "38.833881",
        membertype_id: 1
      },
      {
        first_name: "Robert",
        last_name: "Thomas",
        phone: "200-555-7648",
        address: "32 Cherry Ave",
        city_state_zip_id: 2,
        longitude: "-102.55584416996333",
        latitude: "39.55555629395869",
        membertype_id: 1
      },
      {
        first_name: "Isabela",
        last_name: "Thompson",
        phone: "200-555-5000",
        address: "648 Cat St",
        city_state_zip_id: 3,
        longitude: "-103.75554416996333",
        latitude: "37.95555629395869",
        membertype_id: 1
      },
      {
        first_name: "Eric",
        last_name: "Grece",
        phone: "202-808-6542",
        address: "629 W Cienga Boul",
        city_state_zip_id: 1,
        longitude: "-104.74184555996333",
        latitude: "39.99855629395559",
        membertype_id: 2
      },
      {
        first_name: "Tommy",
        last_name: "Richmon",
        phone: "102-808-3242",
        address: "Orange County",
        city_state_zip_id: 2,
        longitude: "-105.74184416995553",
        latitude: "40.99855555395869",
        membertype_id: 2
      },
      {
        first_name: "Rick",
        last_name: "Chu",
        phone: "202-324-4324",
        address: "Flagstaff",
        city_state_zip_id: 3,
        longitude: "-106.74555416996333",
        latitude: "39.99555629395869",
        membertype_id: 2
      }
    ]);
  });
};
