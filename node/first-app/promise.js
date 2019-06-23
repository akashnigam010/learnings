const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('error occurred'));
    }, 2000);
});

p.then(response => console.log('Resolved', response))
    .catch(err => console.log('Rejected', err.message));


console.log('Before');

// Callback Hell

// getUser(1, (user) => {
//     getRepositories(user, (repos) => {
//         getCommits(repos, (commits) => {
//             console.log(commits);
//         })
//     })
// });

// Without callbacks, using promises
// getUser(1)
//     .then(user => getRepositories(user))
//     .then(repos => getCommits(repos))
//     .then(commits => console.log(commits))
//     .catch(err => console.log(err.message));

// Using async await

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user);
        const commits = await getCommits(repos);
        console.log(commits);
        console.log('hi');
    } catch (err) {
        console.log(err.message)
    }
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}