export default function truncate(name, MAX_LENGTH) {
    if (!name || name.length === 0) return "<no-name>"
    if (name.length <= MAX_LENGTH) return name

    return (name.slice(0, MAX_LENGTH + 1) + "...")
}