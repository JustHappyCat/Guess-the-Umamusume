interface QuizElementDataModelInterface {
    unique_name: string,
    i18n: string,
    desc: string,
    image_path_1: string,
    image_path_2: string,

    getResolvedName(): string,
}

abstract class QuizElementDataModelAbstract implements QuizElementDataModelInterface {
    abstract unique_name: string;
    abstract i18n: string;
    abstract desc: string;
    abstract image_path_1: string;
    abstract image_path_2: string;

    getResolvedName(): string {
        return "resolved " + this.i18n;
    }
}

export default QuizElementDataModelAbstract;