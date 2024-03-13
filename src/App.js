import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import Button from "@mui/material/Button";
import "./App.css";

const initialData = {
  firstname: "",
  lastname: "",
  zip: "",
  city: "",
  street: "",
  house_number: "",
  mail: "",
  gender: "", // Add gender field to initialData
};

const schema = {
  type: "object",
  properties: {
    firstname: { type: "string" },
    lastname: { type: "string" },
    zip: { type: "string" },
    city: { type: "string" },
    street: { type: "string" },
    house_number: { type: "string" },
    mail: { type: "string", format: "email" },
    gender: { type: "string", enum: ["male", "female", "diverse"] }, // Add gender property to schema
  },
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control", // Gender dropdown as the first input
      scope: "#/properties/gender",
      options: {
        trim: true,
        enum: ["male", "female", "diverse"],
      },
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/firstname",
          options: {
            trim: true,
          },
        },
        {
          type: "Control",
          scope: "#/properties/lastname",
          options: {
            trim: true,
          },
        },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/zip",
          options: {
            trim: true,
          },
        },
        {
          type: "Control",
          scope: "#/properties/city",
          options: {
            trim: true,
          },
        },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/street",
          options: {
            trim: true,
          },
        },
        {
          type: "Control",
          scope: "#/properties/house_number",
          options: {
            trim: true,
          },
        },
      ],
    },
    {
      type: "Control",
      scope: "#/properties/mail",
      options: {
        trim: true,
      },
    },
  ],
};

function App() {
  const [data, setData] = useState(initialData);
  const [jsonOutput, setJsonOutput] = useState("");

  const handleSubmit = () => {
    const jsonData = JSON.stringify(data, null, 2);
    setJsonOutput(jsonData);
  };

  return (
    <div className="App">
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {jsonOutput && (
        <div className="json-output">
          <div style={{ clear: "both" }}></div>
          <div className="json-output">
            <h3>Form Data</h3>
            <pre>
              <code>{jsonOutput}</code>
            </pre>
          </div>
        </div>
      )}

      <div style={{ display: "flex", marginTop: "20px", marginBottom: "50px" }}>
        <div
          style={{
            width: "50%",
            backgroundColor: "#f4f4f4",
            padding: "10px",
          }}
        >
          <h3>Schema</h3>
          <pre>
            <code>{JSON.stringify(schema, null, 2)}</code>
          </pre>
        </div>
        <div
          style={{
            width: "50%",
            backgroundColor: "#f4f4f4",
            padding: "10px",
          }}
        >
          <h3>UISchema</h3>
          <pre>
            <code>{JSON.stringify(uischema, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
