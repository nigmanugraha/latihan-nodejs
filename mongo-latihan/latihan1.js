const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connection..', err));

const courseSchema = new mongoose.Schema({
    name: String,
    tags: [String],
    author: String,
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Courses', courseSchema);

async function getCourses() {
    const result = await Course.find({ tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
    console.log(result);
}
getCourses();
