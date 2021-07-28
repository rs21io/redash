import { map } from "lodash";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";
import Button from "antd/lib/button";
import { useState, useEffect } from "react";

type Props = {
  options: {
    buttonName: string;
    buttonLinkUrlTemplate?: string;
    buttonLinkOpenInNewTab?: boolean;
  };
  onChange: (...args: any[]) => any;
};

export default function ButtonSettings({ onChange }: Props) {
  const [arr, setArr]: any[] = useState([]);
  function handleChange(item: any, checked: any) {
    item.linkOpenInNewTab = checked;
  }
  const [onChangeDebounced] = useDebouncedCallback(onChange, 200);
  const [test, setTest]: any[] = useState([]);
  const [options, setOptions]: any[] = useState([]);

  const doSomething = () => {
    // arr.push({name: "", linkUrlTemplate: "", linkOpenInNewTab: false})
    setArr((prevItems: any) => [...prevItems, { name: "", linkUrlTemplate: "", linkOpenInNewTab: true }]);
    console.log("arr", arr);
  };

  useEffect(() => {
    const newArr: any = [];

    arr.forEach((item: any, index: any) => {
      const newItem = (
        <React.Fragment key={index}>
          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section key={index} item={item}>
            <Input
              label="Button Name"
              // data-test="Table.ColumnEditor.Link.Name"
              defaultValue={item.name}
              onChange={(event: any) => onChangeDebounced({ buttonName: event.target.value })}
            />
          </Section>
          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section>
            <Input
              label="URL template"
              // data-test="Table.ColumnEditor.Link.UrlTemplate"
              defaultValue={item.linkUrlTemplate}
              onChange={(event: any) => onChangeDebounced({ buttonLinkUrlTemplate: event.target.value })}
            />
          </Section>

          {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
          <Section>
            <Checkbox
              // data-test="Table.ColumnEditor.Link.OpenInNewTab"
              value={item.linkOpenInNewTab}
              checked={item.linkOpenInNewTab}
              onChange={event => {
                item.linkOpenInNewTab = event.target.checked;
                console.log(item.linkOpenInNewTab);
                return item.linkOpenInNewTab;
              }}>
              Open in new tab
            </Checkbox>
          </Section>
        </React.Fragment>
      );
      newArr.push(newItem);
    });

    setTest(newArr);
  }, [arr]);

  return (
    <>
      <Button onClick={doSomething}>Do Something</Button>
      {test}
    </>
  );
}

ButtonSettings.defaultProps = {
  onChange: () => {},
};
