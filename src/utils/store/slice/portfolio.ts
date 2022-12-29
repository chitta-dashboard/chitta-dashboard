import { createSlice } from "@reduxjs/toolkit";
import { NORMAL, SortOrder } from "../../constants";

 interface IPortfolioSlice {
    searchFilter: string;
    sortFilter: SortOrder;
    currentPage: number;
    pageCount: number;
    totalPageCount: number;
}

const initialState: IPortfolioSlice = {
    searchFilter: "",
    sortFilter: NORMAL,
    currentPage: 1,
    pageCount: 0,
    totalPageCount: 0,
};

const portfolioSlice = createSlice({
    name: "portfolio",
    initialState,
    reducers: {
        setSearchFilter: (state, action) => {
            state.searchFilter = action.payload;
        },
    },
});

 const {
    setSearchFilter,
} = portfolioSlice.actions;
export const portfoliosReducer = portfolioSlice.reducer;
