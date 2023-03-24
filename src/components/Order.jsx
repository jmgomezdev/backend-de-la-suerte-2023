"use client";
import { forwardRef, useEffect, useReducer, useState } from "react";
import Select from "react-tailwindcss-select";

const ACTIONS = {
  ADD_PLATE: "ADD_PLATE",
  SUM_PLATE: "SUM_PLATE",
  MINUS_PLATE: "MINUS_PLATE",
  DELETE_PLATE: "DELETE_PLATE",
  RESET_PLATE: "RESET_PLATE",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_PLATE:
      if (state.some((plate) => plate.id === action.payload.id)) {
        return state.map((plate) => {
          if (plate.id === action.payload.id) {
            return { ...plate, quantity: plate.quantity + 1 };
          }
          return plate;
        });
      }
      return [...state, action.payload];
    case ACTIONS.SUM_PLATE:
      return state.map((plate) => {
        if (plate.id === action.payload) {
          return { ...plate, quantity: plate.quantity + 1 };
        }
        return plate;
      });
    case ACTIONS.MINUS_PLATE:
      return state.reduce((acc, plate) => {
        if (plate.id === action.payload) {
          if (plate.quantity !== 1) {
            acc.push({ ...plate, quantity: plate.quantity - 1 });
          }
          return acc;
        }
        acc.push(plate);
        return acc;
      }, []);
    case ACTIONS.DELETE_PLATE:
      return state.filter((plate) => plate.id !== action.payload);
    case ACTIONS.RESET_PLATE:
      return [];
    default:
      return state;
  }
}

const Order = forwardRef(function Order(props, ref) {
  const { options, reset } = props;

  const [plates, dispatch] = useReducer(reducer, []);

  const handleChangeSelect = (plate) => {
    const { label, value } = plate;
    dispatch({
      type: ACTIONS.ADD_PLATE,
      payload: { label, id: value, quantity: 1 },
    });
  };

  const handleSumPlate = (id) => {
    dispatch({ type: ACTIONS.SUM_PLATE, payload: id });
  };

  const handleMinusPlate = (id) => {
    dispatch({ type: ACTIONS.MINUS_PLATE, payload: id });
  };

  const handleDeletePlate = (id) => {
    dispatch({ type: ACTIONS.DELETE_PLATE, payload: id });
  };

  useEffect(() => {
    ref.current = plates;
  }, [plates]);

  useEffect(() => {
    if (reset) {
      dispatch({ type: ACTIONS.RESET_PLATE });
    }
  }, [reset]);

  return (
    <>
      <p className="text-md mb-2 block font-medium text-gray-900">Platos</p>
      <Select
        primaryColor={"indigo"}
        onChange={handleChangeSelect}
        options={options}
        placeholder="Selecciona un plato"
        classNames={{
          menuButton: ({ isDisabled }) =>
            `flex text-md transition-all duration-300 focus:outline-none
            text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-gray-400
            ${
              isDisabled
                ? "bg-gray-200"
                : "bg-gray-50 hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
            }`,
          menu: "absolute z-10 w-full bg-gray-50 shadow-lg border rounded py-1 mt-1.5 text-md text-gray-700",
          listItem: ({ isSelected }) =>
            `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
              isSelected
                ? `text-white bg-blue-500`
                : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
            }`,
          list: "max-h-80",
        }}
      />
      <ul
        className={`mt-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 ${
          plates?.length === 0 ? "hidden" : ""
        }`}
      >
        {plates?.map((plate) => (
          <li
            key={plate.id}
            className="mb-2 flex h-10 list-disc items-center justify-between"
          >
            <span className="ml-5 list-item marker:font-semibold marker:text-blue-700">
              {plate.label}
            </span>
            <div className="flex gap-3">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handleMinusPlate(plate.id)}
                  className="h-9 w-8 rounded-l bg-blue-700 font-bold text-white hover:bg-blue-800"
                >
                  &minus;
                </button>
                <input
                  className="h-9 w-12 appearance-none border px-3 text-center leading-tight text-gray-700"
                  name="quantity"
                  type="text"
                  readOnly
                  value={plate?.quantity}
                />
                <button
                  type="button"
                  onClick={() => handleSumPlate(plate.id)}
                  className="h-9 w-8 rounded-r bg-blue-700 font-bold text-white hover:bg-blue-800"
                >
                  +
                </button>
              </div>
              <button
                className="h-9 w-auto rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-900"
                type="button"
                onClick={() => handleDeletePlate(plate.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
});

export default Order;
