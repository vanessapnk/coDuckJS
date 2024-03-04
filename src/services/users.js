const { getUserByEmail } = require("../data/users");
const { connectToCollection } = require("../data/mongodb");

async function createNewUser(newUser) {
    const { email, password, passwordConfirmation, Name, GithubUsername, Age, About, City, Job, Stacks, Hobbies } = newUser;

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
        Name,
        GithubUsername: GithubUsername ? GithubUsername : "",
        Age: Age ? Age : "",
        About: About ? About: "",
        City: City ? City : "",
        Job: Job ? Job : "",
        Stacks: Stacks ? Stacks : [],
        Hobbies: Hobbies ? Hobbies : []
    }

    try {
        const collection = await connectToCollection('userData');
        const result = await collection.insertOne(user);
        return result.ops[0]; 
    } catch (error) {
        throw new Error("Invalid Data provided");// ESTÁ-ME A DAR SEMPRE INVALIDO, MAS CRIAR
    }
}

async function loginHandler(req, res){
    const { email , password } = req.body

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
        return res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}



module.exports = { createNewUser, loginHandler };