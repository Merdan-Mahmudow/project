import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    //console.log(params, 4444);
    const { data } = await axios.get<Pizza[]>(`https://redesigned-tribble-v44jpjjgxg4377r-8000.app.github.dev/food/`, {params: pickBy(
      // backend.skyrodev.ru
      {
        category,
      },
      identity,
    ),
  });

    return data;
  },
)