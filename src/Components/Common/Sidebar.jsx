import HardnessFilter from "../HardnessFilter";
import LessonFilter from "../LessonFilter";

function Sidebar() {
  return (
    <div className="bg-stone-900 px-5 py-2 h-screen text-white">
      <HardnessFilter />
      <LessonFilter />
    </div>
  );
}

export default Sidebar;
