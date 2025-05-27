import prisma from "@/lib/prisma";

export const phonePeInitialization = async (data: any) => {
  try {
    return prisma.paymentHistory.create({ data });
  } catch (error) {
    throw error;
  }
};

export const getUserPaymentData = (userId: number) => {
  return prisma.paymentHistory.findFirst({
    where: { userId },
    orderBy: { addedDate: "desc" },
  });
};

export const updatePayment = (paymentId: number, data: any) => {
  try {
    return prisma.paymentHistory.update({ where: { id: paymentId }, data });
  } catch (error) {
    throw error;
  }
};

export const getProducts = async () => {
  return prisma.products.findMany({ where: { deleteStatus: 0, status: 1, planStatus: 1 } });
};

export const findUserTokens = async (userId:number) => {
  return prisma.tokens.findFirst({ where: { userId } });
}

export const updateTokens = async (userId: number, tokens: number) => {
  try {
    const userTokens = await findUserTokens(userId)
    if (userTokens) {
      return prisma.tokens.update({
        where: { id: userTokens.id },
        data: {
          remainingTokens: userTokens.remainingTokens + tokens,
          totalTokens: userTokens.totalTokens + tokens,
        },
      });
    }
  } catch (error) {
    throw error;
  }
};

export const findProduct = async (productId: number) => {
  return prisma.products.findFirst({ where: { id: productId } });
};

export const findPaymentSuccessDatas = (userId:number, status: string, planStatus = 1) => {
  return prisma.paymentHistory.findMany({ where: { userId , orderStatus: { contains : status }, products: { planStatus }}})
}