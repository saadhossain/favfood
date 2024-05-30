export const updateData = async (endpoint: string, dataTobeUpdated: any) => {
    const res = await fetch(`/api${endpoint}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(dataTobeUpdated)
    })
    const { result } = await res.json();
    return result;
}