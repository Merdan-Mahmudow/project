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
    const { data } = await axios.get<Pizza[]>(`https://wvqk69-8000.csb.app/food/`, {params: pickBy(
      {
        category,
      },
      identity,
    ),
  });

    return data;
  },
)