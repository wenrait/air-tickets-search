import "./FilterComponent.scss";
import { FormComponent } from "../Form/FormComponent.tsx";
import { FilterBy } from "../../redux/ticketsSlice/types.ts";
import { filtersData } from "../../data/filtersData.ts";
import { RootDispatch } from "../../redux/store.ts";
import { useDispatch } from "react-redux";
import { setFilterBy } from "../../redux/ticketsSlice/ticketsSlice.ts";
export interface FilterComponentProps {
  filterBy: FilterBy;
}
export const FilterComponent = ({ filterBy }: FilterComponentProps) => {
  const dispatch: RootDispatch = useDispatch();
  const getFilterTitle = () => {
    switch (filterBy) {
      case FilterBy.Connections:
        return "Количество пересадок";
      case FilterBy.Company:
        return "Компания";
    }
  };
  interface HandleFilterProps {
    filterBy: FilterBy;
    id: string;
    checked: boolean;
  }
  const handleFilter = ({ filterBy, id, checked }: HandleFilterProps) => {
    dispatch(setFilterBy({ filterBy, id, checked }));
  };

  return (
    <div className={"Filter"}>
      <h2 className={"Filter__title"}>{getFilterTitle()}</h2>
      <div className={"Filter__list"}>
        {filtersData[filterBy].map((item) => (
          <FormComponent
            id={item.id}
            target={filterBy}
            text={item.text}
            key={item.id}
            onClick={() => console.log(item.id)}
            onChange={(e) =>
              handleFilter({
                filterBy: filterBy,
                id: item.id,
                checked: e.target.checked,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
