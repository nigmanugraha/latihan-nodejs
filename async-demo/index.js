console.log('Before');
// getUser(1, getRepository);
console.log('After');

// function getRepository(user) {
//     getRepository(user.gitHubUsername, getCommits);
// }

// function getCommits(repos) {
//     getCommits(repo, displayCommits);
// }

// function displayCommits(commits) {
//     console.log(commits);
// }

// getUser(1)
//     .then(user => getRepository(user))
//     .then(repo => getCommits(repo[0]))
//     .then(commit => console.log('Commit', commit))
//     .catch(err => console.log('Error', err));

async function displayCommits() {
    const user = await getUser(1);
    const repo = await getRepository(user);
    const commit = await getCommits(repo[0]);
    console.log('Commit', commit);
}

displayCommits();

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from database...');
            resolve({ id: id, gitHubUsername: 'nigma' });
        }, 2000);
    });
}

function getRepository(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Geting repository...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Geting gitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}
