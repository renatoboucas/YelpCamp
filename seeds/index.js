const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require("./cities")
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '624c5623ba90f848b2cdbc60',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum blanditiis nam sapiente et temporibus sed consequuntur, sunt tenetur voluptatem eum. Consequuntur officiis, numquam nemo repellendus iste tenetur illo repudiandae harum?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dbvzotogv/image/upload/v1649397521/YelpCamp/xd1z3dek58t5gfthepj1.jpg',
                    filename: 'YelpCamp/xd1z3dek58t5gfthepj1'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});