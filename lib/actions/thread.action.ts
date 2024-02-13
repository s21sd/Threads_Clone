import Thread from "../models/thread.models";
import User from "../models/user.models";
import { connectToDB } from "../mongoos"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string
}
export async function createThread({
    text, author, communityId, path
}: Params) {
    connectToDB();
    const createdThread = await Thread.create(
        {
            text,
            author,
            community: null,
        }
    );
    // Updating user model
    // await User.findByIdAndUpdate(author, {
    //     $push: { threads: createThread._id}
    // })
}
