import Link from "next/link";

export default function mainmenu() {
    return (
        <>
            <div className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start">
                <h1>Guess the <br />Umamusume</h1>
            </div>
            <div className="flex flex-row gap-[32px] row-start-2 items-center sm:items-start">
                <div className="flex flex-col gap-[10px] items-center">
                    <h1>Guess the Uma Image here</h1>
                    <Link href="/uma" className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg transition">
                        Guess the Uma
                    </Link>
                </div>
                <div className="flex flex-col gap-[10px] items-center">
                <h1>Guess the Musume image here</h1>
                <Link href="/musume" className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg transition">
                    Guess the Musume 
                </Link>
                </div>
            </div>
        </>
    )
}