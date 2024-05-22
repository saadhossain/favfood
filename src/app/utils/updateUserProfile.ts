export const updateUserProfile = async (userId: string, userInfo: any) => {
    const res = await fetch(`/api/users?userId=${userId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    });
    const data = await res.json();
    return data.result;
};