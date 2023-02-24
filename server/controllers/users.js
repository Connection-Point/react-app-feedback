import User from "../models/User.js";


/* READ */
export const getUsers = async (req,res)=>                     //This is the function that is called in index.js
{
    try
    {
        const { id } = req.params;                            //Get the id from the request parameters
        const user = await User.findById(id);                 //Find the user in the database
        res.status(200).json(user);                           //Send the user back to the client

    }
    catch(error)
    {
        res.status(404).json({error:error.message});
    }

}

export const getUserFriends = async (req,res)=>                // This is the function that is called in index.js
{
    try
    {
    const { id } = req.params;
    const user = await User.findById(id);                      //Find the user in the database
    const friends = await Promise.all(                         // Get all the friends of the user
        user.friends.map((id) => User.findById(id)))           // Find the friends in the database

    const formattedFriends = friends.map((friend) =>           // Format the friends
    ({ first_name,last_name,picturePath,email,role }) =>       // Get the data from the friends
    { return 
        { first_name,last_name,picturePath,email,role }        // Return the data
    });
    res.status(200).json(formattedFriends);
    }
    catch(error)
    {
        res.status(404).json({error:error.message});
    }
    
};
/* UPDATE */
export const addRemoveFriend = async (req,res)=>               // This is the function addRemoveFriend that is called in index.js
{
    try
    {
        const { id, friendId } = req.params;                   // Get the id and friendId from the request parameters
        const user = await User.findById(id);                  // Find the user in the database
        const friend = await User.findById(friendId);          // Find the friend in the database

        if(user.friends.includes(friendId))                    // If the user is already following the friend
        {
            user.friends - user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else                                                   // If the user is not following the friend
        {
            user.friends.push(friendId);                       // Add the friend to the user's friends
            friend.friends.push(id);                           // Add the user to the friend's friends
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(                         // Get all the friends of the user
        user.friends.map((id) => User.findById(id)))           // Find the friends in the database

        const formattedFriends = friends.map((friend) =>           // Format the friends
        ({ first_name,last_name,picturePath,email,role }) =>       // Get the data from the friends
        { return 
            { first_name,last_name,picturePath,email,role }        // Return the data
        });

        res.status(200).json(formattedFriends);
    }
    catch(error)
    {
        res.status(404).json({error:error.message});
    }
}

    


