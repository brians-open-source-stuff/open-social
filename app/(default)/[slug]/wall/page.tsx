export default async function Wall({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    return <h1>{username}'s Wall</h1>
}