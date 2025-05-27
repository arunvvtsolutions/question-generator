import { IDynamicSkeletonUi } from "@/components/ui/DynamicSkeletonTwoUi";

export const testListSkeletonData: IDynamicSkeletonUi[] = [
    {
      id: 1,
      marginTop: "0px",
      rowConfigs: [
        {
          rowId: 1,
          cols: 1,
          colsSm: 1,
          colsMd: 3,
          colsLg: 3,
          marginTop: "10px",
          showRowsOn: { sm: 2, md: 3, lg: 3 },
          skeletonGroups: [
            [
              { id: 1, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 2, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 3, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            ],
            [
              { id: 1, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 2, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 3, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            ],
            [
              { id: 1, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 2, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 3, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            ],
            [
              { id: 1, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 2, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 3, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            ],
          ],
        },
        {
          rowId: 2,
          cols: 1,
          colsSm: 1,
          colsMd: 3,
          colsLg: 3,
          marginTop: "30px",
          showRowsOn: { sm: 2, md: 3, lg: 3 },
          skeletonGroups: [
            [
              { id: 1, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 2, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 3, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            ],
            [
              { id: 1, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 2, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 3, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            ],
            [
              { id: 1, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 2, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 3, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            ],
            [
              { id: 1, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 2, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
              { id: 3, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            ],
          ],
        },
      ],
    },
  ];