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

export default function ButtonSettings({onChange }: Props) {
  const [arr, setArr]: any[] = useState([])
  function handleChange(changes: any) {
    console.log('options', options)
    console.log('changes', changes)
    // onChange({ ...options, ...changes });

  }
  const [onChangeDebounced] = useDebouncedCallback(onChange, 200);
  const [test, setTest]: any[] = useState([])
  const [options, setOptions]: any[] = useState([])

  const doSomething = () => {
    // arr.push({name: "", linkUrlTemplate: "", linkOpenInNewTab: false})
    setArr((prevArr: any) => [...prevArr, {name: "", linkUrlTemplate: "", linkOpenInNewTab: false}])
    console.log('arr', arr)
  }

useEffect(() => {arr.forEach((item, index) => {
  setTest((prevState:any) =>[...prevState, 
<React.Fragment key={index}>
  {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
  <Section>
        <Input
          label="Button Name"
          data-test="Table.ColumnEditor.Link.Name"
          defaultValue={item.name}
          onChange={(event: any) => onChangeDebounced({ buttonName: event.target.value })}
        />
      </Section>
      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Input
          label="URL template"
          data-test="Table.ColumnEditor.Link.UrlTemplate"
          defaultValue={item.linkUrlTemplate}
          onChange={(event: any) => onChangeDebounced({ buttonLinkUrlTemplate: event.target.value })}
        />
      </Section>

      {/* @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message */}
      <Section>
        <Checkbox
          data-test="Table.ColumnEditor.Link.OpenInNewTab"
          checked={item.linkOpenInNewTab}
          onChange={event => handleChange({ linkOpenInNewTab: event.target.checked })}>
          Open in new tab
        </Checkbox>
      </Section>
    </React.Fragment>]
  )
})}, [arr])
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
