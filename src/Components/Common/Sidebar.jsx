import HardnessFilter from "../HardnessFilter";
import LessonFilter from "../LessonFilter";
import Btn from "./Btn";

function Sidebar() {
  return (
    <div className="bg-stone-900 px-5 py-2 h-screen text-white">
      <HardnessFilter />
      <LessonFilter />
      <Btn className="w-full block text-black mt-7 bg-white" type="submit">اعمال فیلتر ها</Btn>
    </div>
  );
}

export default Sidebar;
