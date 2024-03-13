import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

const Builder = () => {
  const [schema, setSchema] = useState({ type: "object", properties: {} });
  const [uiSchema, setUiSchema] = useState({});
  const [formData, setFormData] = useState({});

  const handleAddField = () => {
    const fieldType = document.getElementById("fieldType").value;
    const name = document.getElementById("name").value;
    const placeholder = document.getElementById("placeholder").value;
    const required = document.getElementById("required").checked;

    const newProperty = {
      type: fieldType,
      title: name,
      ...(placeholder && { description: placeholder }),
      ...(required && { minLength: 1 }),
    };

    const newSchema = {
      ...schema,
      required: required ? [...(schema.required || []), name] : schema.required,
      properties: {
        ...schema.properties,
        [name]: newProperty,
      },
    };

    const newUiSchema = {
      ...uiSchema,
      [name]: {
        "ui:widget": fieldType === "boolean" ? "checkbox" : undefined,
      },
    };

    setSchema(newSchema);
    setUiSchema(newUiSchema);
    setFormData({ ...formData, [name]: "" });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "70%" }}>
        <div>
          <label htmlFor="fieldType">Field Type:</label>
          <select id="fieldType">
            <option value="string">Text</option>
            <option value="number">Number</option>
            <option value="boolean">Checkbox</option>
            {/* Add more field types as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="placeholder">Placeholder:</label>
          <input type="text" id="placeholder" />
        </div>
        <div>
          <label htmlFor="required">Required:</label>
          <input type="checkbox" id="required" />
        </div>
        <button onClick={handleAddField}>Add Field</button>
        <JsonForms
          schema={schema}
          uischema={uiSchema}
          data={formData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setFormData(data)}
        />
      </div>
      <div
        style={{ width: "30%", backgroundColor: "#f4f4f4", padding: "10px" }}
      >
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Builder;
