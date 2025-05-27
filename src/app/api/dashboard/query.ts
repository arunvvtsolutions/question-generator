import prisma from "@/lib/prisma";
import { EXAM_STATUS } from "@/service/enums/texts";
import { ICumulativeExamRes, IStudyPlan } from "@/types/dashboard";
import { Prisma } from "@prisma/client";

export const getPaymentHistory = (userId: number) => {
  return prisma.paymentHistory.findMany({ where: { userId }, include: { products: true } });
};


