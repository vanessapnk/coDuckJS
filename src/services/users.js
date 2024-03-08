const { getUserByEmail } = require("../data/users");
const { connectToCollection } = require("../data/mongodb");

async function createNewUser(newUser) {
    const { email, password, passwordConfirmation, name, githubUsername, age, about, city, job, stacks, hobbies, languagesSpoken } = newUser;

    if (password !== passwordConfirmation) {
        throw new Error(`Passwords don't match`);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('The e-mail you entered already exists');
    }

    const user = {
        email,
        password,
        name,
        githubUsername: githubUsername ? githubUsername : "",
        age: age ? age : "",
        about: about ? about : "",
        city: city ? city : "",
        job: job ? job : "",
        stacks: stacks ? stacks : [],
        hobbies: hobbies ? hobbies : [],
        languagesSpoken: languagesSpoken ? languagesSpoken : []
    }

    try {
        const collection = await connectToCollection('userData');
        await collection.insertOne(user);
        return { success: true };

    } catch (error) {
        throw new Error("Invalid Data provided");
    }
}

async function loginHandler(req, res) {
    const { email, password } = req.body

    const existingUser = await getUserByEmail(email);

    try {
        //encontrar o user
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // password corresponde
        if (password !== existingUser.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Authentication successful
        return res.status(200).json(
            {
                message: 'Authentication successful',
                id: existingUser._id,
                user: existingUser
            });

    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function loadMyGroups(req, res) {
    const myGroups = await getMyGroups
}

module.exports = { createNewUser, loginHandler };