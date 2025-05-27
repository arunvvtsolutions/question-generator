//   ------------- important formulas skeleton data -------------

import { IDynamicSkeletonUi } from "@/components/ui/DynamicSkeletonTwoUi";

export const calenderSkeletonData: IDynamicSkeletonUi[] = [
  {
    id: 1,
    marginTop: "0px",
    rowConfigs: [
      {
        rowId: 1,
        cols: 2,
        colsSm: 3,
        colsMd: 4,
        colsLg: 6,
        marginTop: "20px",
        showRowsOn: { sm: 4, md: 20, lg: 20 },
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
];

export const mobileCalenderSkeletonData: IDynamicSkeletonUi[] = [
  {
    id: 1,
    marginTop: "0px",
    rowConfigs: [
      {
        rowId: 1,
        cols: 1,
        colsSm: 1,
        colsMd: 1,
        colsLg: 1,
        marginTop: "20px",
        showRowsOn: { sm: 5, md: 8, lg: 8 }, // Show different numbers of rows for each screen size
        skeletonGroups: [
          [{ id: 1, spaceY: 4, spaceX: 2, height: 100, width: "full", rounded: "rounded-lg" }],
          [{ id: 2, spaceY: 4, marginTop: "2px", spaceX: 2, height: 80, width: "full", rounded: "rounded-lg" }],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],

          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
        ],
      },
    ],
  },
];

//   ------------- todays schedule skeleton data -------------
export const todaysStudyPlanCardSkeletonData: IDynamicSkeletonUi[] = [
  {
    id: 1,
    marginTop: "0px",
    rowConfigs: [
      {
        rowId: 1,
        cols: 1,
        colsSm: 1,
        colsMd: 1,
        colsLg: 1,
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
        ],
      },
      {
        rowId: 2,
        cols: 1,
        colsSm: 1,
        colsMd: 1,
        colsLg: 1,
        marginTop: "30px",
        showRowsOn: { sm: 2, md: 3, lg: 3 },
        skeletonGroups: [
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

//   ------------- study plan list skeleton data -------------
export const studyPlanListSkeletonData: IDynamicSkeletonUi[] = [
  {
    id: 1,
    marginTop: "0px",
    rowConfigs: [
      {
        rowId: 1,
        cols: 1,
        colsSm: 1,
        colsMd: 2,
        colsLg: 3,
        marginTop: "20px",
        showRowsOn: { sm: 3, md: 4, lg: 20 },
        skeletonGroups: [
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, marginTop:'20px', spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 4, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 5, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, marginTop:'20px', spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 4, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 5, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, marginTop:'20px', spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 4, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 5, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, marginTop:'20px', spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 4, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 5, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, marginTop:'20px', spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 4, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 5, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, marginTop:'20px', spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 4, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 5, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, marginTop:'20px', spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 4, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 5, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
          [
            { id: 1, spaceY: 4, spaceX: 2, height: 60, width: "full", rounded: "rounded-lg" },
            { id: 2, spaceY: 4, marginTop:'20px', spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 3, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 4, spaceY: 4, spaceX: 2, height: 20, width: "full", rounded: "rounded-lg" },
            { id: 5, spaceY: 4, spaceX: 2, height: 30, width: "full", rounded: "rounded-lg" },
          ],
        ],
      },
    ],
  },
];
