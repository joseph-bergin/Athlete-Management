export default function Team() {
    return (
        <div>
            <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Team Manager</h1>
            <div>
                <p>1. Table containing list of athletes on team.</p>
                <div className="px-8">
                    <p>Columns: Athlete Name, Position, Year</p>
                    <p>Features: Filter, Search, Paginator</p>
                </div>
            </div>
            <div>
                <p>2. Create Athlete Form (Opens in a sheet).</p>
                <div className="px-8">
                    <p>Fields: Athlete Name, Position, Year</p>
                </div>
            </div>
        </div>
    )
}