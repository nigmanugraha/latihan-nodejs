const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log('Connection error...', err));

const coursesSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    author: String,
    date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean
});

const Course = mongoose.model('Courses', coursesSchema);

async function getCourses() {
    const result = await Course
        // .find({tags: {$in: ['frontend', 'backend']}})
        .find()
        .or([{ tags: 'frontend'}, {tags: 'backend' }])
        // .select({ name: 1, author: 1 })
        .select('name author')
        // .sort({ price: -1 });
        .sort('-price')

    console.log(result);
}

getCourses();
