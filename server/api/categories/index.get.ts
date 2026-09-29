import { prisma } from '#server/utils/prisma';
import { isPrerender, mockCategoriesPayload } from '#server/utils/mockCatalog';

export default defineEventHandler(async () => {
  if (isPrerender) return mockCategoriesPayload();

  return prisma.category.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
    },
    orderBy: { name: 'asc' },
  });
});
