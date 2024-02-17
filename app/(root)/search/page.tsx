import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/app/components/cards/UserCard";

const page = async () => {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    // console.log(userInfo._id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    // Fetching all the user Then I will Search the users based on the search bar
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    })


    return (
        <section>
            <h1 className='head-text mb-10'>
                Search
            </h1>
            <div className="mt-14 flex flex-col gap-9">
                {
                    result.users.length === 0 ? (
                        <p className="no-result">No users</p>
                    ) : (
                        <>
                            {
                                result.users.map((person) => (
                                    <UserCard
                                        key={person.id}
                                        id={person.id}
                                        name={person.name}
                                        username={person.username}
                                        imgUrl={person.image}
                                        personType="User"

                                    />
                                ))
                            }
                        </>
                    )
                }

            </div>

        </section>
    )


}

export default page
