import UmaMusume from "@/modal/umamusume"

export default function QuizElement({ uma }: { uma: UmaMusume }) {
    return (
            <h1>{ uma.getResolvedName() }</h1>
    )
}