const API_URL = 'http://localhost:1337';

export async function listLogEntries() {
    const responce = await fetch(`${API_URL}/api/logs`);
    return responce.json()
}

export async function createLogEntry(entry) {
    const responce = await fetch(`${API_URL}/api/logs`,{
        method: 'POST',
        headers: {
            'content-type':'application/json',
        },
        body: JSON.stringify(entry),
    });
    return responce.json()
}