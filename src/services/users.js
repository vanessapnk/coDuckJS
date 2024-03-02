const { getUserByEmail } = require("../data/users");
const { connectToCollection } = require("../data/mongodb");

async function CreateNewUser(newUser) {
    const { email, password, passwordConfirmation } = newUser;

    if (password !== passwordConfirmation) {
        throw new Error(`Passwords don't match`);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('The e-mail you entered already exists');
    }

    const user = {
        email: email,
        password: password       
    };

    try {
        const collection = await connectToCollection('userData');
        const result = await collection.insertOne(user);
        return result.ops[0]; 
    } catch (error) {
        throw new Error("The introduced data ain't valid");
    }
}

async function Login(loginUser){
    const { email , password } = loginUser

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        throw new Error(`This user does not exists`);
    } else if (password !== password.email._id){
        throw new Error('Incorrect password');
    } else {
        const collection = await connectToCollection('userData');
        const result = await collection.insertOne(user.token);
        return result.ops[0]; 
    } 

}

module.exports = { CreateNewUser, Login };