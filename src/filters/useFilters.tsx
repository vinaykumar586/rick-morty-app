import {
    getRouteApi,
    type RegisteredRouter,
    type RouteIds,
    type SearchParamOptions,
  } from "@tanstack/react-router";
  import { cleanEmptyParams } from "../utils/cleanEmptyParam";
  
  export function useFilters<
    TId extends RouteIds<RegisteredRouter["routeTree"]>,
    TSearchParams extends SearchParamOptions<
      RegisteredRouter,
      TId,
      TId
    >["search"],
  >(page: TId) {
    const routeApi = getRouteApi<TId>(page);
    console.log(routeApi,"edeede")
    const navigate = routeApi.useNavigate();
    const filters = routeApi.useSearch();
     console.log(filters, navigate,"Edede")
    const setFilters = (partialFilters: Partial<TSearchParams>) =>
      navigate({
        search: cleanEmptyParams({
          ...filters,
          ...partialFilters,
        }) as TSearchParams,
      });
  
    const resetFilters = () => navigate({ search: {} as TSearchParams });
  
    return { filters, setFilters, resetFilters };
  }
  