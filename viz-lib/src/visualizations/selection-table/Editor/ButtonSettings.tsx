import { map } from "lodash";
import React from "react";
import { Section, Input, Checkbox, Select } from "@/components/visualizations/editor";
import Button from "antd/lib/button";
import { useState } from "react";
import { EditorPropTypes } from "@/visualizations/prop-types";
import DeleteOutlinedIcon from "@ant-design/icons/DeleteOutlined";
import { useEffect } from "react";

type Props = {
  options: {
    buttonArr: any[];
    columns: any[];
  };
  onOptionsChange: (...args: any[]) => any;
};
const ButtonSettings = ({ options, onOptionsChange }: Props) => {
  const [arr, setArr]: any[] = useState(
    options.buttonArr ? options.buttonArr : [{ name: "", linkUrlTemplate: "", linkOpenInNewTab: true, columnName: "" }]
  );

  const handleChange = (event: any, item: any, index: any) => {
    if (event.target.id === "Button-Name" + index) {
      item.name = event.target.value;
    } else if (event.target.id === "URL-Template" + index) {
      item.linkUrlTemplate = event.target.value;
    } else if (event.target.type === "checkbox") {
      item.linkOpenInNewTab = event.target.checked;
    }

    setArr((prevArr: any) => [...prevArr]);
  };

  const handleDropdown = (event: any, item: any) => {
    if (event) item.columnName = event;

    setArr((prevArr: any) => [...prevArr]);
  };

  const createInputs = () => {
    setArr((prevItems: any) => [
      ...prevItems,
      { name: "", linkUrlTemplate: "", linkOpenInNewTab: true, columnName: "" },
    ]);
  };

  const deleteButton = (button: any) => {
    const buttonArr = arr.filter((item: any) => item !== button);
    setArr(() => [...buttonArr]);
  };

  useEffect(() => {
    options.buttonArr = arr;
    onOptionsChange({ buttonArr: arr });
  }, [arr]);

  return (
    <>
      <Button onClick={createInputs}>Add Action</Button>
      {map(arr, (item: any, index: any) => {
        return (
          <React.Fragment key={index}>
            {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
            <Section key={index} item={item}>
              <Input
                label="Button Name"
                id={"Button-Name" + index}
                // data-test="Table.ColumnEditor.Link.Name"
                defaultValue={item.name}
                onChange={(event: any) => handleChange(event, item, index)}
              />
            </Section>
            {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
            <Section>
              <Input
                label="URL template"
                id={"URL-Template" + index}
                // data-test="Table.ColumnEditor.Link.UrlTemplate"
                defaultValue={item.linkUrlTemplate}
                onChange={(event: any) => handleChange(event, item, index)}
              />
            </Section>
            {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
            <Section>
              <Select
                label="Parameters"
                id={"Column-Dropdown" + index}
                // data-test="Table.ColumnEditor.Link.UrlTemplate"
                defaultValue={item.columnName}
                onChange={(event: any) => handleDropdown(event, item)}>
                {options.columns.map((column: any) => (
                  <Select.Option key={column.name}>{column.name}</Select.Option>
                ))}
              </Select>
            </Section>
            {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
            <Section>
              <Checkbox
                // data-test="Table.ColumnEditor.Link.OpenInNewTab"
                value={item.linkOpenInNewTab}
                checked={item.linkOpenInNewTab}
                onChange={event => handleChange(event, item, index)}>
                Open in new tab
              </Checkbox>
            </Section>
            {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
            <Section>
              <Button onClick={() => deleteButton(item)}>
                <DeleteOutlinedIcon />
              </Button>
            </Section>
          </React.Fragment>
        );
      })}
    </>
  );
};
ButtonSettings.defaultProps = EditorPropTypes;
export default ButtonSettings;
