// +server.js
export async function GET() {
    const data = await fetchDataFromDatabase(); // Indiker database fetch funktion
    return new Response(JSON.stringify(data), { status: 200 });
}