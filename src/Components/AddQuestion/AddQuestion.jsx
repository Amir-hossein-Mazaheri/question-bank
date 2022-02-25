import QuestionBody from "./QuestionBody";
import SelectCategory from "./SelectCategory";

function AddQuestion() {
    return ( 
        <div>
            <SelectCategory />
            <QuestionBody />
        </div>
     );
}

export default AddQuestion;