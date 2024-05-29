export const saveToDatabase = async (endpoint: string, dataTobeSaved: {},) => {
    const res = await fetch(`/api/foods`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataTobeSaved)
    });
    const data = await res.json();
    return data;
}