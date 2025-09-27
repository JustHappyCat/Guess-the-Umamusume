import QuizElement from "@/components/quizelement/quizelement";
import UmaMusume from "../../modal/umamusume"

function getUmas() {
    // Get UmaMusumes list from data store 
    const goldShip = new UmaMusume("gold_ship", "GoldShip", "Goofy aah horse", "testurl", "testUrl")
    const speChan = new UmaMusume("special_week", "Special Week", "Goofy aah horse", "testurl", "testUrl")
    return [goldShip, speChan]
}

export default function uma() {
    return (
        <>
            <div className="col-span-1 flex flex-col gap-[32px] row-start-1 sm:items-start">
                Guess the uma page
                {[getUmas().map((x, i) =>
                    <QuizElement key={i} uma={x} />
                )]}
            </div>
            <div className="col-span-2 flex flex-row gap-[32px] col-start-2 items-center sm:items-start">
                Test
            </div>
        </>

    )
}