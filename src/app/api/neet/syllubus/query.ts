import prisma from "@/lib/prisma";

export const getSyllabus = async () => {
  try {
    const syllabus = await prisma.subjects.findMany({
      where: {
        deleteStatus: 0,
        status: 1,
      },
      select: {
        id: true,
        subjectName: true,
        shortUrl: true,
        chapters: {
          where: {
            deleteStatus: 0,
            status: 1,
            order: { not: 0 },
          },
          orderBy: [{ order: "asc" }],
          select: {
            id: true,
            chapterName: true,
            shortUrl: true,
            topics: {
              where: {
                deleteStatus: 0,
                status: 1,
              },
              select: {
                id: true,
                topicName: true,
                shortUrl: true,
              },
            },
          },
        },
      },
    });
    return syllabus;
  } catch (error) {
    throw error;
  }
};



export const getAllChapters = async () => {
  return prisma.chapters.findMany({ where: { deleteStatus: 0, status: 1 }, orderBy: { order: "asc" } });
};

export const getAllTopics = async () => {
  return prisma.topics.findMany({ where: { deleteStatus: 0, status: 1 } });
};

export const getAllSubjects = async () => {
  return prisma.subjects.findMany({ where: { deleteStatus: 0, status: 1 } });
};
