export function PorfileItemCard({ value, name, bg }) {
    return (
        <div className={`${bg} p-3 rounded-2xl w-full`}>
            <h1 className="text-3xl font-bold text-slate-900"> {value} </h1>
            <p className="text-lg font-bold text-slate-900">
                {name}
            </p>
        </div>
    )
}