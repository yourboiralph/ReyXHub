import { getInventoryPets } from "@/lib/actions/inventory/inventory-pets-actions"
import {
    Search,
    Monitor,
    PawPrint,
    Sparkles,
    Crown,
    Diamond,
    Star,
    ShieldCheck,
} from "lucide-react"

const inventoryStats = [
    {
        title: "Total Pets",
        value: "16,077",
        color: "text-blue-600",
        border: "border-blue-200",
    },
    {
        title: "Unique Pets",
        value: "109",
        color: "text-sky-600",
        border: "border-sky-200",
    },
    {
        title: "Legendary",
        value: "1,169",
        color: "text-amber-600",
        border: "border-amber-200",
    },
    {
        title: "Ultra Rare",
        value: "2,039",
        color: "text-rose-600",
        border: "border-rose-200",
    },
    {
        title: "Rare",
        value: "7,543",
        color: "text-green-600",
        border: "border-green-200",
    },
]

const inventoryItems = await getInventoryPets()

function InventoryStatCard({
    title,
    value,
    color,
    border,
}: {
    title: string
    value: string
    color: string
    border: string
}) {
    return (
        <div className={`rounded-2xl border bg-white p-5 shadow-sm ${border}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {title}
            </p>
            <h2 className={`mt-2 text-4xl font-bold ${color}`}>{value}</h2>
        </div>
    )
}

function rarityClass(rarity: string) {
    switch (rarity) {
        case "LEGENDARY":
            return "text-amber-600"
        case "ULTRA_RARE":
            return "text-rose-600"
        case "RARE":
            return "text-green-600"
        case "UNCOMMON":
            return "text-blue-300"
        case "COMMON":
            return "text-gray-600"
        default:
            return "text-slate-600"
    }
}

function specialBadgeClass(special: string | null) {
    if (special === "N") return "bg-lime-500 text-white"
    if (special === "M") return "bg-violet-600 text-white"
    return ""
}

export default async function InventoryPage() {


    return (
        <div className="mt-10 space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Inventory
                </h1>
                <p className="mt-1 text-slate-600">
                    All pets across your accounts
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                {inventoryStats.map((item) => (
                    <InventoryStatCard key={item.title} {...item} />
                ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="relative w-full xl:max-w-xl">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="Search by pet name, rarity, or username..."
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-slate-400"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-4 text-sm font-medium text-sky-700">
                            <Monitor size={16} />
                            By Device
                        </button>

                        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700">
                            Select
                        </button>

                        <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input type="checkbox" className="rounded border-slate-300" />
                            Compact
                        </label>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-center gap-3 border-b border-slate-100 pb-4">
                    <Monitor size={16} className="text-slate-500" />
                    <h2 className="font-semibold text-slate-900">RAPRAP</h2>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                        9,457 pets
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-5">
                    {inventoryItems.map((item) => (
                        <div
                            key={item.id}
                            className="group relative rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="absolute left-3 top-3 rounded-md bg-slate-900 px-2 py-1 text-xs font-bold text-white">
                                {item.quantity}x
                            </div>

                            {/* {item.special && (
                                <div
                                    className={`absolute right-3 top-3 rounded-md px-2 py-1 text-xs font-bold ${specialBadgeClass(
                                        item.special
                                    )}`}
                                >
                                    {item.special}
                                </div>
                            )} */}

                            <div className="flex justify-center pt-8">
                                <img
                                    src={item.thumbnailImage ?? "test.com"}
                                    alt={item.name}
                                    className="h-28 w-28 object-contain"
                                />
                            </div>

                            <div className="mt-4 text-center">
                                <h3 className="line-clamp-2 min-h-12 text-base font-semibold text-slate-900">
                                    {item.name}
                                </h3>

                                <p
                                    className={`mt-1 text-xs font-bold uppercase tracking-wide ${rarityClass(
                                        item.pet?.rarity ?? "RARE"
                                    )}`}
                                >
                                    {item.pet?.rarity}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-800">
                                    <Star size={15} />
                                </button>

                                <div className="flex items-center gap-2">
                                    {item.pet?.variant === "NEON" && (
                                        <span className="rounded-full border border-lime-200 bg-lime-50 px-2 py-1 text-[10px] font-bold text-lime-700">
                                            Neon
                                        </span>
                                    )}

                                    {item.pet?.variant === "MEGA" && (
                                        <span className="rounded-full border border-violet-200 bg-violet-50 px-2 py-1 text-[10px] font-bold text-violet-700">
                                            Mega
                                        </span>
                                    )}

                                    {item.pet?.potion !== "NONE" && (
                                        <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] font-bold text-sky-700">
                                            {item.pet?.potion === "FLY_RIDE"
                                                ? "Fly Ride"
                                                : item.pet?.potion === "RIDE"
                                                    ? "Ride"
                                                    : "Fly"}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
                                <PawPrint size={13} />
                                <span>{item.accountCount} account{item.accountCount > 1 ? "s" : ""}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}