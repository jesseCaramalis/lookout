import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) //making multiple API calls with map and findById, need promise all.
        );
        const formattedFriends = friends.map( //data needs to be formatted for the frontend
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }; //formats specific data as an object, ready to be sent as a json
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) { //if users friends list includes friend, filter that friend out.
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id); //does same for the user on that friends friends list (no one way friendships)
        } else {
            user.friends.push(friendId);
            friend.friends.push(id)
        }

        await user.save();
        await friend.save(); //saves updated users to db, then following code formats friends list again for API.

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) 
        );
        const formattedFriends = friends.map( 
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        
        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}