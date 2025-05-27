import { IDynamicSkeletonUi } from "@/components/ui/DynamicSkeletonTwoUi";

export const studyPlanFormSkeletonData: IDynamicSkeletonUi[] = [
  {
    id: 1,
    marginTop: "0px",
    rowConfigs: [
      {
        rowId: 1,
        cols: 2,
        colsSm: 1,
        colsMd: 1,
        colsLg: 1,
        marginTop: "20px",
        showRowsOn: { sm: 4, md: 10, lg: 10 },
        skeletonGroups: [
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, spaceX: 2, height: 40, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, spaceX: 2, height: 40, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, spaceX: 2, height: 40, width: "full", rounded: "rounded-lg" },
          ],
        ],
      },
    ],
  },
]