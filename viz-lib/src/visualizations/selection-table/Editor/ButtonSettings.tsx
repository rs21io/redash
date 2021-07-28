import { map } from "lodash";
import React from "react";
import { Section, Input, Checkbox } from "@/components/visualizations/editor";
import Button from "antd/lib/button";
import { useState } from "react";

type Props = {
  options: {
    name: string;
    linkUrlTemplate?: string;
    linkOpenInNewTab?: boolean;
  };
  onChange: (...args: any[]) => any;
};

const ButtonSettings = ({ onChange }: Props) => {
  const [arr, setArr]: any[] = useState([{ name: "", linkUrlTemplate: "", linkOpenInNewTab: true }]);

  const handleChange = (event: any, item: any) => {
    if (event.target.id === "Button-Name") {
      item.name = event.target.value;
    } else if (event.target.id === "URL-Template") {
      item.linkUrlTemplate = event.target.value;
    } else if (event.target.type === "checkbox") {
      item.linkOpenInNewTab = event.target.checked;
    }

    setArr((prevArr: any) => [...prevArr]);
  };

  const doSomething = () => {
    setArr((prevItems: any) => [...prevItems, { name: "", linkUrlTemplate: "", linkOpenInNewTab: true }]);
  };

  return (
    <>
      <Button onClick={doSomething}>Do Something</Button>
      {map(arr, (item: any, index: any) => {
        return (
          <React.Fragment key={index}>
            {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
            <Section key={index} item={item}>
              <Input
                label="Button Name"
                id="Button-Name"
                // data-test="Table.ColumnEditor.Link.Name"
                defaultValue={item.name}
                onChange={(event: any) => handleChange(event, item)}
              />
            </Section>
            {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
            <Section>
              <Input
                label="URL template"
                id="URL-Template"
                // data-test="Table.ColumnEditor.Link.UrlTemplate"
                defaultValue={item.linkUrlTemplate}
                onChange={(event: any) => handleChange(event, item)}
              />
            </Section>

            {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
            <Section>
              <Checkbox
                // data-test="Table.ColumnEditor.Link.OpenInNewTab"
                value={item.linkOpenInNewTab}
                checked={item.linkOpenInNewTab}
                onChange={event => handleChange(event, item)}>
                Open in new tab
              </Checkbox>
            </Section>
          </React.Fragment>
        );
      })}
    </>
  );
};

ButtonSettings.defaultProps = {
  onChange: () => {},
};

export default ButtonSettings;
