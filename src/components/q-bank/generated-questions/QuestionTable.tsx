import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IViewGeneratedQsts } from ".";
import { getThisMonth } from "@/utils";
import Link from "next/link";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
import { cn } from "@/lib/utils";
import { EXAM_STATUS, TransactionTitles } from "@/service/enums/texts";

const header = ["Subjects", "Added Date", ""];

const QuestionTable = ({ data, loading }: { data: IViewGeneratedQsts[]; loading: boolean }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <Table className="">
          {/* <TableCaption className='dark:text-[#fff]/50  text-[#000]/50 text-[13px]'>{TransactionTitles.A_LIST_RECENT_TRANSACTION}</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold lg:text-[19px] text-[16px] text-[#101010] dark:text-[#fff]">S/N</TableHead>
              {header.map((title, i) => {
                return (
                  <TableHead
                    key={i}
                    className="text-left whitespace-nowrap font-bold lg:text-[19px] text-[16px] text-[#101010] dark:text-[#fff]"
                  >
                    {title}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <>
                <TableRow className="relative">
                  <TableCell colSpan={4} className=" text-opacity-60 flex justify-center items-center mt-5 h-[50px]">
                    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 z-50">
                      <LoadingSpinner />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {data.length > 0 ? (
                  data?.map((qst, index) => (
                    <TableRow key={index}>
                      <TableCell className="lg:py-[12px] py-[8px] whitespace-nowrap  font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                        {index + 1}
                      </TableCell>

                      <TableCell className="lg:py-[12px] py-[8px] text-left whitespace-nowrap font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                        {qst.subjectNames || "NA"}
                      </TableCell>
                      <TableCell className="lg:py-[12px] py-[8px] text-left  whitespace-nowrap font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                        {getThisMonth(qst.addedDate) || "NA"}
                      </TableCell>
                      <TableCell className="lg:py-[12px] py-[8px] text-center whitespace-nowrap font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff]">
                        <div className="flex flex-wrap gap-2 items-center justify-center">
                          <Link href={`/view-questions/${qst.uuid}`}>
                            {/* <div className="px-4 py-2 rounded-[24px] border-[.5px] w-auto max-w-max text-[#0b57d0] border-[#74a9ff]">
                              Questions
                            </div> */}
                            <div
                              className={`flex items-center gap-2 rounded-3xl border px-3 md:px-4 !py-1 bg-[#EADCF8] !border-[#EADCF8] text-[#8A2BE2]`}
                            >
                              <span className="text-nowrap text-[11px] sm:text-[12px] font-medium capitalize  tracking-wider">
                                Questions
                              </span>
                            </div>
                          </Link>
                          <Link href={`/view-solutions/${qst.uuid}`}>
                            <div
                              className={`flex items-center gap-2 rounded-3xl border px-3 md:px-4 !py-1 bg-[#D5F7F8] !border-[#D5F7F8] text-[#0D8F95]`}
                            >
                              <span className="text-nowrap text-[11px] sm:text-[12px] font-medium capitalize  tracking-wider">
                                Solutions
                              </span>
                            </div>
                          </Link>
                          <Link
                            href={
                              qst.didExamAttend === EXAM_STATUS.COMPLETED
                                ? `/exams/result-analysis/${qst.examId}/${qst.uuid}`
                                : ""
                            }
                          >
                            <div
                              className={cn(
                                `flex items-center gap-2 rounded-3xl border px-3 md:px-4 !py-1 bg-[#DCE9FD] !border-[#DCE9FD] text-[#2550D4]`,
                                qst.didExamAttend !== EXAM_STATUS.COMPLETED && "opacity-50"
                              )}
                            >
                              <span className="text-nowrap text-[11px] sm:text-[12px] font-medium capitalize  tracking-wider">
                                Result
                              </span>
                            </div>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="lg:pb-[12px] py-[8px] !pt-[40px] whitespace-nowrap  font-medium lg:text-[15px] text-[13px] text-[#101010] text-opacity-60 dark:text-[#fff] text-center mt-5"
                      >
                        {TransactionTitles.NO_DATA_FOUND}
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuestionTable;
