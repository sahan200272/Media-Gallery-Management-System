export const fetcher = async(...args) => {
    
    const res = await fetch(...args);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
}