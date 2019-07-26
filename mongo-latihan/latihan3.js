const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Coneection Error..', err));

const courseSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    author: String,
    price: Number,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Courses', courseSchema);

async function getCourses() {
    const result = await Course.find().or([
        { price: { $gte: 15 } },
        { name: /.*by*./i }
    ])
    .select('name author price')
    .sort('-price')
    console.log(result);
}

getCourses();
