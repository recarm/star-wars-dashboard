import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Loader from "react-loader-spinner";

const columns = [
  {
    name: "Name",
    selector: (row) => row["name"],
  },
  {
    name: "Population",
    selector: (row) => row["population"],
  },
  {
    name: "Rotation Period",
    selector: (row) => row["rotation_period"],
  },
  {
    name: "Orbital Period",
    selector: (row) => row["orbital_period"],
  },
  {
    name: "Diameter",
    selector: (row) => row["diameter"],
  },
  {
    name: "Climate",
    selector: (row) => row["climate"],
  },
  {
    name: "Surface Water",
    selector: (row) => row["surface_water"],
  },
];

const Table = (props) => {
  const { items, isLoaded } = props;

  if (!isLoaded) {
    return (
      <div className="center">
        <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  createTheme(
    "modified_solarized",
    {
      text: {
        primary: "black",
        secondary: "black",
      },
      background: {
        default: "#668EBB",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  return (
    <DataTable
      title="Planet Data"
      columns={columns}
      data={items}
      pagination
      highlightOnHover
      theme="modified_solarized"
    />
  );
};

export default Table;
