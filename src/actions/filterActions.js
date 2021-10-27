import { createAction } from "@reduxjs/toolkit";

export const handleFilterClear = createAction("FILTER_STRING_CLEARED");
export const handleFilterClick = createAction("FILTER_FLAG_CHANGED");
export const filterStringChanged = createAction("FILTER_STRING_CHANGED");
