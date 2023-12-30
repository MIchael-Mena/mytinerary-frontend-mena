import { createReducer } from '@reduxjs/toolkit';
import { CityBasic } from '../../models/CityBasic';
import {
  fetchCities,
  fetchCitySelectedById,
  fetchPopularCities,
  updateCitySelected,
} from '../actions/cities';
import { StatusResponse } from '../../models/StatusResponse';
import { City } from '../../models/City';

type GloblaState = {
  hasBeenModified: boolean; // Si la data ha sido modificada al menos una vez
};

const citiesState: {
  citiesFiltered: StatusResponse<CityBasic[]> &
    GloblaState & { totalPages: number; currentSearch: string };
  popularCities: StatusResponse<CityBasic[]> & GloblaState;
  citySelected: StatusResponse<City> & GloblaState;
} = {
  popularCities: {
    loading: true,
    error: null,
    data: [],
    hasBeenModified: false,
  },
  citiesFiltered: {
    currentSearch: '',
    loading: true,
    error: null,
    data: [],
    totalPages: 0,
    hasBeenModified: false,
  },
  citySelected: {
    loading: true,
    error: null,
    data: {} as City,
    hasBeenModified: false,
  },
};

const citiesReducer = createReducer(citiesState, (builder) => {
  builder
    .addCase(updateCitySelected, (state, action) => {
      state.citySelected.data = action.payload;
      state.citySelected.loading = false;
      state.citySelected.hasBeenModified = true;
    })

    .addCase(fetchCitySelectedById.pending, (state) => {
      state.citySelected.loading = true;
    })
    .addCase(fetchCitySelectedById.fulfilled, (state, action) => {
      state.citySelected.loading = false;
      state.citySelected.data = action.payload.city;
      state.citySelected.hasBeenModified = true;
    })
    .addCase(fetchCitySelectedById.rejected, (state, action) => {
      state.citySelected.loading = false;
      state.citySelected.error = action.error;
    })

    .addCase(fetchCities.pending, (state) => {
      state.citiesFiltered.loading = true;
    })
    .addCase(fetchCities.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);
      state.citiesFiltered.currentSearch = action.payload.currentSearch;

      state.citiesFiltered.hasBeenModified = true;
      state.citiesFiltered.loading = false;
      state.citiesFiltered.data = action.payload.cities;
      state.citiesFiltered.totalPages = action.payload.totalPages;
    })
    .addCase(fetchCities.rejected, (state, action) => {
      state.citiesFiltered.currentSearch = '';

      state.citiesFiltered.loading = false;
      state.citiesFiltered.error = action.error;
    })

    .addCase(fetchPopularCities.pending, (state) => {
      state.popularCities.loading = true;
    })
    .addCase(fetchPopularCities.fulfilled, (state, action) => {
      state.popularCities.loading = false;
      state.popularCities.data = action.payload.cities;
      state.popularCities.hasBeenModified = true;
    })
    .addCase(fetchPopularCities.rejected, (state, action) => {
      state.popularCities.loading = false;
      state.popularCities.error = action.error;
    });
});

export default citiesReducer;
