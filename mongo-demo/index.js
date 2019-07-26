const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose
    .connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.log('Could not connect to db...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Courses', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.Js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // **comparation operator
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // **logical operator
    // or
    // and

    const pageNumber = 1;
    const pageSize = 10;

    const result = await Course
        // .find({ author: 'Mosh', isPublished: true }) //select data spesifik
        // .find({price: {$gte: 10, $lte: 20}}) // price between 10 and 20
        // .find({price: {$in: [10,15,20]}}) //select data with price 10, 15, and 20
        // .find().or({ author: 'Mosh', isPublished: true }) //select data with logical operator OR
        // .find({author: /^Mosh/}) // select data where author starts with 'Mosh'
        // .find({author: /Hamadani$/i}) // select data where author end with 'Hamadani' and add 'i' for not case sensitif
        .find({ author: /.*Mosh.*/i }) // select data where author contains word 'Mosh' and add 'i' for not case sensitif
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 }) //1 = ascending ; -1 = descending
        .select({ name: 1, tags: 1 }); // 1= true; -1= false
    // .count(); // count document result
    console.log(result);
}

// Query First
// async function updateCourse(id) {
//     const course = await Course.findById(id); // querying
//     if (!course) return;
//     course.isPublished = true;
//     course.author = 'Another Author';
//     const result = await course.save();
//     console.log(result);
// }

// Update first
async function updateCourse(id) {
    // const result = await Course.updateOne(_id:id)
    const course = await Course.findByIdAndUpdate(
        id,
        {
            $set: {
                author: 'Jack',
                isPublished: false
            }
        },
        { new: true }
    );
    console.log(course);
}

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

removeCourse('5d39737f2774754a8c2a5085');
// createCourse();