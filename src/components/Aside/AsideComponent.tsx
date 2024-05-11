import { FilterComponent } from "../Filter/FilterComponent.tsx";
import "./AsideComponent.scss";
import arrow from "../../svg/arrow.svg";
import { FilterBy } from "../../redux/ticketsSlice/types.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { ButtonComponent } from "../Button/ButtonComponent.tsx";
import { useEffect, useState } from "react";
export const AsideComponent = () => {
  const { connections, company } = useSelector(
    (state: RootState) => state.ticketsReducer.filters,
  );
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const buttonText = dropdownVisible
    ? "Закрыть настройки"
    : "Открыть настройки";

  useEffect(() => {
    console.log(`dropdown visible? ${dropdownVisible}`);
  }, [dropdownVisible]);

  return (
    <div className={"Aside"}>
      <div className={"Aside__header"}>
        <span className={"Aside__header__text"}>
          {company.length > 0
            ? `Авиакомпания: ${company.join(", ")}, `
            : `Любая авиакомпания, `}
          {connections.length > 0
            ? ` пересадок: ${connections.join(", ")}`
            : ` любое кол-во пересадок`}
        </span>
        <ButtonComponent
          dropdownVisible={dropdownVisible}
          text={buttonText}
          imageLink={arrow}
          place={"aside"}
          onClick={() =>
            setDropdownVisible((dropdownVisible) => !dropdownVisible)
          }
        />
      </div>
      <div className={"Aside__footer--desktop"}>
        <FilterComponent filterBy={FilterBy.Connections} />
        <FilterComponent filterBy={FilterBy.Company} />
      </div>
      {dropdownVisible ? (
        <div className={"Aside__footer--mobile"}>
          <FilterComponent filterBy={FilterBy.Connections} />
          <FilterComponent filterBy={FilterBy.Company} />
        </div>
      ) : null}
    </div>
  );
};
