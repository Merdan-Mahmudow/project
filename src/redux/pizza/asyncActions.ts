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
    const { data } = await axios.get<Pizza[]>(`https://jubilant-space-pancake-7qqj7jjrgx5cpj4v-8000.app.github.dev/food/`, {params: pickBy(
      {
        category,
      },
      identity,
    ),
  });

    return data;
  },
)