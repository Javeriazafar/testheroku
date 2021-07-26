const db = require('../db');
const User = require('../db');

module.exports = class UserService{
    static async getAllUsers(){
        try {
            const allUsers = await  User.find();
            return allUsers;
        } catch (error) {
            console.log(`Could not fetch Users ${error}`)
        }
    }

    static async createUser(data){
        try {

            const newUser = {
                title: data.title,
                body: data.body,
                User_image: data.User_image
            }
           const response = await new User(newUser).save();
           return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getUserbyId(UserId){
        try {
            const singleUserResponse =  await User.findById({_id: UserId});
            return singleUserResponse;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async updateUser(title, body, UserImage){
            try {
                const updateResponse =  await User.updateOne(
                    {title, body, UserImage}, 
                    {$set: {date: new Date.now()}});

                    return updateResponse;
            } catch (error) {
                console.log(`Could not update User ${error}` );

        }
    }

    static async deleteUser(UserId){
        try {
            const deletedResponse = await User.findOneAndDelete(UserId);
            return deletedResponse;
        } catch (error) {
            console.log(`Could  ot delete User ${error}`);
        }

    }
}
