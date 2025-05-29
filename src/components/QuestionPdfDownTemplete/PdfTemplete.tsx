import MarkDown from "@/components/common/MarkDown";
import { IAiQuestionsProps } from "@/types/generate-questions";
import Image from "next/image";
import React from "react";

// const data: IAiQuestionsProps[] = [
//   {
//     id: 1,
//     user_id: 363,
//     uuid: "dc73fa3a-5d7b-4fed-b423-8c6af80b43e",
//     question:
//       "A car travels half of its journey with a constant speed of 40 km/h and the remaining half with a constant speed of 60 km/h. What is the average speed of the car for the entire journey?",
//     correctOpt: "4",
//     optionA: "40 km/h",
//     optionB: "50 km/h",
//     optionC: "60 km/h",
//     optionD: "48 km/h",
//     answerDesc:
//       "1. Let the total distance be 2d.  \n2. Time taken for the first half, $t_1 = d/40$ \n3. Time taken for the second half, $t_2 = d/60$ \n4. Total time, $t = t_1 + t_2 = d/40 + d/60 = (3d + 2d)/120 = 5d/120 = d/24$ \n5. Average speed = Total distance / Total time = $2d / (d/24) = 48$ km/h.\n\n✓ Answer: 48 km/h\n:pushpin: Key Concept: Average speed calculation.\n:zap: Quick Method: Harmonic mean if distances are equal.\n:x: Common Mistake: Arithmetic mean.",
//     difficulty: 2,
//     topicId: 11,
//     subjectId: 1,
//     chapterId: 2,
//     estimated_time: 3,
//     cognitive_level: 3,
//     keywords: "average speed,distance,time",
//     topics: { id: 11, topicName: "Avg Speed And Avg Velocity" },
//     subjects: { id: 1, subjectName: "Physics" },
//     chapters: { id: 2, chapterName: "Motion In A Straight Line" },
//     cognitiveLevel: { id: 3, title: "Application" },
//   },
//   {
//     id: 2,
//     user_id: 363,
//     uuid: "dc73fa3a-5d7b-4fed-b423-8c6af80b43e",
//     question:
//       "A particle starts from rest and moves with a constant acceleration of 2 m/s². How far does it travel in the first 4 seconds?",
//     correctOpt: "3",
//     optionA: "4 m",
//     optionB: "8 m",
//     optionC: "16 m",
//     optionD: "32 m",
//     answerDesc:
//       "1. Use the equation of motion: $s = ut + (1/2)at^2$ \n2. Initial velocity, u = 0 m/s \n3. Acceleration, a = 2 m/s² \n4. Time, t = 4 s \n5. Distance, $s = (0)(4) + (1/2)(2)(4)^2 = 0 + (1)(16) = 16$ m\n\n✓ Answer: 16 m\n:pushpin: Key Concept: Equation of motion under constant acceleration.\n:zap: Quick Method: Direct substitution in the formula.\n:x: Common Mistake: Forgetting the initial velocity is zero.",
//     difficulty: 2,
//     topicId: 12,
//     subjectId: 1,
//     chapterId: 2,
//     estimated_time: 2,
//     cognitive_level: 3,
//     keywords: "acceleration,distance,time,kinematics",
//     topics: { id: 12, topicName: "Acceleration And Horizontal Motion" },
//     subjects: { id: 1, subjectName: "Physics" },
//     chapters: { id: 2, chapterName: "Motion In A Straight Line" },
//     cognitiveLevel: { id: 3, title: "Application" },
//   },
//   {
//     id: 3,
//     user_id: 363,
//     uuid: "dc73fa3a-5d7b-4fed-b423-8c6af80b43e",
//     question:
//       "A cyclist travels from point A to point B and then back to point A. The distance between A and B is 5 km. If the entire trip takes 1 hour, what is the cyclist's average speed?",
//     correctOpt: "3",
//     optionA: "0 km/h",
//     optionB: "5 km/h",
//     optionC: "10 km/h",
//     optionD: "20 km/h",
//     answerDesc:
//       "1. Total distance traveled = 5 km + 5 km = 10 km \n2. Total time taken = 1 hour \n3. Average speed = Total distance / Total time = 10 km / 1 hour = 10 km/h\n\n✓ Answer: 10 km/h\n:pushpin: Key Concept: Average speed calculation.\n:zap: Quick Method: Total distance divided by total time.\n:x: Common Mistake: Considering only one-way distance.",
//     difficulty: 2,
//     topicId: 11,
//     subjectId: 1,
//     chapterId: 2,
//     estimated_time: 2,
//     cognitive_level: 3,
//     keywords: "average speed,distance,time",
//     topics: { id: 11, topicName: "Avg Speed And Avg Velocity" },
//     subjects: { id: 1, subjectName: "Physics" },
//     chapters: { id: 2, chapterName: "Motion In A Straight Line" },
//     cognitiveLevel: { id: 3, title: "Application" },
//   },
//   {
//     id: 4,
//     user_id: 363,
//     uuid: "dc73fa3a-5d7b-4fed-b423-8c6af80b43e",
//     question:
//       "A body moves along a straight line such that its displacement is given by $s = 3t^3 + 2t + 5$, where s is in meters and t is in seconds. What is the acceleration of the body at t = 2 seconds?",
//     correctOpt: "3",
//     optionA: "18 m/s²",
//     optionB: "27 m/s²",
//     optionC: "36 m/s²",
//     optionD: "54 m/s²",
//     answerDesc:
//       "1. Velocity, $v = ds/dt = 9t^2 + 2$ \n2. Acceleration, $a = dv/dt = 18t$ \n3. At t = 2 s, $a = 18(2) = 36$ m/s²\n\n✓ Answer: 36 m/s²\n:pushpin: Key Concept: Differentiation to find velocity and acceleration.\n:zap: Quick Method: Differentiate displacement twice.\n:x: Common Mistake: Differentiating only once or incorrectly.",
//     difficulty: 2,
//     topicId: 12,
//     subjectId: 1,
//     chapterId: 2,
//     estimated_time: 4,
//     cognitive_level: 3,
//     keywords: "acceleration,velocity,displacement,differentiation",
//     topics: { id: 12, topicName: "Acceleration And Horizontal Motion" },
//     subjects: { id: 1, subjectName: "Physics" },
//     chapters: { id: 2, chapterName: "Motion In A Straight Line" },
//     cognitiveLevel: { id: 3, title: "Application" },
//   },
//   {
//     id: 5,
//     user_id: 363,
//     uuid: "dc73fa3a-5d7b-4fed-b423-8c6af80b43e",
//     question:
//       "A car starts from rest and accelerates uniformly to a speed of 20 m/s in 5 seconds. What is the distance covered by the car during this time?",
//     correctOpt: "3",
//     optionA: "25 m",
//     optionB: "40 m",
//     optionC: "50 m",
//     optionD: "100 m",
//     answerDesc:
//       "1. Use the equation of motion: $s = ut + (1/2)at^2$ \n2. Initial velocity, u = 0 m/s \n3. Final velocity, v = 20 m/s \n4. Time, t = 5 s \n5. Acceleration, $a = (v - u)/t = (20 - 0)/5 = 4$ m/s² \n6. Distance, $s = (0)(5) + (1/2)(4)(5)^2 = 0 + (2)(25) = 50$ m\n\n✓ Answer: 50 m\n:pushpin: Key Concept: Equation of motion under constant acceleration.\n:zap: Quick Method: Use the average velocity method.\n:x: Common Mistake: Not calculating acceleration first.",
//     difficulty: 2,
//     topicId: 12,
//     subjectId: 1,
//     chapterId: 2,
//     estimated_time: 3,
//     cognitive_level: 3,
//     keywords: "acceleration,distance,time,kinematics",
//     topics: { id: 12, topicName: "Acceleration And Horizontal Motion" },
//     subjects: { id: 1, subjectName: "Physics" },
//     chapters: { id: 2, chapterName: "Motion In A Straight Line" },
//     cognitiveLevel: { id: 3, title: "Application" },
//   },
//   {
//     id: 6,
//     user_id: 363,
//     uuid: "dc73fa3a-5d7b-4fed-b423-8c6af80b43e",
//     question:
//       "A particle moves along a circular path of radius 7 m. After moving through half the circle, what is the displacement of the particle?",
//     correctOpt: "3",
//     optionA: "0 m",
//     optionB: "7 m",
//     optionC: "14 m",
//     optionD: "22 m",
//     answerDesc:
//       "1. Displacement is the shortest distance between the initial and final points.\n2. After moving through half the circle, the particle is at the opposite end of the diameter.\n3. Displacement = Diameter = 2 * Radius = 2 * 7 m = 14 m\n\n✓ Answer: 14 m\n:pushpin: Key Concept: Displacement in circular motion.\n:zap: Quick Method: Diameter is the displacement after half circle.\n:x: Common Mistake: Confusing displacement with distance.",
//     difficulty: 2,
//     topicId: 10,
//     subjectId: 1,
//     chapterId: 2,
//     estimated_time: 2,
//     cognitive_level: 3,
//     keywords: "displacement,circular motion,radius",
//     topics: { id: 10, topicName: "Distance And Displacement" },
//     subjects: { id: 1, subjectName: "Physics" },
//     chapters: { id: 2, chapterName: "Motion In A Straight Line" },
//     cognitiveLevel: { id: 3, title: "Application" },
//   },
//   {
//     id: 7,
//     user_id: 363,
//     uuid: "dc73fa3a-5d7b-4fed-b423-8c6af80b43e",
//     question:
//       "A car travels 30 km at a uniform speed of 40 km/h and the next 30 km at a uniform speed of 20 km/h. Find the average speed of the car.",
//     correctOpt: "2",
//     optionA: "25 km/h",
//     optionB: "26.67 km/h",
//     optionC: "28 km/h",
//     optionD: "30 km/h",
//     answerDesc:
//       "1. Time taken for the first 30 km, $t_1 = 30/40 = 3/4$ h \n2. Time taken for the next 30 km, $t_2 = 30/20 = 3/2$ h \n3. Total distance = 30 km + 30 km = 60 km \n4. Total time = $t_1 + t_2 = 3/4 + 3/2 = 9/4$ h \n5. Average speed = Total distance / Total time = $60 / (9/4) = 240/9 = 80/3 ≈ 26.67$ km/h\n\n✓ Answer: 26.67 km/h\n:pushpin: Key Concept: Average speed calculation.\n:zap: Quick Method: Harmonic mean if distances are equal.\n:x: Common Mistake: Arithmetic mean.",
//     difficulty: 2,
//     topicId: 11,
//     subjectId: 1,
//     chapterId: 2,
//     estimated_time: 3,
//     cognitive_level: 3,
//     keywords: "average speed,distance,time",
//     topics: { id: 11, topicName: "Avg Speed And Avg Velocity" },
//     subjects: { id: 1, subjectName: "Physics" },
//     chapters: { id: 2, chapterName: "Motion In A Straight Line" },
//     cognitiveLevel: { id: 3, title: "Application" },
//   },
// ];
const QuestionPdfDownloadTemplete = ({ data }: { data: IAiQuestionsProps[] }) => {
  return (
    <div className="mt-10 border-4 border-[#101010] dark:border-[#FFF] border-double ref-div w-full rounded-sm container">
      <div className="w-full flex justify-between items-center  p-4 border-b dark:border-[#fff]">
        {/* <Image alt="" src={"/images/Neet Guid Logo.png"} width={80} height={70} className="dark:hidden" />
        
        <Image alt="" src={"/images/neetGuideDarkLogo.png"} width={80} height={70} className="dark:block hidden" /> */}
        Question Paper
        <div>
          <p>
            <span className="font-bold">Date:</span> {new Date().toLocaleDateString()}
          </p>
          <p>
                     <span className="font-bold">Total Questions:</span> {data.length}
          </p>
        </div>
      </div>
      {data.map((d, i) => {
        return (
          <div key={i} className="w-full border-b last:border-b-0 mb-2 print-subject-div dark:border-[#fff] mt-8">
            {/* <p className="text-center font-semibold text-[18px] mb-2 text-[#0B57D0]">{d.subjects.subjectName}</p> */}
            <div key={`questions-${i}`} className="mb-4 break-inside-avoid-column">
              <div className="font-medium text-[16px] mb-2 flex items-start">
                <span className="mr-2">
                  {i + 1}.{` `}
                </span>
                <MarkDown content={d.question} />
              </div>
              <div className="w-full flex flex-wrap justify-between lg:mt-3 gap-x-[10px] px-[20px] lg:px-[50px]">
                {[
                  { label: "1)", content: d.optionA },
                  { label: "2)", content: d.optionB },
                  { label: "3)", content: d.optionC },
                  { label: "4)", content: d.optionD },
                ].map((opt, idx) => (
                  <div key={idx} className="mb-3 flex items-start">
                    <span className="mr-2">{opt.label}</span>
                    <MarkDown content={opt.content} />
                  </div>
                ))}
                <div className="mt-4 flex w-full text-green-700 font-semibold">
                  Correct Answer: {d.correctOpt})&nbsp;
                  {(() => {
                    switch (d.correctOpt) {
                      case "1":
                        return <MarkDown content={d.optionA} />;
                      case "2":
                        return <MarkDown content={d.optionB} />;
                      case "3":
                        return <MarkDown content={d.optionC} />;
                      case "4":
                        return <MarkDown content={d.optionD} />;
                      default:
                        return <span>Unknown</span>;
                    }
                  })()}
                </div>
                <div className="mt-2 text-sm text-gray-800 w-full">
                  <strong>Explanation:</strong>
                  <MarkDown content={d.answerDesc} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionPdfDownloadTemplete;
