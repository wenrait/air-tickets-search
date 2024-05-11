import "./FormComponent.scss";
import { ChangeEvent } from "react";
import { FilterBy } from "../../redux/ticketsSlice/types.ts";

export interface FormComponentProps {
  target: FilterBy;
  text: string;
  id: string;
  onClick: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const FormComponent = ({
  target,
  text,
  id,
  onClick,
  onChange,
}: FormComponentProps) => {
  return (
    <div className={"Form"}>
      <input
        className={`Form__input Form__input--${target}`}
        type={"checkbox"}
        id={`Form__input_${id}`}
        onClick={onClick}
        onChange={onChange}
      />
      <label className={"Form__label"} htmlFor={`Form__input_${id}`}>
        {text}
      </label>
    </div>
  );
};
