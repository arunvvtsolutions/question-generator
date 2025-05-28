import prisma from "@/lib/prisma";

export const getAllClasses = async () => {
    try {
        const classes = await prisma.classes.findMany({
            where: {
                deleteStatus: 0,  
            },
            orderBy: {
                sequence: 'asc' 
            }
        });     

        return classes;
    } catch (error) {
        throw new Error('Failed to fetch classes');
    }
};