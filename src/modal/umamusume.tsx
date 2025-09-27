import QuizElementDataModelAbstract from "../modal/quizelementinterface"

class UmaMusume extends QuizElementDataModelAbstract{
    unique_name: string;
    i18n: string;
    desc: string;
    image_path_1: string;
    image_path_2: string;

    constructor(unique_name: string,i18n: string, desc: string, uma_image_url: string, musume_image_url: string) {
        super();
        this.unique_name=unique_name;
        this.i18n=i18n;
        this.desc=desc;
        this.image_path_1=uma_image_url;
        this.image_path_2=musume_image_url;
    }
}

export default UmaMusume;